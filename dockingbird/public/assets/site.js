// Site icons are SVG assets. Do not use emoji or Unicode icon characters.
const mediaRoot = '/assets/media/';
const captureUrl = name => `${mediaRoot}${name.includes('.') ? name : `${name}.webp`}`;
const clips = {
  "hero-coordination": {
    "title": "One project. Five agents.",
    "duration": "24 seconds",
    "speed": "5× time-lapse",
    "caption": "Sample shelf project. Dockingbird 0.15.37 / GUI 0.1.20. Accelerated recording; not a speed benchmark.",
    "transcript": "The coordinator delegates Catalog.titles() to builder-1 and a CLI list command to builder-2. Builder-2 asks for the method’s signature and return value. Builder-1 answers and publishes its commit. Both builders send their commits to the coordinator, which requests review and tests. Its summary reports both commits with no review findings and passing tests. The reviewer and tester are bus agents listed in the sidebar, not terminal panes."
  },
  "agent-handoff": {
    "title": "A direct handoff between builders",
    "duration": "14 seconds",
    "speed": "3.5× time-lapse",
    "caption": "Same sample session as the coordination video. The task explicitly asks the builders to agree on the interface.",
    "transcript": "Builder-2 asks builder-1 for the exact signature and return value of Catalog.titles(). Builder-1 replies: titles(self) returns a list of title and shelf-name pairs, sorted by title and shelf name. It then publishes its commit and sends the SHA. Each builder’s report lists the exchange; the coordinator records the result and requests review and tests. These are the agents’ summaries of their messages."
  },
  "configuration-patterns": {
    "title": "Reusable configuration, in the product",
    "duration": "54 seconds",
    "speed": "Natural speed",
    "caption": "Sample configurations created for the capture, not shipped presets. Dockingbird 0.15.37.",
    "transcript": "The sample repository contains build, review and test configurations. The build config selects Claude Code, model and effort, role instructions, allowed network destinations, an environment variable, and turn and session limits. A Claude Code repository hook runs tests after edits. The config list shows the commands and their scope. Turning repository trust off disables the relevant harness arguments and environment settings; turning trust on restores them. The help screen lists the repository’s commands. This walkthrough shows configuration rather than a running agent; the separate effective-settings still shows a running coordinator."
  },
  "metrics-visibility": {
    "title": "Agent status and session metrics",
    "duration": "50 seconds",
    "speed": "Natural speed",
    "caption": "A short sample session. Costs are Claude Code’s estimates, not billing data. Availability varies by harness.",
    "transcript": "Dockingbird status lists five agents with their models, effort, state and context use. It shows waiting deliveries and one question from test-1 about adding pytest as a development dependency. The questions command lists the choices. Fleet scrape prints session metrics for the Claude Code tester and Codex reviewer. Context tokens, model tokens and compactions are available for both bus agents. Claude Code also reports estimated cost and API retries; Codex does not. Terminal agents expose context but not these model-usage series. Missing series are absent, not zero. The measurement window is the current agent process or thread."
  },
  "fleet-placement": {
    "title": "From a memory hold to running work",
    "duration": "22 seconds",
    "speed": "2.5× time-lapse",
    "caption": "One demo worker host. Placeholder leases run sleep. The capture demonstrates memory admission, not automatic host provisioning.",
    "transcript": "The operator submits a lease requiring 10 GiB of memory, which runs on mac-2. A second lease requires 8 GiB but the host has only 4096 MiB left. The queue keeps it pending, and fleet why reports memory_reserved: has 4096 MiB, needs 8192. The operator cancels the first lease. Once its reservation is released, the scheduler admits the second lease on mac-2. The demo host’s idle-cores threshold was lowered for the capture."
  },
  "fleet-controls": {
    "title": "Drain a host, keep existing work running",
    "duration": "15 seconds",
    "speed": "3× time-lapse",
    "caption": "One demo worker host with placeholder leases. Drain blocks new work across the host’s fleet projects.",
    "transcript": "The operator drains mac-2. Its running lease continues while a new lease waits with a draining hold reason. Fleet why confirms the reason. The operator undrains the host, and the waiting lease is admitted alongside the first. Draining does not stop or move existing work. Priority changes, pause and resume are not shown in this clip."
  }
};

// Each tab selects a real screenshot; hidden captures are loaded on demand.
document.querySelectorAll('[data-gallery]').forEach(gallery => {
  const tabs = [...gallery.querySelectorAll('[role="tab"]')];
  const panel = gallery.querySelector('[role="tabpanel"]');
  function selectTab(selected) {
    tabs.forEach(tab => {
      tab.setAttribute('aria-selected', String(tab === selected));
      tab.tabIndex = tab === selected ? 0 : -1;
    });
    const src = captureUrl(selected.dataset.image);
    const image = panel.querySelector('img');
    image.width = Number(selected.dataset.width);
    image.height = Number(selected.dataset.height);
    image.src = src;
    image.alt = selected.dataset.alt;
    const source = panel.querySelector('source');
    source.width = Number(selected.dataset.mobileWidth);
    source.height = Number(selected.dataset.mobileHeight);
    const mobile = selected.dataset.mobile || selected.dataset.image;
    source.srcset = captureUrl(mobile);
    panel.querySelectorAll('[data-expand]').forEach(link => { link.href = src; });
    panel.querySelector('.capture-image').setAttribute('aria-label', `Expand ${selected.dataset.alt}`);
    panel.setAttribute('aria-labelledby', selected.id);
    gallery.dataset.current = selected.dataset.image;
  }
  tabs.forEach(tab => tab.addEventListener('click', () => selectTab(tab)));
  gallery.querySelector('[role="tablist"]').addEventListener('keydown', event => {
    const current = tabs.indexOf(document.activeElement);
    if (current < 0) return;
    let next;
    if (event.key === 'ArrowRight') next = (current + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    tabs[next].focus();
    selectTab(tabs[next]);
  });
});

const dialog = document.querySelector('#media-dialog');
const mediaContent = document.querySelector('#media-content');
const mediaTitle = document.querySelector('#media-title');
const mediaCaption = document.querySelector('#media-caption');
const transcript = document.querySelector('#media-transcript');
const original = document.querySelector('#media-original');
let mediaTrigger;
function openMedia(trigger, element, title, caption, text = '') {
  mediaTrigger = trigger;
  mediaTitle.textContent = title;
  mediaCaption.textContent = caption;
  transcript.hidden = !text;
  transcript.open = false;
  transcript.querySelector('p').textContent = text;
  original.href = trigger.href;
  mediaContent.replaceChildren(element);
  dialog.showModal();
  document.body.classList.add('media-open');
}
document.querySelectorAll('[data-expand]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    const figure = link.closest('figure');
    const preview = figure.querySelector('img');
    const img = document.createElement('img');
    img.src = link.href;
    img.alt = preview.alt;
    const gallery = link.closest('[data-gallery]');
    const title = gallery ? gallery.querySelector('[aria-selected="true"]').textContent : 'Direct handoff';
    openMedia(link, img, title, preview.alt);
  });
});
document.querySelectorAll('[data-video]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    const id = link.dataset.video;
    const clip = clips[id];
    const video = document.createElement('video');
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.poster = `${mediaRoot}${id}-poster.webp`;
    video.src = link.href;
    video.setAttribute('aria-label', clip.title);
    video.setAttribute('aria-describedby', 'media-caption media-transcript');
    openMedia(link, video, clip.title, `${clip.duration} · ${clip.speed}. ${clip.caption}`, clip.transcript);
    // Playback starts only in response to the visitor's explicit Watch action.
    video.play().catch(() => { /* Native controls remain available. */ });
  });
});
dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => {
  const video = mediaContent.querySelector('video');
  if (video) { video.pause(); video.removeAttribute('src'); video.load(); }
  mediaContent.replaceChildren();
  document.body.classList.remove('media-open');
  mediaTrigger?.focus();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) mediaContent.querySelector('video')?.pause();
});

const form = document.querySelector('#waitlist-form');
const status = document.querySelector('#waitlist-status');
const email = document.querySelector('#waitlist-email');
const submit = form.querySelector('button[type="submit"]');
let token = '';
let widgetId;
let verificationPromise;
let submitting = false;
let subscribed = false;

function showStatus(message, kind = '') {
  status.textContent = message;
  status.className = `form-status ${kind}`;
}

async function loadVerification() {
  const response = await fetch('/api/waitlist/config', { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error('The waitlist is temporarily unavailable. Please try again soon.');
  const configuration = await response.json().catch(() => { throw new Error('The waitlist is temporarily unavailable. Please try again soon.'); });
  if (!configuration.ready || !configuration.siteKey) throw new Error('The waitlist is temporarily unavailable. Please try again soon.');
  if (!window.turnstile) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      const timer = window.setTimeout(() => { script.remove(); reject(new Error('Verification could not load. Please try again.')); }, 12000);
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.onload = () => { window.clearTimeout(timer); resolve(); };
      script.onerror = () => { window.clearTimeout(timer); script.remove(); reject(new Error('Verification could not load. Please try again.')); };
      document.head.append(script);
    });
  }
  widgetId = window.turnstile.render('#turnstile-container', {
    sitekey: configuration.siteKey,
    action: 'waitlist',
    theme: 'light',
    size: 'flexible',
    callback: value => { token = value; showStatus(''); },
    'expired-callback': () => { token = ''; },
    'error-callback': () => { token = ''; showStatus('Verification could not complete. Please try again.', 'error'); },
  });
}

function ensureVerification() {
  if (!verificationPromise) verificationPromise = loadVerification().catch(error => { verificationPromise = undefined; throw error; });
  return verificationPromise;
}

email.addEventListener('focus', () => { ensureVerification().catch(() => {}); });
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (submitting || subscribed || !form.reportValidity()) return;
  submitting = true;
  submit.disabled = true;
  submit.textContent = 'Joining…';
  showStatus('');
  try {
    await ensureVerification();
    if (!token) {
      showStatus('Please complete the quick verification, then join the waitlist.');
      return;
    }
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email: email.value.trim(), website: form.elements.website.value, token, consent: true }),
      signal: AbortSignal.timeout(15000),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.ok !== true) throw new Error(result.error || 'We couldn’t save your email. Please try again.');
    subscribed = true;
    email.disabled = true;
    showStatus('You’re on the list. We’ll be in touch when Dockingbird is ready for you.', 'success');
    window.turnstile.remove(widgetId);
  } catch (error) {
    showStatus(error.name === 'TimeoutError' ? 'The request timed out. Please try again; repeat signups are safe.' : error.message || 'We couldn’t save your email. Please try again.', 'error');
  } finally {
    submitting = false;
    submit.disabled = subscribed;
    submit.textContent = subscribed ? 'You’re on the list' : 'Join the waitlist';
    if (!subscribed && widgetId !== undefined && token) {
      token = '';
      window.turnstile.reset(widgetId);
    }
  }
});
