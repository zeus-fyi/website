import {test,expect} from '@playwright/test';
import {pages} from '../pages.mjs';
const widths=[320,390,768,1024,1440];
for(const width of widths){
  test(`all pages fit ${width}px and load without errors`,async({page})=>{
    await page.setViewportSize({width,height:950});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('console',m=>{if(m.type()==='error') errors.push(m.text());});
    for(const entry of pages){
      const response=await page.goto('/'+(entry.route?entry.route+'/':''));
      expect(response.status()).toBe(200);
      await expect(page.locator('h1')).toBeVisible();
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),entry.route+' must not overflow').toBe(true);
      if(width<=650){
        const menu=page.locator('.mobile-menu');
        await menu.locator('summary').click();
        await expect(menu.getByRole('link',{name:'Discuss a matter',exact:true})).toBeVisible();
        await menu.locator('summary').press('Escape');
        await expect(menu).not.toHaveAttribute('open','');
      }else{
        await expect(page.locator('.desktop-nav').getByRole('link',{name:'Discuss a matter',exact:true})).toBeVisible();
      }
    }
    expect(errors).toEqual([]);
  });
  test(`evidence selections and highlights at ${width}px`,async({page})=>{
    await page.setViewportSize({width,height:950});
    await page.goto('/research/cyboenergy-9331488/');
    await expect(page.locator('[data-score="16c2"]')).toHaveAttribute('aria-pressed','true');
    await expect(page.locator('[data-passages] mark')).toHaveCount(2);
    for(const id of ['1pre','16a','16b','16c1','16c3','16c4','16c5','P2','16c2']){
      const button=page.locator(`[data-score="${id}"]`);
      await button.focus();
      await button.press('Enter');
      await expect(button).toHaveAttribute('aria-pressed','true');
      await expect(page.locator('[data-score][aria-pressed="true"]')).toHaveCount(1);
      await expect(page.locator('[data-field="label"]')).toContainText(id==='1pre'?'1pre':id);
      await expect(page.locator('[data-passages] mark').first()).toBeVisible();
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
      const image=page.locator('[data-page-host] [data-source-image]');
      await expect(image).toBeVisible();
      await expect.poll(()=>image.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);
      const alignment=await page.locator('[data-page-host] [data-source-page]').evaluate(el=>{
        const image=el.querySelector('img').getBoundingClientRect();
        return [...el.querySelectorAll('[data-source-highlights] span')].every(mark=>{
          const r=mark.getBoundingClientRect(),x=parseFloat(mark.style.left)/100,y=parseFloat(mark.style.top)/100;
          return Math.abs(r.left-image.left-x*image.width)<1 && Math.abs(r.top-image.top-y*image.height)<1 && r.right<=image.right+1 && r.bottom<=image.bottom+1;
        });
      });
      expect(alignment,'highlights must stay aligned with the original page').toBe(true);
      if(id==='P2') await expect(page.locator('[data-source-note]')).toContainText('combination rationale');
    }
    await expect(page.locator('[data-page-label]')).toHaveText('Printed p. 27 · PDF page 30 of 74');
    await expect(page.locator('[data-original-pdf]')).toHaveAttribute('href',/#page=30$/);
    await page.locator('[data-toggle-highlights]').click();
    await expect(page.locator('[data-page-host] [data-source-highlights]')).toBeHidden();
    await page.locator('[data-toggle-highlights]').click();
    await page.locator('[data-enlarge]').click();
    const dialog=page.locator('[data-source-dialog]');
    await expect(dialog).toBeVisible();
    await expect(page.locator('[data-dialog-original]')).toHaveAttribute('href',/#page=30$/);
    await page.locator('[data-dialog-zoom]').click();
    await expect(page.locator('[data-dialog-zoom]')).toHaveAttribute('aria-pressed','true');
    const scroll=page.locator('[data-dialog-scroll]');
    expect(await scroll.evaluate(el=>el.scrollTop)).toBeGreaterThan(0);
    const firstHighlight=dialog.locator('[data-source-highlights] span').first();
    const viewport=await scroll.boundingBox(), highlight=await firstHighlight.boundingBox();
    expect(highlight.y).toBeGreaterThanOrEqual(viewport.y-1);
    expect(highlight.y+highlight.height).toBeLessThanOrEqual(viewport.y+viewport.height+1);
    await page.locator('[data-dialog-highlights]').click();
    await expect(dialog.locator('[data-source-highlights]')).toBeHidden();
    await page.locator('[data-dialog-highlights]').click();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(page.locator('[data-enlarge]')).toBeFocused();
    await page.locator('[data-score="16a"]').click();
    await expect(page.locator('[data-source-pages] button')).toHaveCount(4);
    for(const number of [13,23,40,44]){
      await page.locator('[data-source-pages]').getByRole('button',{name:new RegExp('printed page '+number+'$')}).click();
      await expect(page.locator('[data-page-host] [data-source-image]')).toHaveAttribute('src',new RegExp('sma-'+number+'\\.png$'));
      await expect(page.locator('[data-original-pdf]')).toHaveAttribute('href',new RegExp('#page='+number+'$'));
    }
    await page.locator('.reading-details summary').click();
    await expect(page.locator('.all-notes article')).toHaveCount(9);
  });
}

test('inquiry produces an editable email draft without submitting data',async({page})=>{
  await page.goto('/contact/');
  const outbound=[];
  page.on('request',r=>{if(r.method()!=='GET')outbound.push(r.url());});
  await page.getByRole('button',{name:'Prepare inquiry',exact:true}).click();
  await expect(page.locator('[data-inquiry-result]')).toBeHidden();
  await page.getByLabel('Your name').fill('Example Buyer');
  await page.getByLabel('Work email').fill('buyer@example.com');
  await page.getByLabel('Firm or company').fill('Example Firm');
  await page.getByLabel('Public patent number').fill('US 9,331,488 B2');
  await page.getByLabel('Claims of interest').fill('16');
  await page.getByLabel('Deadline or timing').fill('30 October 2026');
  await page.getByLabel('Public technical question').fill('LED states & monitoring <public question>');
  await page.getByRole('button',{name:'Prepare inquiry',exact:true}).click();
  await expect(page.locator('[data-inquiry-result]')).toBeVisible();
  await expect(page.locator('[data-inquiry-preview]')).toHaveValue(/LED states & monitoring <public question>/);
  const url=new URL(await page.locator('[data-email-draft]').getAttribute('href'));
  expect(url.protocol).toBe('mailto:');
  expect(url.pathname).toBe('alex@zeus.fyi');
  expect(url.searchParams.get('body')).toContain('US 9,331,488 B2');
  await expect(page.locator('[data-copy-status]')).toContainText('has not been sent');
  expect(outbound).toEqual([]);
});

test('mobile navigation and relative links work under a directory',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/patents/');
  await page.locator('.mobile-menu summary').click();
  await page.locator('.mobile-menu').getByRole('link',{name:'Research examples',exact:true}).click();
  await expect(page).toHaveURL(/\/patents\/research\/$/);
  await page.getByRole('link',{name:'Open the scored claim chart'}).click();
  await expect(page).toHaveURL(/\/patents\/research\/cyboenergy-9331488\/#evidence-heading$/);
  await expect(page.locator('[data-score="16c2"]')).toBeEnabled();
});

test('research and contact remain usable without JavaScript',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const page=await context.newPage();
  await page.goto('http://127.0.0.1:4173/research/cyboenergy-9331488/');
  await expect(page.locator('[data-passages] mark').first()).toBeVisible();
  await expect(page.locator('[data-source-image]')).toBeVisible();
  await expect(page.locator('[data-original-pdf]')).toHaveAttribute('href',/#page=30$/);
  await page.locator('.reading-details summary').click();
  await expect(page.locator('.all-notes article')).toHaveCount(9);
  await page.goto('http://127.0.0.1:4173/contact/');
  await expect(page.locator('noscript a')).toHaveAttribute('href','mailto:alex@zeus.fyi');
  await expect(page.locator('[data-inquiry]')).toBeHidden();
  await context.close();
});

test('original source links survive an image load failure',async({page})=>{
  await page.route('**/assets/sources/*.png',route=>route.abort());
  await page.goto('/research/cyboenergy-9331488/');
  await page.locator('[data-source-image]').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-image-error]')).toBeVisible();
  await expect(page.getByRole('link',{name:'Open original PDF',exact:true})).toHaveAttribute('href',/#page=30$/);
  await expect(page.locator('[data-passages]')).toContainText('temperature limitation');
});

test('404 has working local navigation and styling',async({page})=>{
  const response=await page.goto('/missing/deep/page/');
  expect(response.status()).toBe(404);
  await expect(page.getByRole('heading',{level:1})).toContainText('right page');
  await page.getByRole('link',{name:'Return home',exact:true}).click();
  await expect(page).toHaveURL('http://127.0.0.1:4173/');
});

for(const width of [390,768,1440]){
  test(`review screenshots ${width}px`,async({page},testInfo)=>{
    await page.setViewportSize({width,height:1000});
    for(const route of ['', 'research/cyboenergy-9331488', 'method']){
      await page.goto('/'+(route?route+'/':''));
      const name=(route.split('/').pop()||'home')+'-'+width+'.png';
      const screenshot=await page.screenshot({fullPage:true});
      await testInfo.attach(name,{body:screenshot,contentType:'image/png'});
      if(route==='research/cyboenergy-9331488'){
        await page.locator('[data-evidence]').scrollIntoViewIfNeeded();
        await testInfo.attach('evidence-'+width+'.png',{body:await page.locator('[data-evidence]').screenshot(),contentType:'image/png'});
        await page.locator('[data-enlarge]').click();
        await page.locator('[data-dialog-zoom]').click();
        await testInfo.attach('original-page-zoom-'+width+'.png',{body:await page.screenshot(),contentType:'image/png'});
      }
    }
  });
}
