/**
 * The Prüfpunkte / checklist result text: ONE source for the page and the reply.
 *
 *   Page:   <script src="/pruefpunkte-text.js"> on /pruefpunkte and /checklist,
 *           which renders the full list when the reader presses the mail button.
 *   Script: scripts/pruefpunkte-reply.js requires this file and prints the
 *           reply mail for a "Code:" line.
 *
 * Code format: language, colon, then for each question its number and one
 * letter: y = settled, n = no, u = don't know, d = a drop is planned (question 1
 * only), - = does not apply (4 and 5 when question 1 was "flight and
 * reconnaissance only").
 *
 * Sources: the article /blog/munitionsbelastete-flaechen-was-gilt and its
 * English twin for points 1 to 5. The A1/A2/A3 explainer was taken out of
 * the mail on 2026-11-13 to keep it short; it stays on the pages themselves.
 * The "next step" lines are our advice, not a quotation from any source.
 *
 * Plain ES5 apart from template literals, no dependencies, served as a static
 * file from public/ (files there are served ahead of the vercel.json rewrites).
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PruefpunkteText = api;
})(typeof self !== 'undefined' ? self : this, function () {
  var TEXT = {
    de: {
      subject: function (x, y) { return `Ihre Prüfpunkte: ${x} von ${y} geklärt`; },
      greeting: 'Guten Tag,',
      intro: function (x, y) { return `danke für Ihre Antworten. Ihr Ergebnis: ${x} von ${y} Punkten geklärt. Hier die offenen Punkte mit Grundlage und nächstem Schritt.`; },
      allClear: function (y) { return `danke für Ihre Antworten. Alle ${y} Punkte sind geklärt; offen ist keiner.`; },
      skipped: 'Löschmittel und Fehlwurf entfallen, weil nichts abgeworfen wird.',
      basis: 'Grundlage',
      next: 'Nächster Schritt',
      points: {
        1: {
          name: 'Betriebskategorie',
          open: 'In der offenen Kategorie ist der Abwurf von Gegenständen nicht zulässig, der Transport gefährlicher Güter ebenso wenig. Flug und Erkundung in A3 sind davon nicht betroffen.',
          basis: 'VO (EU) 2019/947, Artikel 4 Absatz 1 Buchstabe f',
          next: 'Festlegen, ob etwas abgeworfen werden soll. Wenn ja, liegt der Betrieb außerhalb der offenen Kategorie, und es ist zu klären, ob § 21k LuftVO greift (siehe Punkt 2) oder eine Betriebsgenehmigung nötig ist.',
        },
        2: {
          name: 'Wer fliegt',
          open: '§ 21k LuftVO erfasst nach EGRED 2 auch Dritte, die unter Aufsicht der BOS fliegen, und gilt für Drohnen mit weniger als 25 Kilogramm Startmasse. Die bundesweiten Mindeststandards dafür stehen in EGRED 2 und in den STS-BOS des Luftfahrt-Bundesamtes.',
          basis: '§ 21k LuftVO, EGRED 2 (BBK, Stand Juni 2024), STS-BOS (LBA, 16.07.2025)',
          next: 'Festlegen, wer fliegt. Fliegt ein Unternehmen, festhalten, dass es unter Aufsicht der BOS fliegt, und die Startmasse des Fluggeräts prüfen.',
        },
        3: {
          name: 'Luftraum',
          open: 'Die Fachempfehlung von DFV und AGBF verlangt Abstimmung und empfiehlt Erkennbarkeit über ADS-B oder FLARM.',
          basis: 'DFV und AGBF, Fachempfehlung Drohnen und UAV in den Feuerwehren, August 2025',
          next: 'Mit der Einsatzleitung festlegen, wie sich die Drohne mit Hubschraubern und Löschflugzeugen abstimmt, und prüfen, ob das Fluggerät über ADS-B oder FLARM erkennbar ist.',
        },
        4: {
          name: 'Löschmittel',
          open: 'Das Inverkehrbringen ist eine Frage des Produktrechts und der Marktüberwachung des Landes. Die Erlaubnis nach § 7 SprengG und die Regeln für Lagerung und Transport sind eine zweite.',
          basis: 'ProdSG, § 7 SprengG, 1. SprengV',
          next: 'Vom Anbieter schriftlich verlangen, auf welcher Grundlage das Löschmittel in Verkehr gebracht wird und ob eine Erlaubnis nach § 7 SprengG nötig ist. Beides gilt für jeden Anbieter eines abwerfenden Systems, auch für uns.',
        },
        5: {
          name: 'Fehlwurf',
          open: 'Auf einer munitionsbelasteten Fläche kann nachher nicht geborgen werden. Was dort abgeworfen wird, muss liegen bleiben dürfen.',
          basis: 'Einsatzplanung',
          next: 'Vom Anbieter schriftlich verlangen, was ein nicht ausgelöster Körper enthält und ob er liegen bleiben darf, und das mit den Fachberatern des Kampfmittelräumdienstes besprechen.',
        },
      },
      offerHead: 'Gemeinsam testen',
      offerButton: 'Test anfragen',
      offer: 'Unsere Feuerlöschdrohne ist ein Prototyp, und wir erproben sie gern gemeinsam mit Ihnen. Wenn Sie die Technik selbst testen möchten, antworten Sie einfach auf diese E-Mail.',
      links: [
        'Der Artikel mit allen Quellen: https://www.averiumdynamics.com/blog/munitionsbelastete-flaechen-was-gilt',
        'Die Selbstprüfung: https://www.averiumdynamics.com/pruefpunkte',
      ],
      disclosure: 'Averium Dynamics entwickelt Feuerlöschdrohnen. Die fünf Punkte gelten für uns wie für jeden anderen Anbieter.',
      sign: 'Mit freundlichen Grüßen\nAverium Dynamics UG (haftungsbeschränkt), Berlin',
      requested: 'Sie erhalten diese E-Mail, weil Sie Ihr Ergebnis der Selbstprüfung auf averiumdynamics.com angefordert haben. Ohne Ihre Einwilligung schreiben wir Ihnen nicht erneut.',
    },
    en: {
      subject: function (x, y) { return `Your checklist: ${x} of ${y} settled`; },
      greeting: 'Hello,',
      intro: function (x, y) { return `thank you for your answers. Your result: ${x} of ${y} points settled. Here are the open points with their legal basis and the next step.`; },
      allClear: function (y) { return `thank you for your answers. All ${y} points are settled; none is open.`; },
      skipped: 'Extinguishing agent and failed drop do not apply, because nothing is dropped.',
      basis: 'Basis',
      next: 'Next step',
      points: {
        1: {
          name: 'Operating category',
          open: 'In the open category, dropping objects is not permitted, and neither is carrying dangerous goods. Flight and reconnaissance in A3 are not affected by this.',
          basis: 'Regulation (EU) 2019/947, Article 4(1)(f)',
          next: 'Decide whether anything is to be dropped. If so, the operation is outside the open category, and you need to establish whether § 21k LuftVO applies (see point 2) or an operational authorisation is needed.',
        },
        2: {
          name: 'Who flies',
          open: 'According to EGRED 2, § 21k LuftVO also covers third parties flying under the supervision of a BOS, and it applies to drones with a take-off mass under 25 kilograms. The national minimum standards for this are set out in EGRED 2 and in the STS-BOS of the Luftfahrt-Bundesamt.',
          basis: '§ 21k LuftVO, EGRED 2 (BBK, as of June 2024), STS-BOS (LBA, 16 July 2025)',
          next: 'Decide who flies. If a company flies, record that it flies under the supervision of the BOS, and check the aircraft\'s take-off mass.',
        },
        3: {
          name: 'Airspace',
          open: 'The recommendation from the DFV and the AGBF requires coordination and recommends visibility via ADS-B or FLARM.',
          basis: 'DFV and AGBF, Fachempfehlung Drohnen und UAV in den Feuerwehren, August 2025',
          next: 'Agree with incident command how the drone coordinates with helicopters and air tankers, and check whether the aircraft is visible via ADS-B or FLARM.',
        },
        4: {
          name: 'Extinguishing agent',
          open: 'Placing it on the market is a question of product law and of the state\'s market surveillance. The permit under § 7 SprengG and the rules for storage and transport are a second question.',
          basis: 'ProdSG, § 7 SprengG, 1. SprengV',
          next: 'Ask the supplier in writing on what basis the extinguishing agent is placed on the market and whether a permit under § 7 SprengG is needed. Both apply to every supplier of a system that drops something, including us.',
        },
        5: {
          name: 'Failed drop',
          open: 'On munitions-contaminated ground nothing can be recovered afterwards. Whatever is dropped there has to be allowed to stay where it lands.',
          basis: 'Deployment planning',
          next: 'Ask the supplier in writing what a payload that has not gone off contains and whether it may stay where it lands, and discuss it with the explosive ordnance disposal advisers.',
        },
      },
      offerHead: 'Test it together',
      offerButton: 'Request a test',
      offer: 'Our firefighting drone is a prototype, and we would like to try it out together with you. If you want to test the technology yourselves, simply reply to this email.',
      links: [
        'The article with all sources: https://www.averiumdynamics.com/blog/munitions-contaminated-land-what-the-rules-say',
        'The self-check: https://www.averiumdynamics.com/checklist',
      ],
      disclosure: 'Averium Dynamics develops firefighting drones. The five points apply to us as they do to any other supplier.',
      sign: 'Kind regards\nAverium Dynamics UG (haftungsbeschränkt), Berlin',
      requested: 'You are receiving this email because you requested your self-check result on averiumdynamics.com. Without your consent we will not write to you again.',
    },
  };

  function parse(code) {
    var m = /^(de|en):((?:[1-5][ynud-]){5})$/.exec(String(code || '').trim());
    if (!m) throw new Error('Expected a code like "de:1d2y3u4n5u", got: ' + code);
    var a = {};
    for (var i = 0; i < 10; i += 2) a[m[2][i]] = m[2][i + 1];
    if (a[1] === 'y' && (a[4] !== '-' || a[5] !== '-')) throw new Error('when 1 is y, 4 and 5 must be -');
    if (a[1] !== 'y' && (a[4] === '-' || a[5] === '-')) throw new Error('4 and 5 may only be skipped when 1 is y');
    return { lang: m[1], a: a };
  }

  // Structured result: what the page renders and what the reply is built from.
  function build(code) {
    var p = parse(code), t = TEXT[p.lang], a = p.a;
    var skip = a[1] === 'y';
    var asked = skip ? [1, 2, 3] : [1, 2, 3, 4, 5];
    var open = asked.filter(function (n) { return a[n] !== 'y'; });
    return {
      lang: p.lang, skip: skip, y: asked.length, x: asked.length - open.length,
      labels: { basis: t.basis, next: t.next },
      open: open.map(function (n) {
        var q = t.points[n];
        return { n: n, name: q.name, open: q.open, basis: q.basis, next: q.next };
      })
    };
  }

  function reply(code) {
    var r = build(code), t = TEXT[r.lang];
    var out = [t.greeting, '', r.open.length ? t.intro(r.x, r.y) : t.allClear(r.y)];
    if (r.skip) out.push(t.skipped);
    r.open.forEach(function (p) {
      out.push('', p.n + '. ' + p.name, p.open, t.basis + ': ' + p.basis, t.next + ': ' + p.next);
    });
    // The offer is the lead of this mail. In plain text it is framed by rules;
    // the API renders it as a highlighted box with a button (parts).
    var pre = out.join('\n');
    var rule = '----------------------------------------';
    var offerText = [rule, t.offerHead.toUpperCase(), t.offer, rule].join('\n');
    var post = t.links.concat(['', t.disclosure, '', t.sign, '', '--', t.requested]).join('\n');
    return {
      subject: t.subject(r.x, r.y),
      body: [pre, '', offerText, '', post].join('\n'),
      parts: { pre: pre, offerHead: t.offerHead, offer: t.offer, button: t.offerButton, post: post }
    };
  }

  return { TEXT: TEXT, parse: parse, build: build, reply: reply };
});
