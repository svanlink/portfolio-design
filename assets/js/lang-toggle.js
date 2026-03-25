// ─── Language Toggle System ───
// Swaps text content between EN (default in HTML) and FR (from translations.js)
// Persists choice in localStorage across all pages

(function() {
  'use strict';

  const STORAGE_KEY = 'lang';
  const DEFAULT_LANG = 'en';

  // Get current language
  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }

  // Apply language to all data-i18n elements
  function applyLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    // Swap text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;

      // Store original English text on first run
      if (!el.dataset.originalText) {
        el.dataset.originalText = el.textContent.trim();
      }

      if (lang === 'fr' && TRANSLATIONS.fr[key]) {
        el.textContent = TRANSLATIONS.fr[key];
      } else if (lang === 'en' && el.dataset.originalText) {
        el.textContent = el.dataset.originalText;
      }
    });

    // Swap placeholders
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.dataset.i18nPh;
      if (!el.dataset.originalPh) {
        el.dataset.originalPh = el.placeholder;
      }
      if (lang === 'fr' && TRANSLATIONS.fr[key]) {
        el.placeholder = TRANSLATIONS.fr[key];
      } else if (lang === 'en' && el.dataset.originalPh) {
        el.placeholder = el.dataset.originalPh;
      }
    });

    // Update button active states across ALL nav instances
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const btnLang = btn.dataset.lang;
      if (btnLang === lang) {
        btn.classList.remove('text-[#EFEFEF]/50');
        btn.classList.add('text-[#F64E29]');
      } else {
        btn.classList.remove('text-[#F64E29]');
        btn.classList.add('text-[#EFEFEF]/50');
      }
    });

    // Update page title
    const titleKey = document.querySelector('title')?.dataset?.i18n;
    if (titleKey && lang === 'fr' && TRANSLATIONS.fr[titleKey]) {
      document.title = TRANSLATIONS.fr[titleKey];
    }
  }

  // Expose a global helper for dynamic text (form messages, etc.)
  window.t = function(key) {
    const lang = getLang();
    if (lang === 'fr' && TRANSLATIONS.fr[key]) {
      return TRANSLATIONS.fr[key];
    }
    return null; // Caller uses default English
  };

  // Initialize on DOM ready
  function init() {
    const lang = getLang();

    // Wire up ALL lang buttons (nav, glass nav, mobile menu)
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const newLang = btn.dataset.lang;
        applyLanguage(newLang);
      });
    });

    // Apply saved language
    if (lang !== DEFAULT_LANG) {
      applyLanguage(lang);
    } else {
      // Still update button states for EN
      applyLanguage('en');
    }
  }

  // Run immediately if DOM is ready, otherwise wait
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
