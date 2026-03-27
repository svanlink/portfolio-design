// ─── Homepage Logic ───
// Swipe hint, filters, testimonials, marquee, accordion, hero parallax, loader, contact form
// Shared logic (mobile menu, glass nav, scroll reveal, page transitions) is in site.js

(function() {
  'use strict';

  // ═══ SWIPE HINT ═══

  (function() {
    var ss = document.querySelector('.services-scroll');
    var sh = document.querySelector('.swipe-hint');
    if (ss && sh) {
      var initScroll = ss.scrollLeft;
      ss.addEventListener('scroll', function handler() {
        if (Math.abs(ss.scrollLeft - initScroll) > 20) {
          sh.style.opacity = '0';
          ss.removeEventListener('scroll', handler);
        }
      });
    }
  })();

  // ═══ FILTER BUTTONS ═══

  var gridCards = document.querySelectorAll('.grid-hover > a[data-category]');
  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(function(b) {
        b.classList.remove('active');
        b.style.color = '';
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      var filter = btn.dataset.filter;
      gridCards.forEach(function(card) {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('filtered-out');
        } else {
          card.classList.add('filtered-out');
        }
      });
    });
  });

  // ═══ TESTIMONIAL CAROUSEL ═══

  var slides = document.querySelectorAll('.testimonial-slide');
  var dots = document.querySelectorAll('.testimonial-dot');
  var currentSlide = 0;

  function showSlide(index) {
    slides.forEach(function(s, i) {
      s.style.opacity = i === index ? '1' : '0';
      s.style.pointerEvents = i === index ? 'auto' : 'none';
    });
    dots.forEach(function(d, i) {
      var span = d.querySelector('span');
      if (span) {
        span.classList.toggle('bg-[#F64E29]', i === index);
        span.classList.toggle('bg-[#EFEFEF]/20', i !== index);
      }
    });
    currentSlide = index;
  }

  var testimonialPaused = false;
  var pauseBtn = document.getElementById('testimonial-pause');

  dots.forEach(function(dot) {
    dot.addEventListener('click', function() {
      testimonialPaused = true;
      updatePauseBtn();
      showSlide(parseInt(dot.dataset.index));
    });
  });

  if (pauseBtn) {
    pauseBtn.addEventListener('click', function() {
      testimonialPaused = !testimonialPaused;
      updatePauseBtn();
    });
  }

  function updatePauseBtn() {
    if (!pauseBtn) return;
    pauseBtn.querySelector('.pause-icon').classList.toggle('hidden', testimonialPaused);
    pauseBtn.querySelector('.play-icon').classList.toggle('hidden', !testimonialPaused);
    pauseBtn.setAttribute('aria-label', testimonialPaused ? 'Play testimonials' : 'Pause testimonials');
  }

  // Auto-advance — pauses when section is off-screen
  var testimonialVisible = false;
  var testimonialSection = document.getElementById('testimonials');
  if (testimonialSection) {
    var testimObserver = new IntersectionObserver(function(entries) {
      testimonialVisible = entries[0].isIntersecting;
    }, { threshold: 0.1 });
    testimObserver.observe(testimonialSection);
  }
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(function() {
      if (!testimonialPaused && testimonialVisible) showSlide((currentSlide + 1) % slides.length);
    }, 6000);
  }

  // ═══ LOGO MARQUEE ═══

  (function() {
    var scroll = document.querySelector('.logo-scroll');
    var track = document.querySelector('.logo-track');
    if (!track || !scroll) return;

    var offset = 0, velocity = 0, dragging = false, lastX = 0, lastTime = 0;
    var autoSpeed = -0.2, friction = 0.95;

    function wrap(x) {
      var half = track.scrollWidth / 2;
      while (x < -half) x += half;
      while (x > 0) x -= half;
      return x;
    }

    function tick() {
      if (!dragging) {
        if (Math.abs(velocity) > 0.3) { velocity *= friction; offset += velocity; }
        else { velocity = 0; offset += autoSpeed; }
      }
      offset = wrap(offset);
      track.style.transform = 'translateX(' + offset + 'px)';
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    scroll.style.cursor = 'grab';

    scroll.addEventListener('mousedown', function(e) {
      e.preventDefault(); dragging = true; velocity = 0;
      lastX = e.clientX; lastTime = Date.now(); scroll.style.cursor = 'grabbing';
    });
    window.addEventListener('mousemove', function(e) {
      if (!dragging) return;
      var now = Date.now(), dt = Math.max(now - lastTime, 1), dx = e.clientX - lastX;
      velocity = dx * (16 / dt); offset += dx; lastX = e.clientX; lastTime = now;
    });
    window.addEventListener('mouseup', function() {
      if (!dragging) return; dragging = false; scroll.style.cursor = 'grab';
    });
    scroll.addEventListener('touchstart', function(e) {
      dragging = true; velocity = 0; lastX = e.touches[0].clientX; lastTime = Date.now();
    }, { passive: true });
    window.addEventListener('touchmove', function(e) {
      if (!dragging) return;
      var now = Date.now(), dt = Math.max(now - lastTime, 1);
      var x = e.touches[0].clientX, dx = x - lastX;
      velocity = dx * (16 / dt); offset += dx; lastX = x; lastTime = now;
    }, { passive: true });
    window.addEventListener('touchend', function() { if (dragging) dragging = false; });
    scroll.addEventListener('dragstart', function(e) { e.preventDefault(); });
  })();

  // ═══ ACCORDION ═══

  function toggleStep(el) {
    var wasOpen = el.classList.contains('open');
    document.querySelectorAll('.accordion-step.open').forEach(function(s) {
      s.classList.remove('open'); s.setAttribute('aria-expanded', 'false');
    });
    if (!wasOpen) { el.classList.add('open'); el.setAttribute('aria-expanded', 'true'); }
  }

  document.querySelectorAll('.accordion-step').forEach(function(step) {
    step.addEventListener('click', function() { toggleStep(step); });
    step.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleStep(step); }
    });
  });

  // ═══ HERO PARALLAX ═══

  var heroContent = document.querySelector('#hero .flex.flex-col');
  var heroVideo = document.getElementById('vimeo-bg');
  var scrollIndicator = document.querySelector('#hero .scroll-ind-entrance');
  var heroHeight = window.innerHeight;
  var scrollTicking = false;

  if (heroContent || heroVideo) {
    window.addEventListener('scroll', function() {
      if (!scrollTicking) {
        requestAnimationFrame(function() {
          var scrollY = window.scrollY;
          if (scrollY < heroHeight) {
            var progress = scrollY / heroHeight;
            if (heroContent) {
              heroContent.style.transform = 'translateY(' + scrollY * 0.12 + 'px)';
              heroContent.style.opacity = Math.max(0, 1 - progress * 2.5);
            }
            if (heroVideo) heroVideo.style.transform = 'translateY(' + scrollY * 0.06 + 'px)';
          }
          if (scrollIndicator) scrollIndicator.style.opacity = Math.max(0, 1 - scrollY / 200);
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }, { passive: true });
  }

  // ═══ SITE LOADER ═══

  (function() {
    var loader = document.getElementById('site-loader');
    if (!loader) return;
    var logo = document.getElementById('loader-logo');
    var pct = document.getElementById('loader-pct');
    var hero = document.getElementById('hero');
    var dismissed = false, progress = 0;

    function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }
    function easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    }

    function updateFill(p) {
      var fill = (p / 100) * 100;
      pct.style.background = 'linear-gradient(to top, #EFEFEF ' + fill + '%, #1C1C1C ' + fill + '%)';
      pct.style.webkitBackgroundClip = 'text';
      pct.style.backgroundClip = 'text';
      logo.style.background = 'linear-gradient(to top, #EFEFEF ' + fill + '%, transparent ' + fill + '%)';
    }

    function dismiss() {
      if (dismissed) return;
      dismissed = true;
      var dismissStart = null, dismissDuration = 1200;

      function animateDismiss(ts) {
        if (!dismissStart) dismissStart = ts;
        var dt = Math.min((ts - dismissStart) / dismissDuration, 1);
        var p = Math.round(progress + easeOutQuart(dt) * (100 - progress));
        pct.textContent = p + '%';
        updateFill(p);
        if (dt < 1) { requestAnimationFrame(animateDismiss); return; }
        setTimeout(function() {
          loader.style.transition = 'opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
          loader.style.opacity = '0';
          loader.style.pointerEvents = 'none';
        }, 500);
        setTimeout(function() { hero.classList.add('hero-loaded'); }, 1000);
        setTimeout(function() { loader.remove(); }, 2000);
      }
      requestAnimationFrame(animateDismiss);
    }

    // Step 1: Logo fades up
    requestAnimationFrame(function() {
      logo.style.opacity = '0.9';
      logo.style.transform = 'translateY(0)';
    });
    // Step 2: Show percentage
    setTimeout(function() { pct.style.opacity = '1'; }, 400);
    // Step 3: Smooth counter 0→90
    var target = 90, startTime = null, duration = 1800;

    function animateCount(timestamp) {
      if (dismissed) return;
      if (!startTime) startTime = timestamp;
      var elapsed = timestamp - startTime;
      var t = Math.min(elapsed / duration, 1);
      progress = easeInOutQuart(t) * target;
      var p = Math.round(progress);
      pct.textContent = p + '%';
      updateFill(p);
      if (t < 1) requestAnimationFrame(animateCount);
    }
    setTimeout(function() { requestAnimationFrame(animateCount); }, 400);

    // Wait for: min time + page load + hero video iframe
    var minTime = new Promise(function(r) { setTimeout(r, 2000); });
    var pageLoad = new Promise(function(r) { window.addEventListener('load', r); });
    var videoReady = new Promise(function(r) {
      var check = setInterval(function() {
        var iframe = document.querySelector('#vimeo-bg iframe');
        if (iframe) { clearInterval(check); r(); }
      }, 200);
    });
    Promise.all([minTime, pageLoad, videoReady]).then(dismiss);
    setTimeout(dismiss, 4000);
  })();

  // ═══ CONTACT FORM ═══

  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    var submitBtn = document.getElementById('contact-submit');
    var formSuccess = document.getElementById('form-success');
    var formError = document.getElementById('form-error');

    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';
      formSuccess.classList.add('hidden');
      formError.classList.add('hidden');

      try {
        var response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          formSuccess.classList.remove('hidden');
          contactForm.reset();
          submitBtn.innerHTML = 'Sent \u2713 <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>';
          setTimeout(function() {
            submitBtn.innerHTML = 'Send Message <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>';
            submitBtn.disabled = false;
            formSuccess.classList.add('hidden');
          }, 5000);
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        formError.classList.remove('hidden');
        submitBtn.innerHTML = 'Send Message <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>';
        submitBtn.disabled = false;
      }
    });
  }

})();
