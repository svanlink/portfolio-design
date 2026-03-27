// ─── Shared Site Logic ───
// Mobile menu, glass nav, scroll reveal, page transitions
// Used across all pages (index, case studies, blog)

(function() {
  'use strict';

  // ═══ MOBILE MENU ═══

  var mobileMenu = document.getElementById('mobile-menu');
  if (!mobileMenu) return;

  var previouslyFocusedElement = null;
  var trapFocusHandler = null;

  function openMenu() {
    previouslyFocusedElement = document.activeElement;
    mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
    mobileMenu.classList.add('opacity-100');
    document.body.style.overflow = 'hidden';
    if (window.lenis) window.lenis.stop();

    // Set dialog attributes
    mobileMenu.setAttribute('role', 'dialog');
    mobileMenu.setAttribute('aria-modal', 'true');
    mobileMenu.setAttribute('aria-label', 'Mobile navigation menu');

    // Focus the close button after a short delay
    var closeBtn = document.getElementById('mobile-menu-close');
    if (closeBtn) setTimeout(function() { closeBtn.focus(); }, 50);

    // Trap focus within the mobile menu
    trapFocusHandler = function(e) {
      if (e.key === 'Escape') {
        closeMenu();
        return;
      }
      if (e.key !== 'Tab') return;
      var focusable = mobileMenu.querySelectorAll('a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', trapFocusHandler);
  }

  function closeMenu() {
    mobileMenu.classList.add('opacity-0', 'pointer-events-none');
    mobileMenu.classList.remove('opacity-100');
    document.body.style.overflow = '';
    if (window.lenis) window.lenis.start();

    // Remove dialog attributes
    mobileMenu.removeAttribute('role');
    mobileMenu.removeAttribute('aria-modal');
    mobileMenu.removeAttribute('aria-label');

    // Remove focus trap listener
    if (trapFocusHandler) {
      document.removeEventListener('keydown', trapFocusHandler);
      trapFocusHandler = null;
    }

    // Restore focus
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
      previouslyFocusedElement = null;
    }
  }

  // Support both id="mobile-menu-btn" (index) and class="mobile-menu-btn" (case studies)
  var menuBtnById = document.getElementById('mobile-menu-btn');
  if (menuBtnById) menuBtnById.addEventListener('click', openMenu);
  document.querySelectorAll('.mobile-menu-btn, .glass-mobile-menu-btn').forEach(function(btn) {
    btn.addEventListener('click', openMenu);
  });

  var closeBtn = document.getElementById('mobile-menu-close');
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  document.querySelectorAll('.mobile-menu-link').forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  // ═══ GLASS NAV ═══

  var glassNav = document.getElementById('glass-nav');
  var staticNav = document.getElementById('static-nav');

  if (glassNav && !glassNav.classList.contains('visible')) {
    // Index page: crossfade between static and glass nav
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        glassNav.classList.add('visible');
        if (staticNav) staticNav.classList.add('nav-hidden');
      } else {
        glassNav.classList.remove('visible');
        if (staticNav) staticNav.classList.remove('nav-hidden');
      }
    }, { passive: true });
  }

  // ═══ SCROLL REVEAL ═══

  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    var revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.querySelectorAll('.heading-reveal').forEach(function(h) {
            setTimeout(function() { h.classList.add('visible'); }, 150);
          });
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el) { revealObserver.observe(el); });

    // Safety net
    setTimeout(function() {
      document.querySelectorAll('.reveal:not(.visible)').forEach(function(el) {
        el.classList.add('visible');
        el.querySelectorAll('.heading-reveal').forEach(function(h) { h.classList.add('visible'); });
      });
      document.querySelectorAll('.heading-reveal:not(.visible)').forEach(function(h) { h.classList.add('visible'); });
    }, 3000);
  }

  // ═══ HEADING CLIP-REVEAL ═══

  var headingEls = document.querySelectorAll('.heading-reveal');
  if (headingEls.length) {
    var headingRevealObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          headingRevealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
    headingEls.forEach(function(el) { headingRevealObs.observe(el); });
  }

  // ═══ PAGE TRANSITIONS ═══

  var transition = document.getElementById('page-transition');
  if (transition) {
    document.querySelectorAll('a[href$=".html"], a[href="index.html"], a[href="/"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        var href = link.getAttribute('href');
        transition.classList.add('active');
        setTimeout(function() { window.location.href = href; }, 600);
      });
    });
  }

  // ═══ BACK TO TOP ═══

  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    var bttTicking = false;
    window.addEventListener('scroll', function() {
      if (!bttTicking) {
        requestAnimationFrame(function() {
          if (window.scrollY > 800) {
            backToTop.classList.remove('opacity-0', 'pointer-events-none');
            backToTop.classList.add('opacity-100');
          } else {
            backToTop.classList.add('opacity-0', 'pointer-events-none');
            backToTop.classList.remove('opacity-100');
          }
          bttTicking = false;
        });
        bttTicking = true;
      }
    }, { passive: true });
  }

  // ═══ ABOUT TOGGLE ═══

  var aboutToggle = document.getElementById('about-toggle');
  var aboutMore = document.getElementById('about-more');
  if (aboutToggle && aboutMore) {
    aboutToggle.addEventListener('click', function() {
      aboutMore.classList.toggle('hidden');
      var isExpanded = !aboutMore.classList.contains('hidden');
      aboutToggle.setAttribute('aria-expanded', String(isExpanded));
      var text = aboutToggle.textContent.trim();
      // Detect language from button text
      if (text === 'Read more' || text === 'Show less') {
        aboutToggle.textContent = isExpanded ? 'Show less' : 'Read more';
      } else {
        aboutToggle.textContent = isExpanded ? 'Voir moins' : 'Lire la suite';
      }
    });
  }

  // ═══ VIMEO LITE-EMBED ═══

  document.querySelectorAll('.vimeo-facade').forEach(function(facade) {
    function loadVideo() {
      var id = facade.dataset.vimeoId;
      var iframe = document.createElement('iframe');
      iframe.src = 'https://player.vimeo.com/video/' + id + '?autoplay=1&title=0&byline=0&portrait=0&color=F64E29';
      iframe.className = 'w-full h-full';
      iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('title', facade.getAttribute('aria-label').replace('Play ', ''));
      facade.parentNode.replaceChild(iframe, facade);
    }
    facade.addEventListener('click', loadVideo);
    facade.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); loadVideo(); }
    });
  });

})();
