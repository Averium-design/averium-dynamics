import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

/* The articles themselves are static HTML in public/blog/, served through the
   rewrites in vercel.json. They are not React routes and must be linked with a
   plain anchor, not <Link>. This page exists so that the articles are reachable
   from the site at all: before it, both were reachable only by direct URL. */
const posts = [
  {
    date: '18 August 2026',
    dateISO: '2026-08-18',
    read: '6 min read',
    title: 'Helicopter, air tanker, fire engine, drone: what each one is for',
    blurb:
      'A fire in the Müritz National Park burned for weeks on ground nobody was ' +
      'allowed to walk on. What each firefighting tool is good at, what it cannot ' +
      'do, and the gap none of them covered.',
    href: '/blog/helicopter-air-tanker-fire-engine-drone',
    de: '/blog/loeschhubschrauber-loeschflugzeug-tankloeschfahrzeug-drohne',
  },
];

export default function Blog() {
  /* This is a CRA single-page app: index.html carries one <title> for every
     route, so /blog inherited the homepage's. Verified on the live page after
     the first deploy. No react-helmet in the project, so set it directly. */
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Field Notes — Averium Dynamics';
    const tag = document.querySelector('meta[name="description"]');
    const previousDesc = tag ? tag.getAttribute('content') : null;
    if (tag) {
      tag.setAttribute(
        'content',
        'Write-ups of real wildfires and the equipment sent to them, from Averium Dynamics in Berlin.'
      );
    }
    return () => {
      document.title = previousTitle;
      if (tag && previousDesc !== null) tag.setAttribute('content', previousDesc);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link to="/" className="text-primary hover:underline text-sm">← Back to Home</Link>

        <p className="text-sm font-mono uppercase tracking-widest text-foreground-muted mt-6 mb-4">
          FIELD NOTES
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading text-foreground">
          What we learn from real fires
        </h1>
        <p className="text-foreground-muted leading-relaxed max-w-2xl mb-12">
          Write-ups of fires we have followed closely, and of the equipment that was
          sent to them. Sourced, and dull where the facts are dull.
        </p>

        {posts.map((post) => (
          <article key={post.href} className="border-t border-border pt-8 mb-8">
            <p className="text-sm text-foreground-muted mb-2">
              <time dateTime={post.dateISO}>{post.date}</time> · {post.read}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground mb-3">
              <a href={post.href} className="hover:text-primary transition-colors">
                {post.title}
              </a>
            </h2>
            <p className="text-foreground-muted leading-relaxed max-w-2xl mb-4">{post.blurb}</p>
            <p className="text-sm">
              <a href={post.href} className="text-primary font-semibold hover:underline">
                Read it
              </a>
              <span className="text-gray-400 mx-3">·</span>
              <a href={post.de} hrefLang="de" className="text-primary font-semibold hover:underline">
                Auf Deutsch lesen
              </a>
            </p>
          </article>
        ))}

        <p className="border-t border-border pt-8 text-sm text-foreground-muted">
          Working on a district or a forest we should write about?{' '}
          <a href="mailto:info@averiumdynamics.com" className="text-primary hover:underline">
            info@averiumdynamics.com
          </a>
        </p>
      </div>
    </div>
  );
}
