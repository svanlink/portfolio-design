// ─── Blog: Substack RSS → Editorial Layout ───
(function () {
  'use strict';

  var SUBSTACK_FEED = 'https://vaneickelen.substack.com/feed';
  var API = 'https://api.rss2json.com/v1/api.json?rss_url=';
  var FEATURED = document.getElementById('blog-featured');
  var GRID = document.getElementById('blog-grid');
  var LANG = document.documentElement.lang || 'en';
  var CACHE_KEY = 'blog-cache';
  var CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  var i18n = {
    en: {
      readmore: 'Read Article',
      featured: 'Latest',
      empty: 'No posts yet — check back soon.',
      error: 'Unable to load posts.',
      visit: 'Visit Substack',
      minread: 'min read'
    },
    fr: {
      readmore: 'Lire l\'Article',
      featured: 'Dernier Article',
      empty: 'Aucun article pour le moment.',
      error: 'Impossible de charger les articles.',
      visit: 'Visiter Substack',
      minread: 'min de lecture'
    }
  };
  var t = i18n[LANG] || i18n.en;

  // ── Estimate read time ──
  function readTime(html) {
    var tmp = document.createElement('div');
    tmp.innerHTML = html || '';
    var text = tmp.textContent || '';
    var words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 230));
  }

  // ── Extract thumbnail ──
  function extractImage(item) {
    if (item.thumbnail && item.thumbnail.length > 10) return item.thumbnail;
    if (item.enclosure && item.enclosure.link) return item.enclosure.link;
    var tmp = document.createElement('div');
    tmp.innerHTML = item.content || item.description || '';
    var img = tmp.querySelector('img');
    return img ? img.src : null;
  }

  // ── Strip HTML → plain text excerpt ──
  function excerpt(html, len) {
    var tmp = document.createElement('div');
    tmp.innerHTML = html || '';
    var text = tmp.textContent || tmp.innerText || '';
    text = text.replace(/\s+/g, ' ').trim();
    if (text.length > len) text = text.substring(0, len).replace(/\s\S*$/, '') + '…';
    return text;
  }

  // ── Format date ──
  function formatDate(dateStr) {
    var d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    return new Intl.DateTimeFormat(LANG, {
      year: 'numeric', month: 'long', day: 'numeric'
    }).format(d);
  }

  // ── Skeleton: featured ──
  function showFeaturedSkeleton() {
    if (!FEATURED) return;
    FEATURED.querySelector('.max-w-\\[1400px\\]').innerHTML =
      '<div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">' +
        '<div class="aspect-[16/10] bg-[#111111] relative overflow-hidden">' +
          '<div class="absolute inset-0 bg-linear-to-r from-transparent via-[#EFEFEF]/[0.03] to-transparent bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]"></div>' +
        '</div>' +
        '<div class="flex flex-col justify-center gap-4">' +
          '<div class="h-3 w-32 bg-[#EFEFEF]/[0.05] rounded-sm"></div>' +
          '<div class="h-10 w-full bg-[#EFEFEF]/[0.05] rounded-sm"></div>' +
          '<div class="h-10 w-3/4 bg-[#EFEFEF]/[0.05] rounded-sm"></div>' +
          '<div class="h-4 w-full bg-[#EFEFEF]/[0.03] rounded-sm mt-2"></div>' +
          '<div class="h-4 w-2/3 bg-[#EFEFEF]/[0.03] rounded-sm"></div>' +
        '</div>' +
      '</div>';
  }

  // ── Skeleton: grid ──
  function showGridSkeletons() {
    if (!GRID) return;
    var html = '';
    for (var i = 0; i < 4; i++) {
      html += '<div class="blog-skeleton">' +
        '<div class="aspect-[16/10] bg-[#111111] relative overflow-hidden">' +
          '<div class="absolute inset-0 bg-linear-to-r from-transparent via-[#EFEFEF]/[0.03] to-transparent bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]"></div>' +
        '</div>' +
        '<div class="mt-4 h-3 w-28 bg-[#EFEFEF]/[0.05] rounded-sm"></div>' +
        '<div class="mt-2 h-6 w-3/4 bg-[#EFEFEF]/[0.05] rounded-sm"></div>' +
        '<div class="mt-3 h-3 w-full bg-[#EFEFEF]/[0.03] rounded-sm"></div>' +
        '<div class="mt-1 h-3 w-2/3 bg-[#EFEFEF]/[0.03] rounded-sm"></div>' +
      '</div>';
    }
    GRID.innerHTML = html;
  }

  // ── Render featured (hero) post ──
  function renderFeatured(item) {
    if (!FEATURED || !item) return;
    var img = extractImage(item);
    var date = formatDate(item.pubDate);
    var desc = excerpt(item.content || item.description, 220);
    var mins = readTime(item.content || item.description);
    var container = FEATURED.querySelector('.max-w-\\[1400px\\]');

    container.innerHTML =
      '<a href="' + item.link + '" target="_blank" rel="noopener noreferrer" class="blog-featured-card group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 reveal">' +

        // Image
        '<div class="relative overflow-hidden aspect-[16/10] bg-[#111111]">' +
          (img
            ? '<img src="' + img + '" alt="" class="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">'
            : '<div class="w-full h-full bg-[#111111]"></div>') +
          '<div class="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>' +
        '</div>' +

        // Content
        '<div class="flex flex-col justify-center">' +
          '<div class="flex items-center gap-3 mb-5">' +
            '<span class="font-mono-nav text-[10px] uppercase tracking-[0.15em] text-[#F64E29]">' + t.featured + '</span>' +
            '<span class="w-[1px] h-3 bg-[#EFEFEF]/15"></span>' +
            '<span class="font-mono-nav text-[10px] uppercase tracking-[0.15em] text-[#EFEFEF]/30">' + date + '</span>' +
            '<span class="w-[1px] h-3 bg-[#EFEFEF]/15"></span>' +
            '<span class="font-mono-nav text-[10px] uppercase tracking-[0.15em] text-[#EFEFEF]/30">' + mins + ' ' + t.minread + '</span>' +
          '</div>' +
          '<h2 class="font-heading text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] uppercase tracking-[0.02em] leading-[0.9] text-[#EFEFEF] group-hover:text-[#F64E29] transition-colors duration-500">' + item.title + '</h2>' +
          '<p class="font-body text-[14px] md:text-[15px] text-[#EFEFEF]/40 mt-5 leading-[1.7]">' + desc + '</p>' +
          '<div class="flex items-center gap-3 mt-8">' +
            '<span class="font-mono-nav text-[11px] uppercase tracking-[0.15em] text-[#EFEFEF]/70 group-hover:text-[#F64E29] transition-colors duration-400">' + t.readmore + '</span>' +
            '<svg class="w-4 h-4 text-[#EFEFEF]/40 group-hover:text-[#F64E29] group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-all duration-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>' +
          '</div>' +
        '</div>' +

      '</a>';
  }

  // ── Render grid cards ──
  function renderGrid(items) {
    if (!GRID) return;

    if (!items || items.length === 0) {
      GRID.innerHTML = '';
      return;
    }

    var html = '';
    items.forEach(function (item, idx) {
      var img = extractImage(item);
      var date = formatDate(item.pubDate);
      var desc = excerpt(item.description, 140);
      var mins = readTime(item.content || item.description);

      html += '<a href="' + item.link + '" target="_blank" rel="noopener noreferrer" class="blog-card group reveal">' +

        // Image with overlay
        '<div class="relative overflow-hidden aspect-[16/10] bg-[#111111]">' +
          (img
            ? '<img src="' + img + '" alt="" class="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" loading="lazy">'
            : '<div class="w-full h-full flex items-center justify-center"><span class="font-mono-nav text-[10px] uppercase tracking-[0.15em] text-[#EFEFEF]/10">No image</span></div>') +
          '<div class="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>' +
        '</div>' +

        // Meta row
        '<div class="flex items-center gap-3 mt-4">' +
          '<span class="font-mono-nav text-[9px] uppercase tracking-[0.15em] text-[#EFEFEF]/30">' + date + '</span>' +
          '<span class="w-[1px] h-2.5 bg-[#EFEFEF]/10"></span>' +
          '<span class="font-mono-nav text-[9px] uppercase tracking-[0.15em] text-[#EFEFEF]/30">' + mins + ' ' + t.minread + '</span>' +
        '</div>' +

        // Title
        '<h2 class="font-heading text-[22px] md:text-[26px] uppercase tracking-[0.02em] text-[#EFEFEF] mt-2 leading-[0.95] group-hover:text-[#F64E29] transition-colors duration-400" style="-webkit-line-clamp:2;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;">' + item.title + '</h2>' +

        // Excerpt
        '<p class="font-body text-[13px] text-[#EFEFEF]/40 mt-3 leading-[1.7]" style="-webkit-line-clamp:3;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;">' + desc + '</p>' +

        // CTA
        '<div class="flex items-center gap-2 mt-4">' +
          '<span class="font-mono-nav text-[10px] uppercase tracking-[0.15em] text-[#EFEFEF]/50 group-hover:text-[#F64E29] transition-colors duration-400">' + t.readmore + '</span>' +
          '<svg class="w-3.5 h-3.5 text-[#EFEFEF]/30 group-hover:text-[#F64E29] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>' +
        '</div>' +

      '</a>';
    });

    GRID.innerHTML = html;
  }

  // ── Empty state ──
  function showEmpty() {
    if (FEATURED) {
      FEATURED.querySelector('.max-w-\\[1400px\\]').innerHTML =
        '<div class="flex flex-col items-center justify-center py-20 md:py-32 gap-5">' +
          '<span class="font-mono-nav text-[10px] uppercase tracking-[0.15em] text-[#EFEFEF]/20 block">—</span>' +
          '<p class="font-mono-nav text-[12px] uppercase tracking-[0.15em] text-[#EFEFEF]/30 text-center">' + t.empty + '</p>' +
          '<a href="https://vaneickelen.substack.com" target="_blank" rel="noopener noreferrer" ' +
            'class="inline-flex items-center gap-2 mt-2 px-5 py-2.5 border border-[#EFEFEF]/15 hover:border-[#F64E29] hover:bg-[#F64E29]/5 font-mono-nav text-[10px] uppercase tracking-[0.15em] text-[#EFEFEF]/60 hover:text-[#F64E29] transition-all duration-400">' +
            t.visit +
            ' <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>' +
          '</a>' +
        '</div>';
    }
    if (GRID) GRID.innerHTML = '';
  }

  // ── Error state ──
  function showError() {
    if (FEATURED) {
      FEATURED.querySelector('.max-w-\\[1400px\\]').innerHTML =
        '<div class="flex flex-col items-center justify-center py-20 md:py-32 gap-5">' +
          '<p class="font-mono-nav text-[12px] uppercase tracking-[0.15em] text-[#EFEFEF]/30 text-center">' + t.error + '</p>' +
          '<a href="https://vaneickelen.substack.com" target="_blank" rel="noopener noreferrer" ' +
            'class="inline-flex items-center gap-2 mt-2 px-5 py-2.5 border border-[#EFEFEF]/15 hover:border-[#F64E29] hover:bg-[#F64E29]/5 font-mono-nav text-[10px] uppercase tracking-[0.15em] text-[#EFEFEF]/60 hover:text-[#F64E29] transition-all duration-400">' +
            t.visit +
            ' <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>' +
          '</a>' +
        '</div>';
    }
    if (GRID) GRID.innerHTML = '';
  }

  // ── Trigger scroll reveals ──
  function initReveals() {
    var els = document.querySelectorAll('#blog-featured .reveal, #blog-grid .reveal');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el, i) {
      el.style.transitionDelay = (i * 0.1) + 's';
      observer.observe(el);
    });
    // Safety net
    setTimeout(function () {
      document.querySelectorAll('#blog-featured .reveal:not(.visible), #blog-grid .reveal:not(.visible)').forEach(function (el) {
        el.classList.add('visible');
      });
    }, 3000);
  }

  // ── Main render ──
  function render(items) {
    if (!items || items.length === 0) {
      showEmpty();
      return;
    }

    // First item = featured hero
    renderFeatured(items[0]);

    // Remaining = grid
    if (items.length > 1) {
      renderGrid(items.slice(1));
    } else {
      if (GRID) GRID.innerHTML = '';
    }

    // Hide the divider + grid section if only 1 post
    var gridSection = GRID ? GRID.closest('section') : null;
    if (gridSection && items.length <= 1) {
      gridSection.style.display = 'none';
    }

    initReveals();
  }

  // ── Fetch with cache ──
  function load() {
    try {
      var cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        var parsed = JSON.parse(cached);
        if (Date.now() - parsed.ts < CACHE_TTL) {
          render(parsed.items);
          return;
        }
      }
    } catch (e) { /* ignore */ }

    showFeaturedSkeleton();
    showGridSkeletons();

    fetch(API + encodeURIComponent(SUBSTACK_FEED))
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.status !== 'ok') { showError(); return; }
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({
            ts: Date.now(),
            items: data.items
          }));
        } catch (e) { /* quota exceeded */ }
        render(data.items);
      })
      .catch(function () { showError(); });
  }

  // ── Init ──
  if (FEATURED || GRID) load();
})();
