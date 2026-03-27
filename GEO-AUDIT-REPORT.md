# GEO Audit Report — vaneickelen.com

**Date:** 2026-03-27
**Site:** https://vaneickelen.com/
**Type:** Agency / Creative Portfolio (Filmmaker)
**Languages:** English, French

---

## Composite GEO Score: 55/100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| AI Citability & Visibility | 25% | 48/100 | 12.0 |
| Brand Authority Signals | 20% | 28/100 | 5.6 |
| Content Quality & E-E-A-T | 20% | 72/100 | 14.4 |
| Technical Foundations | 15% | 82/100 | 12.3 |
| Structured Data | 10% | 38/100 | 3.8 |
| Platform Optimization | 10% | 38/100 | 3.8 |
| **TOTAL** | | | **51.9 → 55/100** |

**Rating:** Fair — The site has strong technical foundations and authentic content, but is nearly invisible to AI search platforms due to weak brand signals, missing structured data, and content optimized for human emotion rather than machine citability.

---

## Category Breakdown

### 1. AI Citability & Visibility — 48/100

| Component | Score |
|-----------|-------|
| Passage Citability | 42/100 |
| AI Crawler Access | 100/100 |
| Brand Mentions | 28/100 |
| llms.txt | 0/100 |

**What's working:**
- robots.txt is fully open — all AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) allowed
- Sitemap present with hreflang annotations
- All content server-rendered in static HTML (no JS dependency for text)

**What's failing:**
- Zero statistics anywhere on the site (no years of experience, project count, view counts)
- No FAQ section — AI models heavily favor Q&A formatted content
- Service descriptions are generic marketing copy, not citable facts
- No llms.txt file exists
- Bio is literary/emotional, not factual/extractable

### 2. Brand Authority Signals — 28/100

| Platform | Status |
|----------|--------|
| Wikipedia | Absent |
| Reddit | Absent |
| YouTube | Absent |
| Vimeo | Minimal (7 followers, outdated bio) |
| Instagram | Present |
| LinkedIn | Present (unverified content) |
| IMDb | Absent |
| Industry Directories | Absent |

**Critical gap:** No presence on the platforms AI models cite most heavily (Wikipedia, Reddit, YouTube, industry directories).

### 3. Content Quality & E-E-A-T — 72/100

| Dimension | Score |
|-----------|-------|
| Experience | 19/25 |
| Expertise | 17/25 |
| Authoritativeness | 18/25 |
| Trustworthiness | 14/25 |

**What's working:**
- Authentic first-person voice that reads as genuinely human
- Specific production details (locations, equipment, conditions)
- Strong client roster (Adidas, Nike, Cartier, Red Bull, Richemont)
- Named testimonials with real titles and companies
- Case studies with measurable results (2.4M views, 42% brand lift)

**What's failing:**
- No privacy policy (legally required under Swiss FADP/EU GDPR)
- Empty blog page (signals abandoned content)
- No dedicated About page
- No external links from case studies to client sites
- Dual H1 tags on homepage

### 4. Technical Foundations — 82/100

| Area | Score |
|------|-------|
| Server-Side Rendering | 95/100 |
| Meta Tags & Indexability | 95/100 |
| Crawlability | 80/100 |
| Mobile | 90/100 |
| URL Structure | 85/100 |
| Security Headers | 40/100 |
| CWV Risk | 65/100 |

**What's working:**
- 100% static HTML — all text visible without JS
- Clean meta tags, canonical, hreflang, Open Graph, Twitter Card
- Mobile-responsive with touch-friendly targets
- HTTP/2, HTTPS, CDN (Fastly via GitHub Pages)
- All JS deferred, preconnect hints for third-party resources

**What's failing:**
- Blog pages missing from sitemap.xml
- Sitemap URLs are extensionless but HTML files use .html extensions (potential 404s)
- No security headers (CSP, X-Frame-Options) — GitHub Pages limitation
- Title tag at 76 chars (truncated in SERPs, aim for 60)

### 5. Structured Data — 38/100

**Existing schema:** 1 JSON-LD block (ProfessionalService with nested Person)

| Schema Type | Status |
|-------------|--------|
| ProfessionalService | Present (minor issues) |
| Person (standalone) | Missing — only nested as `founder` |
| VideoObject | Missing — 7 Vimeo embeds with zero schema |
| Review | Missing — 3 testimonials with no markup |
| WebSite | Missing |
| WebPage + speakable | Missing |
| FAQPage | Missing |
| BreadcrumbList | Missing |

**Issues in existing schema:**
- `url` missing trailing slash
- `logo` points to favicon.svg instead of proper image
- `sameAs` only links 3 platforms (need 5+)
- `areaServed` uses plain strings instead of Place objects
- Missing: `telephone`, `foundingDate`, `geo` coordinates

### 6. Platform Optimization — 38/100

| Platform | Score | Key Gap |
|----------|-------|---------|
| Google AI Overviews | 32/100 | No Q&A headings, no FAQPage/HowTo schema, accordion content hidden |
| ChatGPT Web Search | 35/100 | Weak entity recognition, no third-party corroboration |
| Perplexity AI | 28/100 | No community validation, no quotable data points |
| Google Gemini | 42/100 | No YouTube, no Google Business Profile |
| Bing Copilot | 30/100 | No Bing Webmaster Tools, no IndexNow, no BreadcrumbList |

---

## Prioritized Action Plan

### Quick Wins (Low effort, high impact)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1 | **Create and deploy `/llms.txt`** | AI Visibility +10 | 15 min |
| 2 | **Add blog pages to sitemap.xml** and verify URL format matches | Technical +5 | 15 min |
| 3 | **Add standalone Person schema** as top-level JSON-LD block | Schema +8 | 30 min |
| 4 | **Add VideoObject schema** for 7 Vimeo embeds | Schema +10 | 45 min |
| 5 | **Add Review schema** for 3 testimonials | Schema +5 | 30 min |
| 6 | **Expand `sameAs`** to include IMDb, YouTube, Twitter/X if available | Schema +3 | 10 min |
| 7 | **Fix dual H1** — change tagline from H1 to `<p>` | Content +2 | 5 min |
| 8 | **Shorten title tag** to ~60 characters | Technical +1 | 5 min |
| 9 | **Update Vimeo bio** to match professional positioning | Brand +3 | 10 min |

### Medium-Term (1-2 weeks)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 10 | **Add FAQ section** with question-based headings + FAQPage schema | Citability +15, Platform +10 | 2-3 hrs |
| 11 | **Create privacy policy page** | Trust +5 (legally required) | 1-2 hrs |
| 12 | **Publish 3-5 blog posts** on-domain (BTS, gear, location guides) | Topical Authority +15 | 1-2 days |
| 13 | **Add "By the Numbers" content block** (years, projects, countries, views) | Citability +10 | 1 hr |
| 14 | **Claim Google Business Profile** for Geneva address | Platform +8 | 30 min |
| 15 | **Verify site in Bing Webmaster Tools** + add IndexNow | Platform +5 | 30 min |
| 16 | **Add WebSite + WebPage schema** with speakable property | Schema +5 | 30 min |
| 17 | **Create dedicated /about page** with factual third-person bio | Content +8, Citability +5 | 2 hrs |
| 18 | **Fix ProfessionalService schema** (logo, url, geo, areaServed, telephone) | Schema +3 | 30 min |

### Strategic (1-3 months)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 19 | **Create YouTube channel** and cross-post portfolio videos | Brand +15, Platform +12 | Ongoing |
| 20 | **Get listed on industry directories** (ProductionParadise, Mandy, IMDb, local film commission) | Brand +10 | 2-3 hrs |
| 21 | **Build Reddit/community presence** in filmmaking subreddits | Brand +8, Platform +5 | Ongoing |
| 22 | **Add external links** from case studies to client websites | Trust +3 | 30 min |
| 23 | **Migrate hosting** to Netlify/Vercel for custom security headers, or proxy via Cloudflare | Technical +5 | 2-3 hrs |
| 24 | **Add cookie consent** mechanism for GDPR/FADP compliance | Trust +3 | 1-2 hrs |

---

## Score Projections

| Timeframe | Projected Score | Key Actions |
|-----------|----------------|-------------|
| Current | **55/100** | — |
| After Quick Wins | **68/100** | llms.txt, schema additions, sitemap fix |
| After Medium-Term | **78/100** | FAQ section, blog content, GBP, about page |
| After Strategic | **85-90/100** | YouTube, directories, community presence |

---

## Key Insight

> The site is beautifully crafted for human emotional impact but nearly invisible to AI search. The content is authentic and well-written — the core problem isn't quality, it's **format**. AI systems need factual claims, structured answers, quotable data points, and entity signals. None of these changes require sacrificing the current aesthetic — they add a layer of machine-readable depth on top of what already works for human visitors.

---

*Generated by GEO Audit Tool — 2026-03-27*
