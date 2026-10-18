import path from 'node:path';
import { evidence } from './evidence.mjs';

export const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
export const routes = [['', 'Home'], ['services', 'Services'], ['research', 'Research examples'], ['method', 'Our method'], ['about', 'Expertise'], ['contact', 'Discuss a matter']];
export const canonicalRoot = 'https://patents.zeus.fyi';

export function context(route) {
  const relativeRoot = path.posix.relative(route, '') || '.';
  return {
    route,
    url: target => `${relativeRoot}/${target ? target + '/' : ''}`,
    asset: name => `${relativeRoot}/assets/${name}`
  };
}

export function document(c, title, description, body) {
  const navigation = routes.map(([route, name]) => `<a href="${c.url(route)}"${c.route === route || (route === 'research' && c.route.startsWith('research/')) ? ' aria-current="page"' : ''}${route === 'contact' ? ' class="nav-contact"' : ''}>${name}</a>`).join('');
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>${escape(title)} | Zeusfyi Patent Research</title>
  <meta name="description" content="${escape(description)}">
  <link rel="canonical" href="${canonicalRoot}/${c.route ? c.route + '/' : ''}">
  <meta property="og:title" content="${escape(title)} | Zeusfyi Patent Research">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalRoot}/${c.route ? c.route + '/' : ''}">
  <meta name="theme-color" content="#fff1e5">
  <link rel="icon" href="${c.asset('favicon.svg')}" type="image/svg+xml">
  <link rel="stylesheet" href="${c.asset('site.css')}">
  <script src="${c.asset('site.js')}" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="site-shell">
    <header class="site-header">
      <div class="edition-line"><span>Independent technical research</span><span>Electrical engineering · Aerospace · Software</span></div>
      <div class="masthead"><a href="${c.url('')}" aria-label="Zeusfyi Patent Research home">Zeusfyi <span>Patent Research</span></a></div>
      <nav class="desktop-nav" aria-label="Main navigation">${navigation}</nav>
      <details class="mobile-menu"><summary>Menu</summary><nav aria-label="Mobile navigation">${navigation}</nav></details>
    </header>
    <main id="main">${body}</main>
    <footer class="site-footer"><div><a class="footer-brand" href="${c.url('')}">Zeusfyi</a><p>Technical research for patent-defense teams.</p></div><div class="footer-links"><a href="${c.url('contact')}">Discuss a matter</a><a href="mailto:alex@zeus.fyi">alex@zeus.fyi</a><a href="${c.url('privacy')}">Privacy &amp; terms</a><a href="https://zeus.fyi">Zeusfyi main site</a></div><p class="footer-note">© 2026 Zeusfyi. Research and documentation for counsel. Research examples do not imply a contest award, client relationship or legal outcome.</p></footer>
  </div>
</body>
</html>
`;
}

export function callToAction(c, title = 'Have a patent and a deadline?') {
  return `<section class="inquiry-band"><div><p class="eyebrow">Start with the technical question</p><h2>${title}</h2><p>Tell us the patent, claims of interest and timing. We will confirm the scope, fixed fee and delivery date before work begins.</p></div><a class="button" href="${c.url('contact')}">Discuss your matter</a></section>`;
}

export function caseCard(c, item) {
  return `<article class="case-card"><p class="eyebrow">${escape(item.topic)}</p><h3><a href="${c.url('research/' + item.slug)}">${escape(item.title)}</a></h3><p class="case-meta">${escape(item.owner)} · ${escape(item.patent)} · Claim ${item.claim}</p><p>${escape(item.summary)}</p><a class="text-link" href="${c.url('research/' + item.slug)}">Read the research example</a></article>`;
}

export function evidenceView({ compact = false } = {}) {
  const selected = evidence['16c2'];
  const scores = [['1pre','A',97,'Preamble'],['16a','A',95,'Monitoring'],['16b','A',97,'LED control'],['16c1','B',75,'Working'],['16c2','C',50,'Warnings'],['16c3','B',75,'Inverter error'],['16c4','B',75,'Grid error'],['16c5','B',75,'Off'],['P2','B',78,'Combination']];
  const scoreButtons = scores.map(([id, grade, score, label]) => `<button type="button" class="score grade-${grade.toLowerCase()}" data-score="${id}" aria-pressed="${id === '16c2'}" aria-controls="evidence-detail" disabled><span>${id}</span><strong>${grade} <b>${score}</b></strong><small>${label}</small></button>`).join('');
  const source = entry => entry.passages.map(([text, highlighted]) => `<p>${highlighted ? `<mark>${escape(text)}</mark>` : escape(text)}</p>`).join('');
  return `<section class="evidence-module${compact ? ' evidence-compact' : ''}" data-evidence aria-labelledby="evidence-heading">
    <div class="section-heading"><div><p class="eyebrow">Inside a submitted claim chart</p><h2 id="evidence-heading">Every limitation. Its evidence. Its limits.</h2></div><p class="caption">CyboEnergy · US 9,331,488 B2<br>Claim 16 · Ground 2</p></div>
    <p class="evidence-instruction">Select a limitation to inspect its assessment and highlighted source passage.</p>
    <div class="score-strip" role="group" aria-label="Claim limitation assessments">${scoreButtons}</div>
    <div class="score-legend"><span>A · Strong · 90–100</span><span>B · Strong combination · 75–89</span><span>C · Arguable · 45–74</span><span>D · Thin · 20–44</span><span>E · Weak · 0–19</span></div>
    <div id="evidence-detail" class="evidence-spread" aria-live="polite" aria-atomic="true">
      <div class="evidence-reading"><p class="eyebrow" data-field="label">${selected.label}</p><h3 data-field="title">${selected.title}</h3><p data-field="mapping">${selected.mapping}</p><div class="reading-note"><p class="eyebrow">What the score reflects</p><p data-field="limit">${selected.limit}</p></div><p class="caption" data-field="pinpoint">${selected.pinpoint}</p></div>
      <div class="source-sheet"><div class="source-sheet-header"><span data-field="document">${selected.document}</span><span data-field="page">${selected.page}</span></div><p class="eyebrow" data-source-kind>Source text · Typeset excerpt</p><h3 data-field="sourceTitle">${selected.sourceTitle}</h3><div data-passages>${source(selected)}</div><p class="source-sheet-footer">Highlighted text from the reference cited in the research record.</p></div>
    </div>
    <p class="caption score-context">Recorded assessment: 15 October 2026. Scores assess the evidence for this ground; they are not probabilities of invalidity. P2 is the reason to combine, a claim-wide point.</p>
    <noscript><p>The warning-state excerpt is shown above. ${compact ? 'Open the full case example for all limitation notes.' : 'All limitation notes are available below without JavaScript.'}</p></noscript>
    ${compact ? '' : `<details class="reading-details"><summary>Read all limitation notes</summary><div class="all-notes">${scores.map(([id]) => `<article><h3>${escape(evidence[id].label)}</h3><p>${escape(evidence[id].mapping)}</p><p>${escape(evidence[id].limit)}</p><p class="caption">${escape(evidence[id].pinpoint)}</p></article>`).join('')}</div></details>`}
    <script type="application/json" data-evidence-data>${JSON.stringify(evidence).replaceAll('<','\\u003c')}</script>
  </section>`;
}

export function searchRecord() {
  const stages = [
    ['Raw search hits',465048,'Rows across 22 search lanes',''],
    ['Screening pool',48491,'44,614 patent families + 3,877 non-patent works',''],
    ['First-round screening',7200,'Recorded screening decisions',''],
    ['Judged',34,'Candidate judgments recorded',''],
    ['Charted',10,'References included in the chart','charted'],
    ['Not yet screened',42075,'Outstanding pool recorded in the snapshot','pending']
  ];
  // The supplied dashboard uses log10 from 1 to 1,000,000. Keep the same explicit scale.
  const axisDecades = 6;
  return `<figure class="search-record"><figcaption><p class="eyebrow">Example search record</p><h2>Broad discovery. A visible review trail.</h2><p>See what was found, what was assessed and what remained outside the completed screening.</p></figcaption><div class="funnel" role="list">${stages.map(([name,count,detail,kind]) => `<div class="funnel-row ${kind}" role="listitem"><div><strong>${name}</strong><small>${detail}</small></div><span class="funnel-count">${count.toLocaleString('en-US')}</span><div class="funnel-track" aria-hidden="true"><i style="width:${(Math.log10(count)/axisDecades*100).toFixed(3)}%"></i></div></div>`).join('')}<div class="funnel-axis" aria-hidden="true"><div></div><div></div><div><span>1</span><span>10</span><span>100</span><span>1k</span><span>10k</span><span>100k</span><span>1m</span></div></div></div><p class="caption">Logarithmic bar scale. Snapshot supplied by Zeusfyi. Search hits include overlapping records; stages retain different counting units and are not a single conversion cohort. This example is not attributed to a named patent.</p><details class="reading-details"><summary>Full snapshot context</summary><p>Found: 45,070, with 4,069 non-patent lane records. Ranked: 44,614, with 3,877 non-patent works ranked with text. First-round decisions: 5,972 standing keep, 268 standing relevant, 960 standing drop. Evidence-round screening: not run / not recorded. Judged: 34, with 33 candidates kept by the reader.</p></details></figure>`;
}
