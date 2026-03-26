// ─── Performance & UX Enhancements ───
// Lazy Vimeo loading, Lenis smooth scroll, optimized scroll listeners

(function() {
  'use strict';

  // ═══ VIMEO PLAYER HELPERS ═══

  var HERO_START_TIME = 3;
  var HERO_END_TRIM = 8;

  function createVimeoPlayer(card) {
    var vimeoId = card.dataset.vimeoId;
    var quality = card.dataset.vimeoQuality || '720p';
    if (!vimeoId || card.dataset.vimeoLoaded) return;

    card.dataset.vimeoLoaded = 'true';
    var isHero = card.id === 'vimeo-bg';

    var player = new Vimeo.Player(card, {
      id: parseInt(vimeoId),
      background: true,
      autoplay: true,
      loop: true,
      muted: true,
      quality: quality
    });
    player.ready().then(function() {
      if (isHero) {
        // Hide iframe until seeked to avoid flash of 0:00
        var iframe = card.querySelector('iframe');
        if (iframe) iframe.style.opacity = '0';
        player.setCurrentTime(HERO_START_TIME).then(function() {
          if (iframe) {
            iframe.style.transition = 'opacity 0.8s ease';
            iframe.style.opacity = '1';
          }
        });
        player.getDuration().then(function(duration) {
          var loopEnd = duration - HERO_END_TRIM;
          player.on('timeupdate', function(data) {
            if (data.seconds >= loopEnd) {
              player.setCurrentTime(HERO_START_TIME).catch(function() {});
            }
          });
        });
      } else {
        player.play().catch(function() {});
      }
    });
  }

  // ═══ EAGER HERO VIDEO ═══
  // Load the hero background video immediately (always above the fold)

  function initHeroVideo() {
    // Load hero videos eagerly — homepage (#vimeo-bg) and case studies (#case-hero-video)
    var heroes = document.querySelectorAll('#vimeo-bg, #case-hero-video');
    heroes.forEach(function(hero) {
      if (hero && hero.dataset.vimeoId) {
        createVimeoPlayer(hero);
      }
    });
  }

  // ═══ VIMEO THUMBNAIL POSTERS ═══
  // Show video thumbnails immediately while Vimeo players load

  function initThumbnails() {
    var cards = document.querySelectorAll('.vimeo-card[data-vimeo-id]');
    cards.forEach(function(card) {
      var id = card.dataset.vimeoId;
      if (!id) return;
      // Use vumbnail.com for instant Vimeo thumbnails (no API key needed)
      card.style.backgroundImage = 'url(https://vumbnail.com/' + id + '.jpg)';
    });
  }

  // ═══ EAGER GRID VIDEOS ═══
  // Load all grid card videos immediately after hero for instant playback

  function initGridVideos() {
    var gridCards = document.querySelectorAll('.vimeo-card[data-vimeo-id]:not(#vimeo-bg):not(#case-hero-video)');
    if (!gridCards.length) return;
    // Load all grid videos quickly — loader covers the delay
    gridCards.forEach(function(card, i) {
      setTimeout(function() {
        createVimeoPlayer(card);
      }, 200 + (i * 100));
    });
  }

  // ═══ LAZY VIMEO LOADING (fallback) ═══

  var VIMEO_OBSERVER_MARGIN = '200px';

  function initLazyVimeo() {
    var vimeoCards = document.querySelectorAll('.vimeo-card[data-vimeo-id]:not(#vimeo-bg):not(#case-hero-video):not([data-vimeo-loaded])');
    if (!vimeoCards.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          createVimeoPlayer(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: VIMEO_OBSERVER_MARGIN,
      threshold: 0
    });

    vimeoCards.forEach(function(card) { observer.observe(card); });
  }

  // ═══ LENIS SMOOTH SCROLL ═══
  // Premium cinematic scrolling — replaces native scroll-behavior: smooth

  var lenisInstance = null;

  function initLenis() {
    if (typeof Lenis === 'undefined') return;

    lenisInstance = new Lenis({
      duration: 1.2,
      easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
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
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        var targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
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

  var ticking = false;
  var scrollCallbacks = [];

  function onOptimizedScroll(callback) {
    scrollCallbacks.push(callback);
  }

  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(function() {
        var scrollY = window.scrollY;
        scrollCallbacks.forEach(function(cb) { cb(scrollY); });
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
    initThumbnails(); // Show poster frames immediately
    initLenis();

    // Wait for Vimeo player.js to be available, then initialize videos
    function onVimeoReady() {
      initHeroVideo();
      initGridVideos();
      initLazyVimeo();
    }

    if (typeof Vimeo !== 'undefined') {
      onVimeoReady();
    } else {
      // Poll for Vimeo API — handles defer scripts and cached page loads
      var attempts = 0;
      var check = setInterval(function() {
        attempts++;
        if (typeof Vimeo !== 'undefined') {
          clearInterval(check);
          onVimeoReady();
        } else if (attempts > 50) {
          clearInterval(check);
        }
      }, 100);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
