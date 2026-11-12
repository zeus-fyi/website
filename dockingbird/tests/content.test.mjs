import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';
import { handleRequest } from '../worker.mjs';
const publicRoot = fileURLToPath(new URL('../public/', import.meta.url));
function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  });
}

test('website text and styles never use emoji or Unicode pictographs as icons', () => {
  const emoji = /[\p{Emoji_Presentation}\p{Extended_Pictographic}\uFE0F\uFE0E\u200D]/u;
  for (const path of files(publicRoot).filter(path => /\.(html|js|css|svg)$/.test(path))) {
    const text = readFileSync(path, 'utf8');
    assert.equal(emoji.test(text), false, `Use an SVG icon instead of a pictograph in ${path}`);
  }
});

test('every local HTML asset, capture and video link resolves to a real file', () => {
  for (const path of files(publicRoot).filter(path => path.endsWith('.html'))) {
    const html = readFileSync(path, 'utf8');
    for (const match of html.matchAll(/(?:src|href|srcset)="(\/assets\/[^"\s]+)"/g)) {
      assert.ok(existsSync(resolve(publicRoot, `.${match[1]}`)), `${match[1]} referenced by ${path}`);
    }
    for (const match of html.matchAll(/data-(?:image|mobile)="([^"]+)"/g)) {
      assert.ok(existsSync(join(publicRoot, 'assets/media', match[1].includes('.') ? match[1] : `${match[1]}.webp`)), `Missing gallery capture ${match[1]}`);
    }
    for (const match of html.matchAll(/data-video="([^"]+)"/g)) {
      assert.ok(existsSync(join(publicRoot, 'assets/media', `${match[1]}-poster.webp`)), `Missing video poster ${match[1]}`);
    }
  }
});

test('analytics initializes once on each page and its exact inline code is allowed by CSP', async () => {
  for (const path of files(publicRoot).filter(path => path.endsWith('.html'))) {
    const html = readFileSync(path, 'utf8');
    assert.equal((html.match(/<script async src="https:\/\/www\.googletagmanager\.com\/gtm\.js\?id=GTM-TPWT4KTW"><\/script>/g) || []).length, 1);
    const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1]);
    assert.equal(scripts.length, 1);
    const context = {};
    context.window = context;
    runInNewContext(scripts[0], context);
    assert.equal(context.dataLayer.length, 1);
    assert.equal(context.dataLayer[0][0], 'js');
    assert.ok(Number.isFinite(context.dataLayer[0][1].getTime()));

    const response = await handleRequest(new Request('https://dockingbird.zeus.fyi/'), {
      ASSETS: { fetch: async () => new Response(html, { headers: { 'Content-Type': 'text/html' } }) },
    });
    const policy = Object.fromEntries(response.headers.get('Content-Security-Policy').split('; ').map(directive => {
      const [name, ...sources] = directive.split(' ');
      return [name, sources];
    }));
    const hash = `'sha256-${createHash('sha256').update(scripts[0]).digest('base64')}'`;
    assert.ok(policy['script-src'].includes(hash), `Inline analytics blocked on ${path}`);
    assert.ok(policy['script-src'].includes('https://www.googletagmanager.com'));
    assert.ok(policy['connect-src'].includes('https://*.google-analytics.com'));
    assert.ok(policy['connect-src'].includes('https://*.google.com'));
    assert.ok(policy['connect-src'].includes('https://challenges.cloudflare.com'));
    assert.ok(!policy['script-src'].includes("'unsafe-inline'"));
    assert.ok(!policy['script-src'].includes("'unsafe-eval'"));
    assert.deepEqual(policy['frame-ancestors'], ["'none'"]);
  }
});
