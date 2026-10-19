(function () {
'use strict';
/* No dependencies, external data requests or client-side routing. */
document.querySelectorAll('[data-evidence]').forEach(function (module) {
  var records;
  try { records = JSON.parse(module.querySelector('[data-evidence-data]').textContent); }
  catch (_) { return; }
  var buttons = module.querySelectorAll('[data-score]');
  var currentId, currentRecord, currentView, highlightsVisible = true;
  var dialog = module.querySelector('[data-source-dialog]');
  var enlarge = module.querySelector('[data-enlarge]');
  var pageTabs = module.querySelector('[data-source-pages]');
  var imageError = module.querySelector('[data-image-error]');
  var UNAVAILABLE = 'The original page is not publicly available.';
  function makePage(view) {
    var page = document.createElement('div');
    if (view.unavailable) {
      page.className = 'source-unavailable';
      page.setAttribute('data-source-unavailable', '');
      var line = document.createElement('p'), cite = document.createElement('p');
      line.textContent = UNAVAILABLE; cite.className = 'caption'; cite.textContent = view.citation;
      page.appendChild(line); page.appendChild(cite);
      return page;
    }
    page.className = 'source-page';
    page.setAttribute('data-source-page', '');
    var image = document.createElement('img');
    image.setAttribute('data-source-image', '');
    image.width = view.width; image.height = view.height;
    image.loading = 'lazy';
    image.alt = view.document + ', ' + (view.pageLabel || 'printed page ' + view.printedPage) + '. ' + 'The cited passages are highlighted; their text appears beside the page.';
    image.addEventListener('error', function () { imageError.hidden = false; });
    image.src = view.image;
    page.appendChild(image);
    var layer = document.createElement('div');
    layer.className = 'source-highlights';
    layer.setAttribute('data-source-highlights', '');
    layer.setAttribute('aria-hidden', 'true');
    view.fragments.forEach(function (fragment) {
      fragment.rects.forEach(function (rect) {
        var highlight = document.createElement('span');
        highlight.style.left = rect[0] + '%'; highlight.style.top = rect[1] + '%';
        highlight.style.width = rect[2] + '%'; highlight.style.height = rect[3] + '%';
        layer.appendChild(highlight);
      });
    });
    page.appendChild(layer);
    return page;
  }
  function updateHighlights() {
    module.querySelectorAll('[data-source-highlights]').forEach(function (layer) { layer.hidden = !highlightsVisible; });
    module.querySelectorAll('[data-toggle-highlights], [data-dialog-highlights]').forEach(function (button) {
      button.textContent = highlightsVisible ? 'Hide highlights' : 'Show highlights';
      button.setAttribute('aria-pressed', String(highlightsVisible));
    });
  }
  function showView(index) {
    var view = currentRecord.views[index];
    if (!view) return;
    currentView = view;
    module.querySelector('[data-document-title]').textContent = view.document;
    module.querySelector('[data-document-edition]').textContent = view.edition;
    module.querySelector('[data-page-label]').textContent = view.unavailable ? view.citation : (view.pageLabel || 'Printed p. ' + view.printedPage) + ' · PDF page ' + view.pdfPage + ' of ' + view.pageCount;
    module.querySelector('[data-source-kind]').textContent = 'Original reference · ' + view.reference;
    var original = module.querySelector('[data-original-pdf]');
    original.hidden = Boolean(view.unavailable); original.href = view.unavailable ? '' : view.originalUrl;
    original.textContent = view.webPage ? 'Open original page' : 'Open original PDF';
    imageError.textContent = 'The page image could not load. Open the original ' + (view.webPage ? 'page' : 'PDF') + ' below to inspect the reference.';
    enlarge.hidden = Boolean(view.unavailable);
    module.querySelector('[data-toggle-highlights]').hidden = Boolean(view.unavailable);
    module.querySelector('[data-archive-date]').textContent = view.unavailable ? UNAVAILABLE : view.sourceNote || ('Archived ' + view.archiveDate + ' from the manufacturer’s website.');
    module.querySelector('[data-quote-reference]').textContent = view.reference + ' · ' + view.document + ' · ' + (view.unavailable ? view.citation : view.pageLabel || 'Printed p. ' + view.printedPage);
    module.querySelector('[data-source-note]').textContent = currentRecord.note || (currentRecord.summary
      ? currentId + ' is the researcher’s combination rationale. These original pages show its cited sources.'
      : view.unavailable
        ? 'The quoted passage is shown with its citation. ' + UNAVAILABLE
        : 'Original document page. Highlights identify the quoted passages.');
    var passages = module.querySelector('[data-passages]');
    passages.textContent = '';
    view.fragments.forEach(function (fragment) {
      var quote = document.createElement('blockquote'), p = document.createElement('p'), mark = document.createElement('mark');
      mark.textContent = fragment.quote;
      p.appendChild(mark); quote.appendChild(p);
      if (fragment.translation) { var translation = document.createElement('p'); translation.className = 'caption'; translation.textContent = fragment.translation; quote.appendChild(translation); }
      passages.appendChild(quote);
    });
    var host = module.querySelector('[data-page-host]');
    host.textContent = ''; imageError.hidden = true;
    host.appendChild(makePage(view));
    pageTabs.querySelectorAll('button').forEach(function (button, buttonIndex) { button.setAttribute('aria-pressed', String(buttonIndex === index)); });
    updateHighlights();
    module.querySelector('[data-evidence-status]').textContent = currentRecord.label + '. ' + view.reference + ', ' + (view.unavailable ? view.citation : view.pageLabel || 'printed page ' + view.printedPage) + '.';
  }
  function select(id) {
    var record = records[id];
    if (!record) return;
    currentId = id; currentRecord = record;
    module.querySelectorAll('[data-field]').forEach(function (field) {
      field.textContent = record[field.getAttribute('data-field')] || '';
    });
    pageTabs.textContent = '';
    record.views.forEach(function (view, index) {
      var button = document.createElement('button');
      button.type = 'button';
      button.textContent = view.reference + ' · ' + (view.pageLabel || 'p. ' + view.printedPage);
      button.setAttribute('aria-label', view.reference + ', ' + view.document + ', ' + (view.unavailable ? view.citation : view.pageLabel || 'printed page ' + view.printedPage));
      button.addEventListener('click', function () { showView(index); });
      pageTabs.appendChild(button);
    });
    pageTabs.hidden = record.views.length < 2;
    showView(0);
    buttons.forEach(function (button) { button.setAttribute('aria-pressed', String(button.getAttribute('data-score') === id)); });
  }
  buttons.forEach(function (button) {
    button.addEventListener('click', function () { select(button.getAttribute('data-score')); });
    button.disabled = false;
  });
  module.querySelectorAll('[data-toggle-highlights], [data-dialog-highlights]').forEach(function (button) {
    button.addEventListener('click', function () { highlightsVisible = !highlightsVisible; updateHighlights(); });
  });
  module.querySelector('[data-dialog-highlights]').hidden = false;
  enlarge.addEventListener('click', function () {
    if (currentView.unavailable) return;
    if (typeof dialog.showModal !== 'function') {
      window.open(currentView.image, '_blank', 'noopener');
      return;
    }
    module.querySelector('[data-dialog-title]').textContent = currentView.reference + ' · ' + currentView.document + ' · ' + (currentView.pageLabel || 'p. ' + currentView.printedPage);
    var dialogOriginal = module.querySelector('[data-dialog-original]');
    dialogOriginal.href = currentView.originalUrl;
    dialogOriginal.textContent = currentView.webPage ? 'Open original page' : 'Open original PDF';
    var host = module.querySelector('[data-dialog-page]');
    host.textContent = '';
    var page = makePage(currentView);
    page.querySelector('img').loading = 'eager';
    host.appendChild(page);
    host.classList.remove('is-zoomed');
    var zoom = module.querySelector('[data-dialog-zoom]');
    zoom.textContent = 'Zoom in'; zoom.setAttribute('aria-pressed', 'false');
    updateHighlights();
    dialog.showModal();
    document.documentElement.classList.add('source-dialog-open');
    var scroll = module.querySelector('[data-dialog-scroll]');
    scroll.scrollTop = 0; scroll.scrollLeft = 0;
  });
  module.querySelector('[data-dialog-zoom]').addEventListener('click', function (event) {
    var host = module.querySelector('[data-dialog-page]');
    var zoomed = host.classList.toggle('is-zoomed');
    event.currentTarget.textContent = zoomed ? 'Fit page' : 'Zoom in';
    event.currentTarget.setAttribute('aria-pressed', String(zoomed));
    var scroll = module.querySelector('[data-dialog-scroll]');
    var page = host.querySelector('[data-source-page]'), rect = zoomed && currentView.fragments[0] && currentView.fragments[0].rects[0];
    if (rect) {
      scroll.scrollLeft = (rect[0] + rect[2] / 2) / 100 * page.clientWidth - scroll.clientWidth / 2;
      scroll.scrollTop = (rect[1] + rect[3] / 2) / 100 * page.clientHeight - scroll.clientHeight / 2;
    } else { scroll.scrollTop = 0; scroll.scrollLeft = 0; }
  });
  module.querySelector('[data-close-dialog]').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('close', function () {
    document.documentElement.classList.remove('source-dialog-open');
    enlarge.focus();
  });
  var initial = module.querySelector('[data-score][aria-pressed="true"]');
  select(initial ? initial.getAttribute('data-score') : buttons[0].getAttribute('data-score'));
});

var inquiry = document.querySelector('[data-inquiry]');
if (inquiry) {
  var result = document.querySelector('[data-inquiry-result]');
  var preview = document.querySelector('[data-inquiry-preview]');
  var inquiryStatus = document.querySelector('[data-copy-status]');
  inquiry.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!inquiry.reportValidity()) return;
    var data = new FormData(inquiry);
    var get = function (key) { return String(data.get(key) || '').trim(); };
    var body = 'Hello Alex,\n\nI would like to discuss a prior-art research engagement.\n\n' +
      'Name: ' + get('name') + '\nWork email: ' + get('email') + '\nFirm / company: ' + (get('firm') || 'Not specified') +
      '\nPatent: ' + get('patent') + '\nClaims: ' + (get('claims') || 'To discuss') + '\nDeadline / timing: ' + get('deadline') +
      '\n\nTechnical question:\n' + (get('brief') || 'To discuss') + '\n\nPlease let me know the proposed scope, fixed fee and timing.\n';
    preview.value = body;
    document.querySelector('[data-email-draft]').href = 'mailto:alex@zeus.fyi?subject=' + encodeURIComponent('Prior-art research inquiry: ' + get('patent')) + '&body=' + encodeURIComponent(body);
    inquiryStatus.textContent = 'Your inquiry has not been sent. Review it in your email app and send when ready.';
    result.hidden = false;
    preview.focus();
  });
  document.querySelector('[data-copy-inquiry]').addEventListener('click', async function () {
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(preview.value);
      inquiryStatus.textContent = 'Copied. Paste the inquiry into an email to alex@zeus.fyi. It has not been sent.';
    } catch (_) {
      preview.focus(); preview.select();
      inquiryStatus.textContent = 'Select and copy the email text above, then email it to alex@zeus.fyi. It has not been sent.';
    }
  });
  inquiry.hidden = false;
}

document.querySelectorAll('.mobile-menu').forEach(function (menu) {
  menu.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
});

})();
