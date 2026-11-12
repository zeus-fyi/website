import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
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
