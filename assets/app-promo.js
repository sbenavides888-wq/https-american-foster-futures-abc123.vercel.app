/**
 * AFF Action app download / register promo modal (iOS only for now)
 * Include on public pages: <script src="assets/app-promo.js" defer></script>
 *
 * Set iosUrl when the App Store listing goes live.
 */
(function () {
  'use strict';

  var CONFIG = {
    appName: 'AFF Action',
    // Set when App Store listing is live (leave empty to show “notify me” email)
    iosUrl: '',
    notifyEmail: 'info@americanfosterfutures.org',
    delayMs: 2500,
    dismissDays: 14,
    storageKey: 'aff_app_promo_dismissed_v1',
    // Pages where the promo should not appear (substring match on pathname)
    skipPaths: ['app-product-brief', 'privacy-policy'],
  };

  function shouldSkip() {
    var path = (window.location.pathname || '').toLowerCase();
    return CONFIG.skipPaths.some(function (s) {
      return path.indexOf(s) !== -1;
    });
  }

  function isDismissed() {
    try {
      var raw = localStorage.getItem(CONFIG.storageKey);
      if (!raw) return false;
      var until = parseInt(raw, 10);
      if (isNaN(until)) return false;
      if (Date.now() > until) {
        localStorage.removeItem(CONFIG.storageKey);
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  function dismiss(days) {
    try {
      var ms = (days || CONFIG.dismissDays) * 24 * 60 * 60 * 1000;
      localStorage.setItem(CONFIG.storageKey, String(Date.now() + ms));
    } catch (e) { /* private mode */ }
  }

  function storeButton(label, url, iconClass) {
    if (url) {
      return (
        '<a href="' + url + '" target="_blank" rel="noopener noreferrer" ' +
        'class="aff-promo-btn aff-promo-btn-primary">' +
        '<i class="' + iconClass + '" aria-hidden="true"></i> ' + label +
        '</a>'
      );
    }
    var subject = encodeURIComponent(CONFIG.appName + ' (iOS) — notify me when available');
    var body = encodeURIComponent(
      'Please email me when ' + CONFIG.appName + ' is available on the App Store for iPhone.\n\nThanks!'
    );
    return (
      '<a href="mailto:' + CONFIG.notifyEmail + '?subject=' + subject + '&body=' + body + '" ' +
      'class="aff-promo-btn aff-promo-btn-primary">' +
      '<i class="' + iconClass + '" aria-hidden="true"></i> ' + label + ' — notify me' +
      '</a>'
    );
  }

  function injectStyles() {
    if (document.getElementById('aff-app-promo-styles')) return;
    var style = document.createElement('style');
    style.id = 'aff-app-promo-styles';
    style.textContent = [
      '#aff-app-promo-root { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem; }',
      '#aff-app-promo-root[hidden] { display: none !important; }',
      '#aff-app-promo-backdrop { position: absolute; inset: 0; background: rgba(15, 44, 89, 0.55); backdrop-filter: blur(4px); }',
      '#aff-app-promo-dialog { position: relative; width: 100%; max-width: 26rem; background: #fff; border-radius: 1.25rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,.35); overflow: hidden; font-family: Inter, system-ui, sans-serif; animation: affPromoIn .28s ease-out; }',
      '@keyframes affPromoIn { from { opacity: 0; transform: translateY(12px) scale(.97); } to { opacity: 1; transform: none; } }',
      '#aff-app-promo-dialog .aff-promo-header { background: linear-gradient(135deg, #0F2C59 0%, #1a3a6e 100%); color: #fff; padding: 1.25rem 1.25rem 1.1rem; }',
      '#aff-app-promo-dialog .aff-promo-kicker { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #7dd3fc; }',
      '#aff-app-promo-dialog .aff-promo-title { font-size: 1.35rem; font-weight: 700; margin: 0.35rem 0 0; line-height: 1.25; }',
      '#aff-app-promo-dialog .aff-promo-sub { margin: 0.4rem 0 0; font-size: 0.875rem; color: #bae6fd; line-height: 1.45; }',
      '#aff-app-promo-dialog .aff-promo-body { padding: 1.15rem 1.25rem 1.25rem; }',
      '#aff-app-promo-dialog .aff-promo-body p { margin: 0; font-size: 0.9rem; color: #475569; line-height: 1.55; }',
      '#aff-app-promo-dialog .aff-promo-list { margin: 0.85rem 0 0; padding: 0; list-style: none; font-size: 0.8rem; color: #334155; }',
      '#aff-app-promo-dialog .aff-promo-list li { display: flex; gap: 0.5rem; align-items: flex-start; margin-top: 0.4rem; }',
      '#aff-app-promo-dialog .aff-promo-list i { color: #1E88E5; margin-top: 0.15rem; flex-shrink: 0; }',
      '#aff-app-promo-dialog .aff-promo-actions { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1.1rem; }',
      '.aff-promo-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; padding: 0.7rem 1rem; border-radius: 0.75rem; font-size: 0.875rem; font-weight: 600; text-decoration: none; border: none; cursor: pointer; transition: background .15s, transform .15s; }',
      '.aff-promo-btn:hover { transform: translateY(-1px); }',
      '.aff-promo-btn-primary { background: #0F2C59; color: #fff; }',
      '.aff-promo-btn-primary:hover { background: #1a3a6e; }',
      '.aff-promo-btn-secondary { background: #e0f2fe; color: #0F2C59; }',
      '.aff-promo-btn-secondary:hover { background: #bae6fd; }',
      '.aff-promo-footer { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem 1.25rem; margin-top: 0.9rem; font-size: 0.75rem; }',
      '.aff-promo-footer button { background: none; border: none; color: #64748b; cursor: pointer; text-decoration: underline; padding: 0; font-size: inherit; font-family: inherit; }',
      '.aff-promo-footer button:hover { color: #0F2C59; }',
      '#aff-app-promo-close { position: absolute; top: 0.65rem; right: 0.65rem; width: 2rem; height: 2rem; border: none; border-radius: 9999px; background: rgba(255,255,255,.15); color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; }',
      '#aff-app-promo-close:hover { background: rgba(255,255,255,.28); }',
      'body.aff-promo-open { overflow: hidden; }',
      '@media (prefers-reduced-motion: reduce) { #aff-app-promo-dialog { animation: none; } }',
    ].join('\n');
    document.head.appendChild(style);
  }

  function buildModal() {
    var root = document.createElement('div');
    root.id = 'aff-app-promo-root';
    root.setAttribute('hidden', '');
    root.setAttribute('role', 'presentation');

    root.innerHTML =
      '<div id="aff-app-promo-backdrop" data-aff-close="soft"></div>' +
      '<div id="aff-app-promo-dialog" role="dialog" aria-modal="true" aria-labelledby="aff-app-promo-title" tabindex="-1">' +
      '  <button type="button" id="aff-app-promo-close" aria-label="Close" data-aff-close="soft">' +
      '    <i class="fa-solid fa-xmark" aria-hidden="true"></i>' +
      '  </button>' +
      '  <div class="aff-promo-header">' +
      '    <div class="aff-promo-kicker">Free iPhone app</div>' +
      '    <h2 class="aff-promo-title" id="aff-app-promo-title">Get ' + CONFIG.appName + '</h2>' +
      '    <p class="aff-promo-sub">College path tools, aging-out checklists, and the national tuition-waiver campaign — on iOS.</p>' +
      '  </div>' +
      '  <div class="aff-promo-body">' +
      '    <p>Download free on the App Store for iPhone, then create a free account to save your state, track next steps, and join campaign actions.</p>' +
      '    <ul class="aff-promo-list">' +
      '      <li><i class="fa-solid fa-graduation-cap"></i><span>How to pay for college &amp; tuition waiver info by state</span></li>' +
      '      <li><i class="fa-solid fa-map"></i><span>National campaign map and your state’s bill status</span></li>' +
      '      <li><i class="fa-solid fa-user-plus"></i><span>Optional free account — explore first if you prefer</span></li>' +
      '    </ul>' +
      '    <div class="aff-promo-actions">' +
      storeButton('Download on the App Store', CONFIG.iosUrl, 'fa-brands fa-apple') +
      '      <a href="privacy-policy.html" class="aff-promo-btn aff-promo-btn-secondary">' +
      '        <i class="fa-solid fa-shield-halved" aria-hidden="true"></i> Privacy &amp; free account info' +
      '      </a>' +
      '    </div>' +
      '    <div class="aff-promo-footer">' +
      '      <button type="button" data-aff-close="soft">Not now</button>' +
      '      <button type="button" data-aff-close="hard">Don’t show again</button>' +
      '    </div>' +
      '  </div>' +
      '</div>';

    document.body.appendChild(root);
    return root;
  }

  var lastFocus = null;

  function openModal(root) {
    lastFocus = document.activeElement;
    root.removeAttribute('hidden');
    document.body.classList.add('aff-promo-open');
    var dialog = document.getElementById('aff-app-promo-dialog');
    if (dialog) dialog.focus();
  }

  function closeModal(root, hard) {
    root.setAttribute('hidden', '');
    document.body.classList.remove('aff-promo-open');
    dismiss(hard ? 365 : CONFIG.dismissDays);
    if (lastFocus && typeof lastFocus.focus === 'function') {
      try { lastFocus.focus(); } catch (e) { /* ignore */ }
    }
  }

  function wire(root) {
    root.addEventListener('click', function (e) {
      var t = e.target.closest('[data-aff-close]');
      if (!t) return;
      var mode = t.getAttribute('data-aff-close');
      closeModal(root, mode === 'hard');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !root.hasAttribute('hidden')) {
        closeModal(root, false);
      }
    });
  }

  function init() {
    if (shouldSkip() || isDismissed()) return;
    injectStyles();
    var root = buildModal();
    wire(root);
    window.setTimeout(function () {
      if (isDismissed()) return;
      openModal(root);
    }, CONFIG.delayMs);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
