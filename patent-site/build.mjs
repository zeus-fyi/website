import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages } from './pages.mjs';
import { document, context, canonicalRoot } from './components.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(projectRoot, 'patents');
for (const page of pages) {
  const destination = path.join(output, page.route);
  await fs.mkdir(destination, { recursive:true });
  const c = context(page.route);
  await fs.writeFile(path.join(destination,'index.html'),document(c,page.title,page.description,page.render(c)));
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p=>`  <url><loc>${canonicalRoot}/${p.route?p.route+'/':''}</loc></url>`).join('\n')}\n</urlset>\n`;
await fs.writeFile(path.join(output,'sitemap.xml'),sitemap);
await fs.writeFile(path.join(output,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${canonicalRoot}/sitemap.xml\n`);
// This standalone deployment's 404 uses origin-root URLs for arbitrary missing paths.
const notFoundContext = {route:'404',url:target=>`/${target?target+'/':''}`,asset:name=>`/assets/${name}`};
await fs.writeFile(path.join(output,'404.html'),document(notFoundContext,'Page not found','Find Zeusfyi prior-art research services and examples.',`<section class="page-intro"><p class="eyebrow">Page not found</p><h1>Let’s find the right page.</h1><p class="standfirst">Explore our research examples or tell us about your matter.</p><div class="actions"><a class="button" href="/">Return home</a><a class="text-link" href="/contact/">Discuss a matter</a></div></section>`).replace('<meta name="description"','<meta name="robots" content="noindex">\n  <meta name="description"'));
console.log(`Built ${pages.length} pages and a 404 page in patents/.`);
