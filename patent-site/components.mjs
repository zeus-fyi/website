import path from 'node:path';
import { sourceDocuments, sourcePages } from './source-pages.mjs';

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

// The strip shows nine columns on a wide screen; a chart with more rows balances them over as
// few rows as nine columns allow, one with fewer fills the width.
export function stripColumns(count) {
  return count > 9 ? Math.ceil(count / Math.ceil(count / 9)) : count;
}

// The label of a row: its kind, its id and its rating, "Weakest" on the selected row.
export function rowLabel(id, entry, selected) {
  const kind = entry.summary ? 'Claim-wide point' : id.endsWith('pre') ? 'Preamble' : 'Limitation';
  return `${kind} ${id} · ${entry.rating}${id === selected ? ' · Weakest' : ''}`;
}

// A source view: an original page rendered by render-source-pages.py ([pageId, [fragmentIds]]),
// or, for a document with no public copy, an inline entry {reference, document, edition, pageLabel,
// citation, quotes, translations?} shown as its quotes with the citation and no page.
function sourceView(c, entry) {
  if (!Array.isArray(entry)) {
    return { reference: entry.reference, document: entry.document, edition: entry.edition,
      pageLabel: entry.pageLabel, citation: entry.citation, unavailable: true,
      fragments: entry.quotes.map((quote, index) => ({ quote, rects: [], ...(entry.translations && entry.translations[index] ? { translation: entry.translations[index] } : {}) })) };
  }
  const [pageId, fragmentIds] = entry, page = sourcePages[pageId], doc = sourceDocuments[page.document];
  return { pageId, reference: doc.reference, document: doc.title, edition: doc.edition,
    archiveDate: doc.archiveDate, originalUrl: `${doc.url}#page=${page.pdfPage}`,
    printedPage: page.printedPage, pdfPage: page.pdfPage, pageCount: doc.pageCount,
    image: c.asset(page.image), width: page.width, height: page.height,
    fragments: fragmentIds.map(fragmentId => page.fragments[fragmentId]),
    ...(page.pageLabel ? { pageLabel: page.pageLabel } : {}),
    ...(doc.sourceNote ? { sourceNote: doc.sourceNote } : {}) };
}

export const UNAVAILABLE = 'The original page is not publicly available.';

// The interactive claim chart of one case: chart is one entry of caseEvidence; suffix makes the
// element ids unique when a page carries more than one chart.
export function evidenceView(c, chart, { compact = false, suffix = '' } = {}) {
  const records = Object.fromEntries(Object.entries(chart.limitations).map(([id, entry]) => [id, {
    label: rowLabel(id, entry, chart.selected), title: entry.title, mapping: entry.mapping, limit: entry.limit,
    pinpoint: entry.pinpoint, summary: Boolean(entry.summary),
    ...(entry.note ? { note: entry.note } : {}),
    views: entry.sourceViews.map(entry => sourceView(c, entry))
  }]));
  const selected = records[chart.selected], firstView = selected.views[0];
  const scores = Object.entries(chart.limitations).map(([id, entry]) => {
    const [grade, score] = entry.rating.split(' ');
    return [id, grade, Number(score), entry.short];
  });
  const scoreButtons = scores.map(([id, grade, score, label]) => `<button type="button" class="score grade-${grade.toLowerCase()}" data-score="${id}" aria-pressed="${id === chart.selected}" aria-controls="evidence-detail${suffix}" disabled><span>${id}</span><strong>${grade} <b>${score}</b></strong><small>${escape(label)}</small></button>`).join('');
  const columns = stripColumns(scores.length);
  const printed = view => view.pageLabel || `Printed p. ${view.printedPage}`;
  const pageLabel = view => view.unavailable ? escape(view.citation) : `${printed(view)} · PDF page ${view.pdfPage} of ${view.pageCount}`;
  const sourceNote = view => view.unavailable ? UNAVAILABLE : view.sourceNote || `Archived ${view.archiveDate} from the manufacturer’s website.`;
  const pageNote = view => view.unavailable ? 'The quoted passage is shown with its citation. ' + UNAVAILABLE
    : 'Original document page. Highlights identify the quoted passages.';
  const quotes = view => view.fragments.map(fragment => `<blockquote><p><mark>${escape(fragment.quote)}</mark></p>${fragment.translation ? `<p class="caption">${escape(fragment.translation)}</p>` : ''}</blockquote>`).join('');
  const pageImage = view => view.unavailable
    ? `<div class="source-unavailable" data-source-unavailable><p>${UNAVAILABLE}</p><p class="caption">${escape(view.citation)}</p></div>`
    : `<div class="source-page" data-source-page><img data-source-image src="${escape(view.image)}" width="${view.width}" height="${view.height}" loading="lazy" alt="${escape(view.document)}, ${view.pageLabel ? escape(view.pageLabel) : 'printed page ' + view.printedPage}. The cited passages are highlighted; their text appears beside the page."><div class="source-highlights" data-source-highlights aria-hidden="true">${view.fragments.flatMap(fragment => fragment.rects.map(([x,y,w,h]) => `<span style="left:${x}%;top:${y}%;width:${w}%;height:${h}%"></span>`)).join('')}</div></div>`;
  const noteLink = view => view.unavailable ? `<span>${escape(view.reference)} · ${escape(view.citation)}</span>` : `<a href="${escape(view.originalUrl)}" target="_blank" rel="noopener">${view.reference} · ${view.pageLabel ? escape(view.pageLabel) : 'Original p. ' + view.printedPage}</a>`;
  return `<section class="evidence-module${compact ? ' evidence-compact' : ''}" data-evidence aria-labelledby="evidence-heading${suffix}">
    <div class="section-heading"><div><p class="eyebrow">${escape(chart.eyebrow || 'Inside a submitted claim chart')}</p><h2 id="evidence-heading${suffix}">${escape(chart.heading || 'Every limitation. Its evidence. Its limits.')}</h2></div><p class="caption">${chart.caption.map(escape).join('<br>')}</p></div>
    <p class="evidence-instruction">Select a limitation to inspect the original reference page and its highlighted evidence.</p>
    <div class="score-strip" role="group" aria-label="Claim limitation assessments"${columns === 9 ? '' : ` style="--strip-columns:${columns}"`}>${scoreButtons}</div>
    <div class="score-legend"><span>A · Strong · 90–100</span><span>B · Strong combination · 75–89</span><span>C · Arguable · 45–74</span><span>D · Thin · 20–44</span><span>E · Weak · 0–19</span></div>
    <p class="visually-hidden" role="status" data-evidence-status></p>
    <div id="evidence-detail${suffix}" class="evidence-spread">
      <div class="evidence-reading"><p class="eyebrow" data-field="label">${selected.label}</p><h3 data-field="title">${selected.title}</h3><p data-field="mapping">${selected.mapping}</p><div class="source-quotation"><p class="eyebrow">Passages on the original page</p><div data-passages>${quotes(firstView)}</div><p class="caption" data-quote-reference>${firstView.reference} · ${firstView.document} · ${firstView.unavailable ? escape(firstView.citation) : printed(firstView)}</p></div><div class="reading-note"><p class="eyebrow">What the score reflects</p><p data-field="limit">${selected.limit}</p></div><p class="caption" data-field="pinpoint">${selected.pinpoint}</p></div>
      <figure class="source-viewer">
        <figcaption><p class="eyebrow" data-source-kind>Original reference · ${firstView.reference}</p><h3 data-document-title>${firstView.document}</h3><p class="caption" data-document-edition>${firstView.edition}</p></figcaption>
        <div class="source-page-tabs" data-source-pages role="group" aria-label="Cited source pages" hidden></div>
        <div class="source-toolbar"><span data-page-label>${pageLabel(firstView)}</span><button type="button" data-enlarge hidden>Enlarge page</button></div>
        <div data-page-host>${pageImage(firstView)}</div>
        <p class="caption source-image-error" data-image-error hidden>The page image could not load. Open the original PDF below to inspect the reference.</p>
        <div class="source-reference-links"><a data-original-pdf href="${firstView.unavailable ? '' : escape(firstView.originalUrl)}" target="_blank" rel="noopener"${firstView.unavailable ? ' hidden' : ''}>Open original PDF</a><button type="button" data-toggle-highlights aria-pressed="true" hidden>Hide highlights</button></div>
        <p class="caption" data-archive-date>${escape(sourceNote(firstView))}</p>
        <p class="source-viewer-note" data-source-note>${pageNote(firstView)}</p>
      </figure>
    </div>
    <p class="caption score-context">Recorded assessment: ${escape(chart.assessed)}. Scores assess the evidence for this ground; they are not probabilities of invalidity.${chart.pointsNote ? ' ' + escape(chart.pointsNote) : ''}</p>
    <noscript><p>${escape(chart.staticNote)} ${compact ? 'Open the full case example for all limitation notes and source links.' : 'All limitation notes and source links are available below without JavaScript.'}</p></noscript>
    ${compact ? '' : `<details class="reading-details"><summary>Read all limitation notes</summary><div class="all-notes">${scores.map(([id]) => `<article><h3>${escape(records[id].label)}</h3><p>${escape(records[id].mapping)}</p><p>${escape(records[id].limit)}</p><p class="caption">${escape(records[id].pinpoint)}</p><p class="note-source-links">${records[id].views.map(noteLink).join(' ')}</p></article>`).join('')}</div></details>`}
    <dialog class="source-dialog" aria-labelledby="source-dialog-title${suffix}" data-source-dialog><header><div><p class="eyebrow">Original reference page</p><h2 id="source-dialog-title${suffix}" data-dialog-title></h2></div><button type="button" data-close-dialog>Close</button></header><div class="dialog-toolbar"><a data-dialog-original target="_blank" rel="noopener">Open original PDF</a><button type="button" data-dialog-zoom aria-pressed="false">Zoom in</button><button type="button" data-dialog-highlights aria-pressed="true">Hide highlights</button></div><p class="caption dialog-instruction">Zoom in to read the page; scroll to inspect the highlighted passages.</p><div class="document-scroll" data-dialog-scroll tabindex="0" aria-label="Scrollable original document page"><div data-dialog-page></div></div></dialog>
    <script type="application/json" data-evidence-data>${JSON.stringify(records).replaceAll('<','\\u003c')}</script>
  </section>`;
}

// The backup and alternative grounds a case recorded beside its submitted chart: a labelled
// section per ground with its references, the verdict recorded for it in plain words, and for
// each limitation the quoted passage, its pinpoint and the original document.
export function backupGroundsView(c, grounds) {
  if (!grounds || !grounds.length) return '';
  const quote = limitation => `<blockquote><p>“<mark>${escape(limitation.quote)}</mark>”</p>${limitation.translation ? `<p class="caption">${escape(limitation.translation)}</p>` : ''}</blockquote>`;
  const source = limitation => limitation.pageId
    ? (() => { const view = sourceView(c, [limitation.pageId, limitation.fragmentIds || []]); return `<a href="${escape(view.originalUrl)}" target="_blank" rel="noopener">${escape(limitation.pinpoint)}</a>`; })()
    : limitation.url ? `<a href="${escape(limitation.url)}" target="_blank" rel="noopener">${escape(limitation.pinpoint)}</a>` : escape(limitation.pinpoint);
  return `<section class="backup-grounds" aria-labelledby="backup-grounds-heading">
    <div class="section-heading"><div><p class="eyebrow">Also recorded in the research</p><h2 id="backup-grounds-heading">The alternative grounds, kept visible.</h2></div><p class="caption">${grounds.length} backup ${grounds.length === 1 ? 'ground' : 'grounds'} beside the submitted chart</p></div>
    <p class="evidence-instruction">Each alternative ground below was researched and recorded with the submission. Its verdict is the one recorded in the research; alternatives are not scored on the band scale unless the record scores them.</p>
    ${grounds.map((ground, index) => `<details class="reading-details backup-ground" data-backup-ground="${escape(ground.label)}"${index === 0 ? '' : ''}><summary>${escape(ground.label)} · ${escape(ground.title)}</summary><div class="backup-body"><p class="eyebrow">References</p><p class="backup-references">${ground.references.map(reference => reference.url ? `<a href="${escape(reference.url)}" target="_blank" rel="noopener">${escape(reference.title)}</a>` : escape(reference.title)).join(' · ')}</p><div class="reading-note"><p class="eyebrow">Recorded verdict</p><p>${escape(ground.verdict)}</p></div>${ground.rationale ? `<p class="backup-rationale">${escape(ground.rationale)}</p>` : ''}<div class="all-notes">${ground.limitations.map(limitation => `<article><h3>${escape(limitation.id)}</h3><p class="caption">${escape(limitation.text)}</p>${quote(limitation)}<p class="note-source-links">${source(limitation)}</p>${limitation.note ? `<p>${escape(limitation.note)}</p>` : ''}</article>`).join('')}</div></div></details>`).join('')}
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
