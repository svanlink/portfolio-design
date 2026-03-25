// ─── Language Toggle System ───
// Redirects between /en and /fr/ page versions for proper SEO
// Falls back to text-swap for same-page language switching
// Persists choice in localStorage across all pages

(function() {
  'use strict';

  const STORAGE_KEY = 'lang';
  const DEFAULT_LANG = 'en';

  // Detect if we're on a /fr/ page
  function isOnFrenchPage() {
    return window.location.pathname.includes('/fr/');
  }

  // Get the equivalent page URL in the other language
  function getAlternateLangUrl(targetLang) {
    var path = window.location.pathname;
    var page = path.split('/').pop() || 'index.html';

    // Ensure page has .html extension
    if (!page.includes('.html') && page !== '') {
      page = page + '.html';
    }
    if (page === '' || page === '/') {
      page = 'index.html';
    }

    if (targetLang === 'fr' && !isOnFrenchPage()) {
      // EN → FR: redirect to /fr/ version
      // Get the base path (everything before the page filename)
      var basePath = path.substring(0, path.lastIndexOf('/') + 1);
      return basePath + 'fr/' + page;
    } else if (targetLang === 'en' && isOnFrenchPage()) {
      // FR → EN: redirect to root version
      // Remove /fr/ from path
      var basePath = path.substring(0, path.indexOf('/fr/') + 1);
      return basePath + page;
    }
    return null; // Same language, no redirect needed
  }

  // Get current language
  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }

  // Apply language to all data-i18n elements (text swap fallback)
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
    // Detect current page language from HTML lang attribute
    var pageLang = document.documentElement.lang || 'en';
    var storedLang = getLang();

    // Wire up ALL lang buttons (nav, glass nav, mobile menu)
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        var newLang = btn.dataset.lang;
        localStorage.setItem(STORAGE_KEY, newLang);

        // Try to redirect to the alternate language page
        var redirectUrl = getAlternateLangUrl(newLang);
        if (redirectUrl) {
          window.location.href = redirectUrl;
          return;
        }

        // Fallback: swap text on the same page
        applyLanguage(newLang);
      });
    });

    // On /fr/ pages, always apply French
    if (isOnFrenchPage()) {
      localStorage.setItem(STORAGE_KEY, 'fr');
      applyLanguage('fr');
    } else if (storedLang !== DEFAULT_LANG) {
      applyLanguage(storedLang);
    } else {
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
