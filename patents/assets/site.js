(function () {
'use strict';
/* No dependencies, network requests or client-side routing. */
document.querySelectorAll('[data-evidence]').forEach(function (module) {
  var records;
  try { records = JSON.parse(module.querySelector('[data-evidence-data]').textContent); }
  catch (_) { return; }
  var buttons = module.querySelectorAll('[data-score]');
  function select(id) {
    var record = records[id];
    if (!record) return;
    module.querySelectorAll('[data-field]').forEach(function (field) {
      field.textContent = record[field.getAttribute('data-field')] || '';
    });
    var passages = module.querySelector('[data-passages]');
    passages.textContent = '';
    record.passages.forEach(function (entry) {
      var p = document.createElement('p');
      if (entry[1]) {
        var mark = document.createElement('mark');
        mark.textContent = entry[0];
        p.appendChild(mark);
      } else { p.textContent = entry[0]; }
      passages.appendChild(p);
    });
    module.querySelector('[data-source-kind]').textContent = record.summary ? 'Researcher rationale · Summary' : 'Source text · Typeset excerpt';
    module.querySelector('.source-sheet-footer').textContent = record.summary ? 'This is the researcher’s combination rationale, not a quotation from a source.' : 'Highlighted text from the reference cited in the research record.';
    buttons.forEach(function (button) { button.setAttribute('aria-pressed', String(button.getAttribute('data-score') === id)); });
  }
  buttons.forEach(function (button) {
    button.addEventListener('click', function () { select(button.getAttribute('data-score')); });
    button.disabled = false;
  });
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
