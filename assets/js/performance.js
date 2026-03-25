// ─── Performance & UX Enhancements ───
// Lazy Vimeo loading, Lenis smooth scroll, optimized scroll listeners

(function() {
  'use strict';

  // ═══ LAZY VIMEO LOADING ═══
  // Only load Vimeo players when they scroll into view
  // Saves ~2MB per video on initial page load

  const VIMEO_OBSERVER_MARGIN = '200px'; // Start loading 200px before visible

  function initLazyVimeo() {
    const vimeoCards = document.querySelectorAll('.vimeo-card[data-vimeo-id]');
    if (!vimeoCards.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const vimeoId = card.dataset.vimeoId;
          const quality = card.dataset.vimeoQuality || '720p';

          if (vimeoId && !card.dataset.vimeoLoaded) {
            card.dataset.vimeoLoaded = 'true';
            new Vimeo.Player(card, {
              id: parseInt(vimeoId),
              background: true,
              loop: true,
              muted: true,
              quality: quality
            });
          }
          observer.unobserve(card);
        }
      });
    }, {
      rootMargin: VIMEO_OBSERVER_MARGIN,
      threshold: 0
    });

    vimeoCards.forEach(card => observer.observe(card));
  }

  // ═══ LENIS SMOOTH SCROLL ═══
  // Premium cinematic scrolling — replaces native scroll-behavior: smooth

  let lenisInstance = null;

  function initLenis() {
    if (typeof Lenis === 'undefined') return;

    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Animation loop
    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Handle anchor links — smooth scroll to target
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          lenisInstance.scrollTo(target, { offset: 0, duration: 1.5 });
        }
      });
    });

    // Expose for external use (e.g., mobile menu needs to stop/start)
    window.lenis = lenisInstance;
  }

  // ═══ SCROLL LISTENER OPTIMIZATION ═══
  // Debounced passive scroll for nav/parallax — prevents jank

  let ticking = false;
  const scrollCallbacks = [];

  function onOptimizedScroll(callback) {
    scrollCallbacks.push(callback);
  }

  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        scrollCallbacks.forEach(cb => cb(scrollY));
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Expose for page-specific scripts
  window.onOptimizedScroll = onOptimizedScroll;

  // ═══ INIT ═══
  function init() {
    initLenis();

    // Wait for Vimeo player.js to load, then init lazy loading
    if (typeof Vimeo !== 'undefined') {
      initLazyVimeo();
    } else {
      // Vimeo script loads with defer — wait for it
      window.addEventListener('load', initLazyVimeo);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
