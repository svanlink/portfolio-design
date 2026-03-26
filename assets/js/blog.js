// ─── Blog: Substack RSS → Card Grid ───
(function () {
  'use strict';

  var SUBSTACK_FEED = 'https://vaneickelen.substack.com/feed';
  var API = 'https://api.rss2json.com/v1/api.json?rss_url=';
  var CONTAINER = document.getElementById('blog-grid');
  var LANG = document.documentElement.lang || 'en';
  var CACHE_KEY = 'blog-cache';
  var CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  var i18n = {
    en: {
      readmore: 'Read on Substack',
      empty: 'No posts yet — check back soon.',
      error: 'Unable to load posts.',
      visit: 'Visit Substack'
    },
    fr: {
      readmore: 'Lire sur Substack',
      empty: 'Aucun article pour le moment.',
      error: 'Impossible de charger les articles.',
      visit: 'Visiter Substack'
    }
  };
  var t = i18n[LANG] || i18n.en;

  // ── Skeleton loading cards ──
  function showSkeletons() {
    var html = '';
    for (var i = 0; i < 6; i++) {
      html += '<div class="blog-skeleton reveal visible">' +
        '<div class="aspect-video bg-[#111111] relative overflow-hidden">' +
          '<div class="absolute inset-0 bg-linear-to-r from-transparent via-[#EFEFEF]/[0.03] to-transparent bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]"></div>' +
        '</div>' +
        '<div class="mt-3 h-3 w-24 bg-[#EFEFEF]/[0.05] rounded-sm"></div>' +
        '<div class="mt-2 h-5 w-3/4 bg-[#EFEFEF]/[0.05] rounded-sm"></div>' +
        '<div class="mt-2 h-3 w-full bg-[#EFEFEF]/[0.03] rounded-sm"></div>' +
        '<div class="mt-1 h-3 w-2/3 bg-[#EFEFEF]/[0.03] rounded-sm"></div>' +
      '</div>';
    }
    CONTAINER.innerHTML = html;
  }

  // ── Extract thumbnail from content HTML ──
  function extractImage(item) {
    if (item.thumbnail && item.thumbnail.length > 10) return item.thumbnail;
    if (item.enclosure && item.enclosure.link) return item.enclosure.link;
    // Parse first img from content
    var tmp = document.createElement('div');
    tmp.innerHTML = item.content || item.description || '';
    var img = tmp.querySelector('img');
    return img ? img.src : null;
  }

  // ── Strip HTML to plain text excerpt ──
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

  // ── Render cards ──
  function render(items) {
    if (!items || items.length === 0) {
      CONTAINER.innerHTML =
        '<div class="col-span-full flex flex-col items-center justify-center py-24 gap-4">' +
          '<p class="font-mono-nav text-[12px] uppercase tracking-[0.15em] text-[#EFEFEF]/40">' + t.empty + '</p>' +
          '<a href="https://vaneickelen.substack.com" target="_blank" rel="noopener noreferrer" ' +
            'class="font-mono-nav text-[10px] uppercase tracking-[0.15em] text-[#F64E29] hover:text-[#EFEFEF] transition-colors duration-400">' +
            t.visit + ' →</a>' +
        '</div>';
      return;
    }

    var html = '';
    items.forEach(function (item) {
      var img = extractImage(item);
      var date = formatDate(item.pubDate);
      var desc = excerpt(item.description, 150);

      html += '<a href="' + item.link + '" target="_blank" rel="noopener noreferrer" class="blog-card group reveal">' +
        '<div class="relative overflow-hidden aspect-video bg-[#111111]">' +
          (img
            ? '<img src="' + img + '" alt="" class="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" loading="lazy">'
            : '<div class="w-full h-full flex items-center justify-center"><span class="font-mono-nav text-[10px] uppercase tracking-[0.15em] text-[#EFEFEF]/10">No image</span></div>') +
        '</div>' +
        '<span class="font-mono-nav text-[9px] uppercase tracking-[0.15em] text-[#EFEFEF]/30 mt-3 block">' + date + '</span>' +
        '<h2 class="font-heading text-[18px] md:text-[20px] uppercase tracking-[0.02em] text-[#EFEFEF] mt-1 leading-tight" style="-webkit-line-clamp:2;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;">' + item.title + '</h2>' +
        '<p class="font-body text-[13px] text-[#EFEFEF]/50 mt-2 leading-relaxed" style="-webkit-line-clamp:3;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;">' + desc + '</p>' +
        '<span class="font-mono-nav text-[10px] uppercase tracking-[0.15em] text-[#F64E29] mt-3 inline-block group-hover:text-[#EFEFEF] transition-colors duration-400">' + t.readmore + ' →</span>' +
      '</a>';
    });

    CONTAINER.innerHTML = html;

    // Trigger scroll reveal on new cards
    var cards = CONTAINER.querySelectorAll('.reveal');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    cards.forEach(function (el) { observer.observe(el); });

    // Safety net
    setTimeout(function () {
      CONTAINER.querySelectorAll('.reveal:not(.visible)').forEach(function (el) {
        el.classList.add('visible');
      });
    }, 3000);
  }

  // ── Error state ──
  function showError() {
    CONTAINER.innerHTML =
      '<div class="col-span-full flex flex-col items-center justify-center py-24 gap-4">' +
        '<p class="font-mono-nav text-[12px] uppercase tracking-[0.15em] text-[#EFEFEF]/40">' + t.error + '</p>' +
        '<a href="https://vaneickelen.substack.com" target="_blank" rel="noopener noreferrer" ' +
          'class="font-mono-nav text-[10px] uppercase tracking-[0.15em] text-[#F64E29] hover:text-[#EFEFEF] transition-colors duration-400">' +
          t.visit + ' →</a>' +
      '</div>';
  }

  // ── Fetch with cache ──
  function load() {
    // Check session cache
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

    showSkeletons();

    fetch(API + encodeURIComponent(SUBSTACK_FEED))
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.status !== 'ok') { showError(); return; }
        // Cache
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({
            ts: Date.now(),
            items: data.items
          }));
        } catch (e) { /* quota exceeded, ignore */ }
        render(data.items);
      })
      .catch(function () { showError(); });
  }

  // ── Init ──
  if (CONTAINER) load();
})();
