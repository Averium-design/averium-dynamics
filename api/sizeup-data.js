// Serves the two Open-Meteo reads the Size-Up page makes: the 3x3 elevation
// probe and the current weather at the pin.
//
// Why this exists. Open-Meteo's free API is non-commercial only. Their terms
// count "integrating our service into commercial products or promotional
// activities" as commercial use, which is exactly what a company website
// running a lead-generating tool is doing. Commercial use means the customer
// endpoint and a key, and a key cannot live in public HTML because the browser
// hands it to anyone who looks. So the page calls this, and this calls
// Open-Meteo.
//
// Set OPEN_METEO_API_KEY in the Vercel project env. Without it the endpoint
// returns 503 and the page says it could not read the spot. It NEVER falls
// back to the free endpoint: that fallback is the licence breach this exists
// to prevent, and it is the same fail-closed rule the platform repo already
// applies on a missing or rejected key.
//
// Attribution obligations that come with the data are printed on the page
// itself: Copernicus DEM GLO-90 via Open-Meteo, and Open-Meteo under CC-BY 4.0.

const UPSTREAM = process.env.OPEN_METEO_BASE || 'https://customer-api.open-meteo.com/v1';

// The query is built here, not forwarded. The page sends coordinates and
// nothing else, so this cannot be pointed at another host or used to pull
// parameters we have not paid for.
const KINDS = {
  elevation: {
    path: 'elevation',
    maxPoints: 9,
    params: {},
    // Ground height does not change. The long shared cache is what keeps a
    // page that re-reads on every pin drop from turning into call volume.
    cache: 'public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400',
  },
  forecast: {
    path: 'forecast',
    maxPoints: 1,
    params: {
      current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m',
      wind_speed_unit: 'kmh',
    },
    // Open-Meteo updates roughly every 15 minutes; 10 is comfortably inside it.
    cache: 'public, max-age=60, s-maxage=600, stale-while-revalidate=900',
  },
};

// Returns a comma-joined list of coordinates, or null if anything is off.
// Fixed to five decimals: ~1 m, finer than a 90 m DEM can justify, and it
// makes the cache key stable for pins that differ only in float noise.
function coords(raw, max, limit) {
  if (typeof raw !== 'string' || !raw) return null;
  const parts = raw.split(',');
  if (parts.length < 1 || parts.length > max) return null;
  const out = [];
  for (const p of parts) {
    const n = Number(p);
    if (!Number.isFinite(n) || Math.abs(n) > limit) return null;
    out.push(n.toFixed(5));
  }
  return out.join(',');
}

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'method not allowed' });
  }

  const q = req.query || {};
  const kind = KINDS[String(q.kind || '')];
  if (!kind) return res.status(400).json({ error: 'unknown kind' });

  const lat = coords(q.latitude, kind.maxPoints, 90);
  const lon = coords(q.longitude, kind.maxPoints, 180);
  if (!lat || !lon || lat.split(',').length !== lon.split(',').length) {
    return res.status(400).json({ error: 'bad coordinates' });
  }

  const key = process.env.OPEN_METEO_API_KEY;
  if (!key) {
    // Fail closed. Saying so plainly in the log, because a silent fallback to
    // the free endpoint is the thing this endpoint exists to stop.
    console.error('[sizeup-data] OPEN_METEO_API_KEY is not set; refusing to call the free endpoint');
    return res.status(503).json({ error: 'weather service not configured' });
  }

  const url = new URL(`${UPSTREAM}/${kind.path}`);
  url.searchParams.set('latitude', lat);
  url.searchParams.set('longitude', lon);
  for (const [k, v] of Object.entries(kind.params)) url.searchParams.set(k, v);
  url.searchParams.set('apikey', key);

  let upstream;
  try {
    upstream = await fetch(url, { signal: AbortSignal.timeout(8000) });
  } catch (err) {
    console.error('[sizeup-data] upstream threw', kind.path, err && err.message);
    return res.status(502).json({ error: 'weather service unreachable' });
  }

  if (upstream.status === 401 || upstream.status === 402 || upstream.status === 403) {
    // A rejected or expired key is a licence problem, not a weather problem,
    // and it must not degrade into using the free tier instead.
    console.error('[sizeup-data] key rejected by Open-Meteo:', upstream.status);
    return res.status(503).json({ error: 'weather service not licensed' });
  }
  if (!upstream.ok) {
    console.error('[sizeup-data] upstream failed', kind.path, upstream.status);
    return res.status(502).json({ error: 'weather service failed' });
  }

  let data;
  try {
    data = await upstream.json();
  } catch (err) {
    console.error('[sizeup-data] upstream sent something that is not JSON', kind.path);
    return res.status(502).json({ error: 'weather service failed' });
  }

  res.setHeader('Cache-Control', kind.cache);
  return res.status(200).json(data);
};
