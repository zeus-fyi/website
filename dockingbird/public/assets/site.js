const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const detail = document.querySelector('#agent-detail');
const detailTag = document.querySelector('#agent-tag');
const agents = {
  coordinator: ['Coordinator', 'splits the work, routes questions, and keeps the team moving.', 'TEAM CONTEXT'],
  api: ['API builder', 'works in a private clone, claiming the paths it needs before submitting changes.', 'ISOLATED WORKSPACE'],
  interface: ['Interface builder', 'uses the shared API contract to build in parallel with the backend agent.', 'DIRECT HANDOFFS'],
  review: ['Review & test agents', 'inspect the implementation and send findings back to the coordinator.', 'INDEPENDENT CHECKS'],
};
let walkthrough;
let walkthroughStep = 0;
const playButton = document.querySelector('#play-demo');
const stage = document.querySelector('.product-stage');

function selectAgent(name) {
  const [title, description, tag] = agents[name];
  const strong = document.createElement('strong');
  strong.textContent = title;
  detail.replaceChildren(strong, document.createTextNode(` ${description}`));
  detailTag.textContent = tag;
  document.querySelectorAll('[data-agent]').forEach(button => {
    const selected = button.dataset.agent === name;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

function stopWalkthrough() {
  window.clearInterval(walkthrough);
  walkthrough = undefined;
  stage.classList.remove('is-playing');
  playButton.setAttribute('aria-pressed', 'false');
  playButton.textContent = '▷ Play walkthrough';
}

function activateTab(button, group) {
  group.querySelectorAll('[role="tab"]').forEach(tab => {
    const selected = button === tab;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(tab.getAttribute('aria-controls'));
    if (group.classList.contains('demo-tabs')) panel.hidden = !selected;
  });
}

document.querySelectorAll('[role="tablist"]').forEach(group => {
  group.addEventListener('keydown', event => {
    const tabs = [...group.querySelectorAll('[role="tab"]')];
    const current = tabs.indexOf(document.activeElement);
    if (current < 0) return;
    const vertical = group.getAttribute('aria-orientation') === 'vertical';
    const forward = vertical ? 'ArrowDown' : 'ArrowRight';
    const backward = vertical ? 'ArrowUp' : 'ArrowLeft';
    let index;
    if (event.key === forward) index = (current + 1) % tabs.length;
    if (event.key === backward) index = (current - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') index = 0;
    if (event.key === 'End') index = tabs.length - 1;
    if (index === undefined) return;
    event.preventDefault();
    tabs[index].focus();
    tabs[index].click();
  });
});

document.querySelectorAll('.demo-tabs [role="tab"]').forEach(button => {
  button.addEventListener('click', () => {
    stopWalkthrough();
    activateTab(button, button.parentElement);
  });
});
document.querySelectorAll('[data-agent]').forEach(button => {
  button.addEventListener('click', () => {
    stopWalkthrough();
    selectAgent(button.dataset.agent);
  });
});
playButton.addEventListener('click', () => {
  if (walkthrough) return stopWalkthrough();
  activateTab(document.querySelector('#swarm-tab'), document.querySelector('.demo-tabs'));
  const names = Object.keys(agents);
  walkthroughStep = 0;
  selectAgent(names[walkthroughStep]);
  stage.classList.add('is-playing');
  playButton.setAttribute('aria-pressed', 'true');
  playButton.textContent = 'Ⅱ Pause walkthrough';
  walkthrough = window.setInterval(() => {
    walkthroughStep += 1;
    if (walkthroughStep >= names.length) return stopWalkthrough();
    selectAgent(names[walkthroughStep]);
  }, 3000);
});
document.addEventListener('visibilitychange', () => { if (document.hidden) stopWalkthrough(); });
reduceMotion.addEventListener('change', () => { if (reduceMotion.matches) stopWalkthrough(); });
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) stopWalkthrough();
  }).observe(stage);
}

const patterns = {
  feature: {
    file: 'builder.toml',
    lines: ['# A specialist in your feature swarm', 'harness = "claude"', 'workspace = "repo"', 'mode = "bus"', 'tools = "full"', 'instructions = "prompts/builder.md"', 'repo_settings = true', '', '[env]', 'APP_ENV = "development"'],
    description: 'Pair builders with separate review and test agents. Each receives its role instructions and project context.',
  },
  review: {
    file: 'reviewer.toml',
    lines: ['# A focused second perspective', 'harness = "codex"', 'workspace = "repo"', 'mode = "bus"', 'tools = "bus"', 'instructions = "prompts/reviewer.md"', 'repo_settings = true', '', 'harness_args = [', '  "-c", "model_reasoning_effort=high"', ']'],
    description: 'Use a dedicated review prompt and higher reasoning effort. Report findings through the bus without granting publication tools.',
  },
  research: {
    file: 'researcher.toml',
    lines: ['# Explore and return the evidence', 'harness = "claude"', 'workspace = "scratch"', 'mode = "bus"', 'tools = "bus"', 'instructions = "prompts/researcher.md"', 'skill = "skills/investigate.md"', '', 'harness_args = ["--effort", "high"]'],
    description: 'Give an investigator a scratch workspace, a repeatable research skill, and clear reporting instructions. No repository is required.',
  },
};

function highlightLine(line) {
  const fragment = document.createDocumentFragment();
  if (line.startsWith('#')) {
    const comment = document.createElement('span');
    comment.className = 'code-comment';
    comment.textContent = line;
    fragment.append(comment);
    return fragment;
  }
  const pieces = line.split('"');
  pieces.forEach((piece, i) => {
    const span = document.createElement('span');
    span.className = i % 2 ? 'code-string' : 'code-key';
    span.textContent = i % 2 ? `"${piece}"` : piece;
    fragment.append(span);
  });
  return fragment;
}
document.querySelectorAll('[data-pattern]').forEach(button => {
  button.addEventListener('click', () => {
    activateTab(button, button.parentElement);
    const pattern = patterns[button.dataset.pattern];
    document.querySelector('#pattern-filename').textContent = pattern.file;
    document.querySelector('#pattern-explanation').textContent = pattern.description;
    document.querySelector('#pattern-panel').setAttribute('aria-labelledby', button.id);
    const code = document.querySelector('#pattern-code');
    code.replaceChildren();
    pattern.lines.forEach((line, index) => {
      if (index) code.append(document.createTextNode('\n'));
      code.append(highlightLine(line));
    });
  });
});

document.querySelector('#queue-demo').addEventListener('click', event => {
  const button = event.currentTarget;
  const expanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!expanded));
  document.querySelector('#queue-explanation').hidden = expanded;
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
    submit.textContent = subscribed ? 'You’re on the list ✓' : 'Join the waitlist ↗';
    if (!subscribed && widgetId !== undefined && token) {
      token = '';
      window.turnstile.reset(widgetId);
    }
  }
});
