const MAX_REQUEST_BYTES = 4096;
const MAX_TOKEN_LENGTH = 2048;
const MAX_EMAIL_LENGTH = 254;
const VERIFY_TIMEOUT_MS = 10000;
const CONSENT_VERSION = 'early-access-v1';
const UNAVAILABLE = 'The waitlist is temporarily unavailable. Please try again soon.';
// Hash of the Google tag initialization block shared by the public HTML pages.
const ANALYTICS_SCRIPT_HASH = 'sha256-jYHg7tXSuuVUqjy+JeRT8vyG97+Spkw5IFHdQEBbmrw=';
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': [
    "default-src 'self'",
    `script-src 'self' '${ANALYTICS_SCRIPT_HASH}' https://challenges.cloudflare.com https://www.googletagmanager.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com",
    "connect-src 'self' https://challenges.cloudflare.com https://www.googletagmanager.com https://*.google-analytics.com https://*.google.com",
    "frame-src https://challenges.cloudflare.com https://www.googletagmanager.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join('; '),
};

function json(body, status = 200, extraHeaders = {}) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...extraHeaders } });
}

function configured(env) {
  return Boolean(env.WAITLIST_DB && env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET_KEY);
}

export function normalizeEmail(value) {
  if (typeof value !== 'string') return null;
  const email = value.trim().toLowerCase();
  if (email.length > MAX_EMAIL_LENGTH) return null;
  const parts = email.split('@');
  if (parts.length !== 2 || parts[0].length > 64) return null;
  if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(parts[0])) return null;
  if (parts[0].startsWith('.') || parts[0].endsWith('.') || parts[0].includes('..')) return null;
  const labels = parts[1].split('.');
  if (labels.length < 2 || labels.some(label => !/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label))) return null;
  return email;
}

async function readBody(request) {
  if (!request.body) return null;
  const reader = request.body.getReader();
  let length = 0;
  const chunks = [];
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_REQUEST_BYTES) { await reader.cancel(); return null; }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  try { return JSON.parse(new TextDecoder().decode(bytes)); } catch { return null; }
}

async function signup(request, env, verifyFetch) {
  const url = new URL(request.url);
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405, { Allow: 'POST' });
  if (request.headers.get('Origin') !== url.origin) return json({ error: 'Please submit from the Dockingbird website.' }, 403);
  if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) return json({ error: 'Invalid request format.' }, 415);
  if (!configured(env)) return json({ error: UNAVAILABLE }, 503);
  const body = await readBody(request);
  if (!body || typeof body !== 'object' || Array.isArray(body)) return json({ error: 'Invalid signup. Please try again.' }, 400);
  const email = normalizeEmail(body.email);
  if (!email) return json({ error: 'Please enter a valid email address.' }, 422);
  if (body.consent !== true || typeof body.website !== 'string' || body.website !== '') return json({ error: 'Invalid signup. Please try again.' }, 422);
  if (typeof body.token !== 'string' || !body.token || body.token.length > MAX_TOKEN_LENGTH) return json({ error: 'Please complete the verification.' }, 422);
  let verification;
  try {
    const result = await verifyFetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: body.token, remoteip: request.headers.get('CF-Connecting-IP') || undefined }),
      signal: AbortSignal.timeout(VERIFY_TIMEOUT_MS),
    });
    if (!result.ok) return json({ error: 'Verification is unavailable. Please try again.' }, 503);
    verification = await result.json();
  } catch { return json({ error: 'Verification is unavailable. Please try again.' }, 503); }
  if (!verification || verification.success !== true || verification.hostname !== url.hostname || verification.action !== 'waitlist') return json({ error: 'Verification expired or failed. Please try again.' }, 403);
  try {
    const result = await env.WAITLIST_DB.prepare('INSERT INTO waitlist (email, created_at, consent_version, source) VALUES (?, ?, ?, ?) ON CONFLICT(email) DO NOTHING')
      .bind(email, new Date().toISOString(), CONSENT_VERSION, 'dockingbird-product-page').run();
    if (result.success !== true) return json({ error: 'We couldn’t save your email. Please try again.' }, 503);
  } catch { return json({ error: 'We couldn’t save your email. Please try again.' }, 503); }
  return json({ ok: true });
}

export async function handleRequest(request, env, verifyFetch = fetch) {
  const url = new URL(request.url);
  let response;
  if (url.pathname === '/api/waitlist/config') {
    if (request.method !== 'GET') response = json({ error: 'Method not allowed.' }, 405, { Allow: 'GET' });
    else response = json({ ready: configured(env), siteKey: configured(env) ? env.TURNSTILE_SITE_KEY : null });
  } else if (url.pathname === '/api/waitlist') {
    response = await signup(request, env, verifyFetch);
  } else if (url.pathname.startsWith('/api/')) {
    response = json({ error: 'Not found.' }, 404);
  } else {
    response = await env.ASSETS.fetch(request);
  }
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) headers.set(key, value);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

export default { fetch: (request, env) => handleRequest(request, env) };
