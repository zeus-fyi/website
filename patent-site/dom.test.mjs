// Integration checks in a DOM implementation. These do not test browser layout.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
const script = await readFile(new URL('../patents/assets/site.js',import.meta.url),'utf8');
async function open(route='') {
  const html = await readFile(new URL('../patents/'+route+'index.html',import.meta.url),'utf8');
  const dom = new JSDOM(html,{url:'https://patents.zeus.fyi/'+route,runScripts:'outside-only'});
  dom.window.eval(script);
  return dom;
}
for (const route of ['', 'research/cyboenergy-9331488/']) {
  test('all nine scores change evidence, source highlights and selection: '+(route||'home'),async()=>{
    const dom=await open(route),d=dom.window.document;
    const buttons=[...d.querySelectorAll('[data-score]')];
    assert.equal(buttons.length,9);
    for(const button of buttons){
      assert.equal(button.disabled,false);
      button.click();
      assert.equal(button.getAttribute('aria-pressed'),'true');
      assert.equal(d.querySelectorAll('[data-score][aria-pressed="true"]').length,1);
      assert.ok(d.querySelector('[data-field="label"]').textContent.includes(button.dataset.score));
      assert.ok(d.querySelector('[data-passages] mark').textContent.length>10);
      assert.ok(d.querySelector('[data-field="pinpoint"]').textContent.length>10);
    }
    d.querySelector('[data-score="P2"]').click();
    assert.equal(d.querySelectorAll('[data-source-pages] button').length,2);
    assert.match(d.querySelector('[data-source-note]').textContent,/combination rationale/);
    d.querySelector('[data-score="16c2"]').click();
    assert.match(d.querySelector('[data-field="label"]').textContent,/C 50/);
    assert.match(d.querySelector('[data-source-kind]').textContent,/Original reference/);
    assert.match(d.querySelector('[data-source-image]').src,/sunways-27\.png$/);
    assert.match(d.querySelector('[data-original-pdf]').href,/#page=30$/);
    assert.equal(d.querySelectorAll('[data-source-highlights] span').length,6);
    assert.equal(d.querySelectorAll('[data-passages] mark').length,2);
    d.querySelector('[data-toggle-highlights]').click();
    assert.equal(d.querySelector('[data-source-highlights]').hidden,true);
    d.querySelector('[data-score="16a"]').click();
    assert.equal(d.querySelectorAll('[data-source-pages] button').length,4);
    d.querySelectorAll('[data-source-pages] button')[1].click();
    assert.match(d.querySelector('[data-page-label]').textContent,/Printed p. 23/);
    assert.match(d.querySelector('[data-source-image]').src,/sma-23\.png$/);
    assert.match(d.querySelector('[data-passages]').textContent,/DC inputs is defective/);
    assert.match(d.querySelector('[data-original-pdf]').href,/#page=23$/);
    assert.equal(d.querySelector('[data-source-highlights]').hidden,true);
    d.querySelector('[data-toggle-highlights]').click();
    assert.equal(d.querySelector('[data-source-highlights]').hidden,false);
    dom.window.close();
  });
}
test('inquiry validates, encodes special characters and supports copying without clipboard access',async()=>{
  const dom=await open('contact/'),w=dom.window,d=w.document;
  const form=d.querySelector('[data-inquiry]'),result=d.querySelector('[data-inquiry-result]');
  assert.equal(form.hidden,false);
  form.requestSubmit();
  assert.equal(result.hidden,true);
  const values={name:'A & B',email:'buyer@example.com',firm:'Example firm',patent:'US 9,331,488 B2',claims:'16',deadline:'30 October',brief:'Testing <literal text> & punctuation: ? # %'};
  for(const [key,value] of Object.entries(values))form.elements.namedItem(key).value=value;
  form.requestSubmit();
  assert.equal(result.hidden,false);
  const url=new URL(d.querySelector('[data-email-draft]').href);
  assert.equal(url.protocol,'mailto:');
  assert.equal(url.pathname,'alex@zeus.fyi');
  assert.ok(url.searchParams.get('body').includes(values.brief));
  assert.equal(url.searchParams.get('subject'),'Prior-art research inquiry: '+values.patent);
  assert.equal(d.querySelector('literal'),null);
  assert.match(d.querySelector('[data-copy-status]').textContent,/not been sent/);
  d.querySelector('[data-copy-inquiry]').click();
  await new Promise(resolve=>setImmediate(resolve));
  assert.match(d.querySelector('[data-copy-status]').textContent,/Select and copy/);
  const preview=d.querySelector('[data-inquiry-preview]');
  assert.equal(preview.selectionStart,0);
  assert.equal(preview.selectionEnd,preview.value.length);
  dom.window.close();
});
test('Escape closes the mobile menu and restores summary focus',async()=>{
  const dom=await open(),w=dom.window,d=w.document,menu=d.querySelector('.mobile-menu');
  menu.open=true;
  menu.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
  assert.equal(menu.open,false);
  assert.equal(d.activeElement,menu.querySelector('summary'));
  dom.window.close();
});
