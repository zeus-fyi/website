import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { handleRequest, normalizeEmail } from '../worker.mjs';

const ORIGIN = 'https://dockingbird.zeus.fyi';
const validBody = { email: 'Developer@Example.com', website: '', token: 'test-verification-token', consent: true };
const acceptedVerification = { success: true, hostname: 'dockingbird.zeus.fyi', action: 'waitlist' };

function request(body = validBody, options = {}) {
  return new Request(`${ORIGIN}/api/waitlist`, {
    method: 'POST',
    headers: { Origin: ORIGIN, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    ...options,
  });
}

function environment(t) {
  const db = new DatabaseSync(':memory:');
  db.exec(readFileSync(new URL('../schema.sql', import.meta.url), 'utf8'));
  t.after(() => db.close());
  const env = {
    WAITLIST_DB: {
      prepare(sql) {
        return { bind(...values) { return { async run() { const result = db.prepare(sql).run(...values); return { success: true, meta: result }; } }; } };
      },
    },
    TURNSTILE_SITE_KEY: 'test-public-site-key',
    TURNSTILE_SECRET_KEY: 'test-server-only-secret',
    ASSETS: { fetch: async () => new Response('<h1>Dockingbird</h1>', { headers: { 'Content-Type': 'text/html' } }) },
  };
  return { db, env };
}

const verify = async () => Response.json(acceptedVerification);

test('confirmed signup persists once with consent, without a token or IP', async t => {
  const { env, db } = environment(t);
  for (const email of ['Developer@Example.com', ' developer@example.com ']) {
    const response = await handleRequest(request({ ...validBody, email }), env, verify);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
  }
  const rows = db.prepare('SELECT * FROM waitlist').all();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].email, 'developer@example.com');
  assert.equal(rows[0].consent_version, 'early-access-v1');
  assert.equal(rows[0].source, 'dockingbird-product-page');
  assert.ok(!Number.isNaN(Date.parse(rows[0].created_at)));
  assert.deepEqual(Object.keys(rows[0]), ['email', 'created_at', 'consent_version', 'source']);
});

test('missing storage or verification configuration fails without claiming success', async t => {
  for (const key of ['WAITLIST_DB', 'TURNSTILE_SITE_KEY', 'TURNSTILE_SECRET_KEY']) {
    const { env } = environment(t);
    delete env[key];
    const response = await handleRequest(request(), env, verify);
    assert.equal(response.status, 503);
    assert.equal((await response.json()).ok, undefined);
    const config = await handleRequest(new Request(`${ORIGIN}/api/waitlist/config`), env, verify);
    assert.deepEqual(await config.json(), { ready: false, siteKey: null });
  }
});

test('configuration endpoint exposes only the public key and readiness', async t => {
  const { env } = environment(t);
  const response = await handleRequest(new Request(`${ORIGIN}/api/waitlist/config`), env, verify);
  assert.deepEqual(await response.json(), { ready: true, siteKey: 'test-public-site-key' });
});

test('invalid addresses, missing consent, honeypot, and malformed tokens never reach storage', async t => {
  const { env, db } = environment(t);
  const invalidBodies = [
    { ...validBody, email: 'not-an-email' },
    { ...validBody, email: 'a@localhost' },
    { ...validBody, email: 'a..b@example.com' },
    { ...validBody, email: 'a@-example.com' },
    { ...validBody, email: 'a'.repeat(65) + '@example.com' },
    { ...validBody, email: '<script>@example.com' },
    { ...validBody, consent: false },
    { ...validBody, consent: 'true' },
    { ...validBody, website: 'https://bot.example' },
    { ...validBody, token: '' },
    { ...validBody, token: 'x'.repeat(2049) },
    { ...validBody, token: {} },
  ];
  for (const body of invalidBodies) {
    const response = await handleRequest(request(body), env, async () => assert.fail('Invalid request reached verification'));
    assert.equal(response.status, 422);
  }
  assert.equal(db.prepare('SELECT count(*) AS count FROM waitlist').get().count, 0);
});

test('email normalization permits legitimate plus addressing and apostrophes', () => {
  assert.equal(normalizeEmail(' Builder+Trial@Example.COM '), 'builder+trial@example.com');
  assert.equal(normalizeEmail("o'connor@example.com"), "o'connor@example.com");
  assert.equal(normalizeEmail(null), null);
});

test('malformed, oversized, and non-object bodies are rejected', async t => {
  const { env } = environment(t);
  for (const body of ['{', 'null', '[]', '"string"', JSON.stringify({ padding: 'x'.repeat(5000) })]) {
    const response = await handleRequest(request({}, { body }), env, verify);
    assert.equal(response.status, 400);
  }
});

test('cross-origin, wrong method, and wrong content type requests are rejected', async t => {
  const { env } = environment(t);
  const crossOrigin = await handleRequest(request(validBody, { headers: { Origin: 'https://other.example', 'Content-Type': 'application/json' } }), env, verify);
  assert.equal(crossOrigin.status, 403);
  const get = await handleRequest(new Request(`${ORIGIN}/api/waitlist`), env, verify);
  assert.equal(get.status, 405);
  assert.equal(get.headers.get('Allow'), 'POST');
  const plain = await handleRequest(request(validBody, { headers: { Origin: ORIGIN, 'Content-Type': 'text/plain' } }), env, verify);
  assert.equal(plain.status, 415);
  const missingOrigin = await handleRequest(request(validBody, { headers: { 'Content-Type': 'application/json' } }), env, verify);
  assert.equal(missingOrigin.status, 403);
});

test('verification must match success, hostname, and action', async t => {
  const { env, db } = environment(t);
  for (const verification of [
    { ...acceptedVerification, success: false },
    { ...acceptedVerification, hostname: 'attacker.example' },
    { ...acceptedVerification, action: 'login' },
    {},
    null,
  ]) {
    const response = await handleRequest(request(), env, async () => Response.json(verification));
    assert.equal(response.status, 403);
  }
  assert.equal(db.prepare('SELECT count(*) AS count FROM waitlist').get().count, 0);
});

test('verification receives the secret server-side and never returns it to the client', async t => {
  const { env } = environment(t);
  const response = await handleRequest(request(), env, async (url, options) => {
    assert.equal(url, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
    assert.equal(options.method, 'POST');
    const body = JSON.parse(options.body);
    assert.equal(body.secret, env.TURNSTILE_SECRET_KEY);
    assert.equal(body.response, validBody.token);
    return Response.json(acceptedVerification);
  });
  assert.equal(response.status, 200);
  assert.ok(!(await response.text()).includes(env.TURNSTILE_SECRET_KEY));
});

test('verification outages fail closed', async t => {
  const { env, db } = environment(t);
  for (const failedFetch of [
    async () => { throw new Error('offline'); },
    async () => new Response('unavailable', { status: 503 }),
    async () => new Response('invalid-json'),
  ]) {
    const response = await handleRequest(request(), env, failedFetch);
    assert.equal(response.status, 503);
  }
  assert.equal(db.prepare('SELECT count(*) AS count FROM waitlist').get().count, 0);
});

test('database errors do not return success', async t => {
  const { env } = environment(t);
  for (const run of [async () => { throw new Error('database unavailable'); }, async () => ({ success: false })]) {
    env.WAITLIST_DB = { prepare: () => ({ bind: () => ({ run }) }) };
    const response = await handleRequest(request(), env, verify);
    assert.equal(response.status, 503);
    assert.equal((await response.json()).ok, undefined);
  }
});

test('assets are delegated with security headers, unknown API routes are not assets', async t => {
  const { env } = environment(t);
  const response = await handleRequest(new Request(`${ORIGIN}/privacy/`), env, verify);
  assert.equal(await response.text(), '<h1>Dockingbird</h1>');
  assert.ok(response.headers.get('Content-Security-Policy').includes("frame-ancestors 'none'"));
  assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
  const missing = await handleRequest(new Request(`${ORIGIN}/api/missing`), env, verify);
  assert.equal(missing.status, 404);
});
