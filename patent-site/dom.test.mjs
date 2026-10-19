// Integration checks in a DOM implementation. These do not test browser layout.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import { cases } from './cases.mjs';
import { caseEvidence, backupGrounds, caseDrafts } from './evidence.mjs';
import { sourceDocuments, sourcePages } from './source-pages.mjs';
import { UNAVAILABLE } from './components.mjs';
const script = await readFile(new URL('../patents/assets/site.js',import.meta.url),'utf8');
async function open(route='') {
  const html = await readFile(new URL('../patents/'+route+'index.html',import.meta.url),'utf8');
  const dom = new JSDOM(html,{url:'https://patents.zeus.fyi/'+route,runScripts:'outside-only'});
  dom.window.eval(script);
  return dom;
}
// Every page that carries charts: the home page shows the first '488 chart, each charted case all of its own.
const chartPages = [['', [caseEvidence['cyboenergy-9331488'][0]]], ...Object.entries(caseEvidence).map(([slug, charts]) => ['research/'+slug+'/', charts])];
for (const [route, charts] of chartPages) {
  test('every row selects its source pages, passages and highlights: '+(route||'home'),async()=>{
    const dom=await open(route), d=dom.window.document;
    const modules=[...d.querySelectorAll('section.evidence-module')];
    assert.equal(modules.length,charts.length);
    charts.forEach((chart,index)=>{
      const m=modules[index], buttons=[...m.querySelectorAll('[data-score]')];
      assert.deepEqual(buttons.map(b=>b.dataset.score),Object.keys(chart.limitations));
      assert.equal(m.querySelector('[data-score][aria-pressed="true"]').dataset.score,chart.selected);
      assert.ok(m.querySelector('[data-field="label"]').textContent.endsWith(' · Weakest'));
      for(const button of buttons){
        const id=button.dataset.score, entry=chart.limitations[id];
        assert.equal(button.disabled,false);
        button.click();
        assert.equal(button.getAttribute('aria-pressed'),'true');
        assert.equal(m.querySelectorAll('[data-score][aria-pressed="true"]').length,1);
        assert.ok(m.querySelector('[data-field="label"]').textContent.includes(id+' · '+entry.rating));
        assert.equal(m.querySelector('[data-field="pinpoint"]').textContent,entry.pinpoint);
        const tabs=[...m.querySelectorAll('[data-source-pages] button')];
        assert.equal(tabs.length,entry.sourceViews.length);
        assert.equal(m.querySelector('[data-source-pages]').hidden,entry.sourceViews.length<2);
        entry.sourceViews.forEach((view,viewIndex)=>{
          if(viewIndex>0) tabs[viewIndex].click();
          const note=m.querySelector('[data-source-note]').textContent;
          if(!Array.isArray(view)){
            assert.ok(m.querySelector('[data-page-host] [data-source-unavailable]'),id+' shows the unavailable notice');
            assert.ok(m.querySelector('[data-page-host]').textContent.includes(UNAVAILABLE),id);
            assert.ok(m.querySelector('[data-page-host]').textContent.includes(view.citation),id);
            assert.equal(m.querySelector('[data-page-host] [data-source-image]'),null,id);
            assert.equal(m.querySelector('[data-original-pdf]').hidden,true,id);
            assert.equal(m.querySelector('[data-enlarge]').hidden,true,id);
            assert.deepEqual([...m.querySelectorAll('[data-passages] mark')].map(x=>x.textContent),view.quotes,id);
            assert.ok(entry.summary ? note.includes('combination rationale')||entry.note : note.includes(UNAVAILABLE),id);
            return;
          }
          const [pageId,fragmentIds]=view, page=sourcePages[pageId], doc=sourceDocuments[page.document];
          assert.ok(m.querySelector('[data-source-image]').src.endsWith('/assets/'+page.image),pageId);
          assert.ok(m.querySelector('[data-original-pdf]').href.endsWith('#page='+page.pdfPage),pageId);
          assert.equal(m.querySelector('[data-original-pdf]').hidden,false,pageId);
          assert.equal(m.querySelector('[data-page-label]').textContent,(page.pageLabel||'Printed p. '+page.printedPage)+' · PDF page '+page.pdfPage+' of '+doc.pageCount);
          assert.deepEqual([...m.querySelectorAll('[data-passages] mark')].map(x=>x.textContent),fragmentIds.map(f=>page.fragments[f].quote));
          const rects=fragmentIds.flatMap(f=>page.fragments[f].rects);
          assert.equal(m.querySelectorAll('[data-page-host] [data-source-highlights] span').length,rects.length,pageId);
          if(entry.note) assert.equal(note,entry.note,id);
          else if(entry.summary) assert.ok(note.includes(id+' is the researcher’s combination rationale'),id);
          else if(page.textLayer===false) assert.ok(note.includes('Highlights are not available for this scanned page'),pageId);
          else assert.ok(note.includes('Highlights identify the quoted passages'),pageId);
          assert.equal(m.querySelector('[data-archive-date]').textContent,doc.sourceNote||'Archived '+doc.archiveDate+' from the manufacturer’s website.',pageId);
        });
      }
    });
    dom.window.close();
  });
}
for (const item of cases) {
  if (caseEvidence[item.slug]) continue;
  test('a case without chart data shows its excerpt: '+item.slug,async()=>{
    const dom=await open('research/'+item.slug+'/'),d=dom.window.document;
    assert.equal(d.querySelector('[data-evidence]'),null);
    assert.equal(d.querySelectorAll('[data-score]').length,0);
    assert.ok(d.querySelector('.case-excerpt'));
    dom.window.close();
  });
}
for (const [slug, grounds] of Object.entries(backupGrounds)) {
  test('the backup grounds render with their references, verdicts and quotes: '+slug,async()=>{
    const dom=await open('research/'+slug+'/'),d=dom.window.document;
    const sections=[...d.querySelectorAll('[data-backup-ground]')];
    assert.deepEqual(sections.map(s=>s.dataset.backupGround),grounds.map(g=>g.label));
    grounds.forEach((ground,index)=>{
      const section=sections[index];
      assert.ok(section.querySelector('summary').textContent.includes(ground.title));
      assert.ok(section.querySelector('.reading-note p:not(.eyebrow)').textContent.includes(ground.verdict));
      assert.equal(section.querySelectorAll('.backup-references a, .backup-references').length>0,true);
      const articles=[...section.querySelectorAll('article')];
      assert.equal(articles.length,ground.limitations.length,ground.label);
      ground.limitations.forEach((limitation,i)=>{
        assert.equal(articles[i].querySelector('h3').textContent,limitation.id);
        assert.equal(articles[i].querySelector('mark').textContent,limitation.quote);
        assert.ok(articles[i].querySelector('.note-source-links').textContent.includes(limitation.pinpoint));
      });
    });
    dom.window.close();
  });
}
test('every prepared draft row and backup limitation points at a rendered page and its fragments',()=>{
  for(const [slug,draft] of Object.entries(caseDrafts)) for(const [id,row] of Object.entries(draft.rows)){
    assert.ok(row.pinpoint.length>8,slug+' '+id);
    for(const [pageId,fragmentIds] of row.sourceViews){
      assert.ok(sourcePages[pageId],slug+' '+id+' '+pageId);
      for(const f of fragmentIds) assert.ok(sourcePages[pageId].fragments[f],slug+' '+id+' '+pageId+' '+f);
    }
  }
  for(const grounds of Object.values(backupGrounds)) for(const ground of grounds) for(const limitation of ground.limitations){
    if(limitation.pageId){
      assert.ok(sourcePages[limitation.pageId],limitation.pageId);
      for(const f of limitation.fragmentIds) assert.equal(sourcePages[limitation.pageId].fragments[f].quote,limitation.quote,ground.label+' '+limitation.id);
    }
  }
});
test('the ’488 chart: the weakest row, the combination point and the highlight toggle',async()=>{
  const dom=await open('research/cyboenergy-9331488/'),d=dom.window.document;
  assert.equal(d.querySelectorAll('[data-score]').length,9);
  d.querySelector('[data-score="P2"]').click();
  assert.equal(d.querySelectorAll('[data-source-pages] button').length,2);
  assert.ok(d.querySelector('[data-source-note]').textContent.includes('combination rationale'));
  d.querySelector('[data-score="16c2"]').click();
  assert.ok(d.querySelector('[data-field="label"]').textContent.includes('C 50'));
  assert.ok(d.querySelector('[data-source-kind]').textContent.includes('Original reference'));
  assert.ok(d.querySelector('[data-source-image]').src.endsWith('sunways-27.png'));
  assert.ok(d.querySelector('[data-original-pdf]').href.endsWith('#page=30'));
  assert.equal(d.querySelectorAll('[data-source-highlights] span').length,6);
  assert.equal(d.querySelectorAll('[data-passages] mark').length,2);
  d.querySelector('[data-toggle-highlights]').click();
  assert.equal(d.querySelector('[data-source-highlights]').hidden,true);
  d.querySelector('[data-score="16a"]').click();
  assert.equal(d.querySelectorAll('[data-source-pages] button').length,4);
  d.querySelectorAll('[data-source-pages] button')[1].click();
  assert.ok(d.querySelector('[data-page-label]').textContent.includes('Printed p. 23'));
  assert.ok(d.querySelector('[data-source-image]').src.endsWith('sma-23.png'));
  assert.ok(d.querySelector('[data-passages]').textContent.includes('DC inputs is defective'));
  assert.ok(d.querySelector('[data-original-pdf]').href.endsWith('#page=23'));
  assert.equal(d.querySelector('[data-source-highlights]').hidden,true);
  d.querySelector('[data-toggle-highlights]').click();
  assert.equal(d.querySelector('[data-source-highlights]').hidden,false);
  dom.window.close();
});
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
  assert.ok(d.querySelector('[data-copy-status]').textContent.includes('not been sent'));
  d.querySelector('[data-copy-inquiry]').click();
  await new Promise(resolve=>setImmediate(resolve));
  assert.ok(d.querySelector('[data-copy-status]').textContent.includes('Select and copy'));
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
