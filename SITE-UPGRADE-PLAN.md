# Van Eickelen — Site Upgrade Master Plan

**Generated:** 2026-03-26
**URL:** https://vaneickelen.com
**Analysis:** 9 parallel audits across GEO, SEO, UX, content, and design

---

## Composite Score Card

| Category | Score | Rating |
|---|---|---|
| Technical SEO | **72/100** | Fair |
| Content & E-E-A-T | **68/100** | Good |
| AI Crawler Access | **82/100** | Good |
| AI Platform Readiness | **39/100** | Poor |
| Schema Markup | **35/100** | Poor |
| AI Citability | **29/100** | Poor |
| Brand Authority | **18/100** | Minimal |
| **Composite GEO Score** | **49/100** | |

---

## What's Already Strong

- Static HTML — all content visible to AI crawlers without JS execution
- Clean heading hierarchy (H1 > H2 > H3)
- Bilingual setup with proper hreflang (EN/FR)
- ProfessionalService JSON-LD schema with Person, OfferCatalog, address
- robots.txt allows all AI crawlers
- Sitemap with 16 URLs and hreflang annotations
- Impressive client roster (Adidas, Nike, Cartier, Red Bull, Richemont)
- Detailed case studies with quantified outcomes
- Genuine, human-authored content with strong directorial voice
- llms.txt already exists and is well-structured

---

## Priority 1: Critical Fixes (Do Now)

### 1.1 — Fix broken HTML on process CTA
**Status: DONE** (fixed during this session)
The `<a>` tag was missing its closing `>`, breaking the "Ready to start?" link.

### 1.2 — Fix i18n SVG destruction bug
**Status: DONE** (fixed during this session)
Moved `data-i18n` attributes to inner `<span>` wrappers so `textContent` replacement doesn't destroy SVG arrow icons.

### 1.3 — Add Privacy Policy page
The contact form collects personal data via Formspree with no linked privacy policy. Required under Swiss nFADP and EU GDPR.
- Create `/privacy.html` and `/fr/privacy.html`
- Cover: data collected, Formspree as processor, retention, rights
- Link from footer on all pages

### 1.4 — Fix sitemap URL mismatch
Sitemap lists extensionless URLs (`/case-study-adidas-terrex`) but actual files are `.html`. Search engines may get 404s from sitemap URLs.
- Update sitemap to use `.html` extensions matching actual file paths
- OR restructure into directories (`/case-study-adidas-terrex/index.html`)

### 1.5 — Replace Tailwind CDN with production build
`cdn.tailwindcss.com` is a ~300KB runtime JS compiler meant for dev only. It blocks rendering, inflates LCP, and signals poor quality.
- Install Tailwind CLI or use Vite
- Generate a purged CSS file (typically <15KB)
- Replace the CDN `<script>` with a `<link rel="stylesheet">`
- **Impact:** Largest single Core Web Vitals improvement

---

## Priority 2: High-Impact Upgrades (Week 1-2)

### 2.1 — Add standalone Person schema
Sebastian's identity is buried inside `founder`. AI models need a top-level Person entity.
- Add separate JSON-LD block for Person with `@id`, `name`, `jobTitle`, `knowsAbout`, `sameAs`
- Reference via `@id` from ProfessionalService

### 2.2 — Add VideoObject schemas for all 6 project videos
A filmmaker portfolio with 7 Vimeo embeds and zero video structured data. Each needs: `name`, `description`, `thumbnailUrl`, `uploadDate`, `contentUrl`, `embedUrl`, `duration`.

### 2.3 — Add WebSite + WebPage schemas with `speakable`
- WebSite: establishes site-level identity
- WebPage: with `speakable` CSS selectors pointing to hero, meta description, and about content
- Tells AI assistants which sections to read aloud or summarize

### 2.4 — Expand sameAs to 5+ platforms
Current: Instagram, Vimeo, LinkedIn (3 platforms).
Add: IMDb (create profile), YouTube (create channel), Wikidata (create entity).
Each additional sameAs link strengthens AI entity recognition.

### 2.5 — Create an About page
**Single highest-impact content addition for E-E-A-T.**
Include: career narrative, training, years of experience, achievements, filmmaking philosophy, professional portrait. ~500-800 words with a 150-word bio paragraph optimized for AI extraction.

### 2.6 — Add an "About" intro block on homepage
50-60 word bio paragraph directly answering "Who is Sebastian Van Eickelen?" — the exact answer-target pattern AI Overviews extract.

### 2.7 — Update robots.txt with explicit AI crawler directives
Add specific `User-agent` / `Allow` rules for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot. Block Bytespider.

### 2.8 — Complete French translation
The FR page has French meta tags but English body content. Fully translate: section headings, service descriptions, process steps, testimonials, CTAs, form labels, submit button text.

---

## Priority 3: Medium-Impact Improvements (Month 1)

### 3.1 — Make accordion keyboard-accessible
Process accordion uses `div onclick` — not keyboard-accessible. Replace with `<button>` elements, add `role`, `tabindex`, `aria-expanded`, `aria-controls`.

### 3.2 — Add width/height to all images
24 logo `<img>` tags have no intrinsic dimensions → CLS. Add explicit `width` and `height` attributes.

### 3.3 — Fix color contrast
Multiple text elements use opacity values below WCAG AA:
- `/30` → ~2.3:1 (fails). Bump to `/60` minimum
- `/40` → ~3.1:1 (fails). Bump to `/50` minimum
- `/50` → ~3.9:1 (borderline). Accept or bump to `/60`

### 3.4 — Add `<main>` landmark
No `<main>` element wrapping primary content. Screen readers rely on this.

### 3.5 — Add FAQPage schema
Convert "How It Works" accordion to FAQPage schema. Ensure accordion content is visible in DOM (not hidden via `max-height: 0` from crawlers).

### 3.6 — Add visible dates to all pages
No publication or "last updated" dates anywhere. Add to homepage and all case studies. Add `article:modified_time` meta tags. AI platforms strongly weight content freshness.

### 3.7 — Trim meta description
Current: 219 chars (will be truncated). Target: ~155 chars.
Suggested: "Sebastian Van Eickelen — filmmaker and videographer in Geneva, Switzerland. Cinematic brand films, commercials, and documentary for global brands."

### 3.8 — Add hreflang x-default
Missing `hreflang="x-default"` fallback. Add to HTML `<head>` and sitemap.

### 3.9 — Add `prefers-reduced-motion` support
Users with reduced motion settings still see all animations, parallax, auto-scrolling logos. Add a media query disabling animations.

### 3.10 — Register with Bing Webmaster Tools
Add `msvalidate.01` meta tag. Submit sitemap. Implement IndexNow for faster indexing.

### 3.11 — Add security headers via Cloudflare
GitHub Pages doesn't support custom headers. Cloudflare (free) adds CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy.

---

## Priority 4: Content & Authority Building (Month 1-3)

### 4.1 — Create a YouTube channel
**Highest-ROI action for brand authority.** YouTube has 0.737 correlation with AI citation — strongest of any platform.
- Upload showreel, project breakdowns, behind-the-scenes
- Mirror key Vimeo content
- Add VideoObject schemas with YouTube URLs
- Target: "filmmaker Geneva", "brand film Switzerland"

### 4.2 — Create IMDb profile
Essential credibility signal for any filmmaker. List all documentary and commercial work.

### 4.3 — Create Wikidata entity
Lower notability bar than Wikipedia. Create entity with: occupation (filmmaker), location (Geneva), notable works, social profiles. Strongest signal for AI entity resolution across all platforms.

### 4.4 — Start a blog / Journal section
**Single most impactful action for AI citability and topical authority.**
Target 5-10 articles:
- "How to Plan a Brand Film in Switzerland" (1,500+ words)
- "Behind the Scenes: Shooting at Altitude in the Swiss Alps"
- "Brand Film vs. Commercial: What's the Difference?"
- "The Cost of Video Production in Geneva: What to Expect in 2026"
- "What to Look for When Hiring a Filmmaker in Switzerland"

### 4.5 — Expand case studies to 600-800 words each
Add "Behind the Scenes" paragraphs, "Key Decisions" sections, more detailed results with industry benchmarks. Increases total indexable content by 50-80%.

### 4.6 — Create Awards & Recognition page
Aggregate Banff festival selection and other laurels. Strengthens authoritativeness signal.

### 4.7 — Add external outbound links
Zero editorial outbound links currently. Add 2-3 per case study (client brand pages, festival pages, equipment references).

### 4.8 — Build Reddit presence
Post in r/filmmakers, r/videography, r/cinematography, r/Switzerland. Share behind-the-scenes content authentically. Perplexity heavily indexes Reddit.

### 4.9 — Create Google Business Profile
Verify at Rue de Montbrillant 28, 1201 Geneva. Add photos, services, request client reviews. Directly feeds Gemini's local knowledge.

### 4.10 — Press & media outreach
Pitch stories to Swiss media (Le Temps, Tribune de Genève, RTS) and industry publications (No Film School, Filmmaker Magazine).

---

## Priority 5: UX Enhancements (When Ready)

### 5.1 — Add showreel lightbox
Hero CTA says "Watch Reel" but scrolls to project grid. A 30-60 second highlight montage in a cinematic modal would be the highest-impact conversion feature for a filmmaker portfolio.

### 5.2 — Add poster/thumbnail images to video cards
On mobile and slow connections, cards are dark rectangles until Vimeo loads. Static poster images provide instant visual feedback.

### 5.3 — Add scroll indicators to services carousel
Mobile horizontal scroll has no visual indicator of card count or position. Add pagination dots or progress bar.

### 5.4 — Show footer nav links on mobile
Currently `hidden sm:flex` — mobile users who scroll to bottom have no navigation.

### 5.5 — Budget field → dropdown select
Free-text budget input creates friction. Replace with ranges: "CHF 5-10K", "CHF 10-25K", "CHF 25K+", "Let's discuss".

### 5.6 — Add social proof near contact form
"Trusted by Adidas, Nike, Cartier..." line near the form reinforces credibility at the decision point.

### 5.7 — Add testimonial pause control
Auto-rotating testimonials violate WCAG 2.2.2 without a pause button.

### 5.8 — Make language switcher visible on mobile
Currently hidden — user must open hamburger menu to switch language.

---

## Expected Score Improvements

If Priorities 1-3 are implemented:

| Category | Current | Projected |
|---|---|---|
| Technical SEO | 72 | **85-90** |
| Content & E-E-A-T | 68 | **75-80** |
| AI Crawler Access | 82 | **90-95** |
| AI Platform Readiness | 39 | **55-65** |
| Schema Markup | 35 | **75-80** |
| AI Citability | 29 | **45-55** |
| Brand Authority | 18 | **20-25** |
| **Composite GEO Score** | **49** | **65-72** |

If Priorities 4-5 are also completed (3-6 months):

| Category | Projected |
|---|---|
| AI Citability | **60-70** |
| Brand Authority | **40-50** |
| **Composite GEO Score** | **75-82** |

---

## Files Modified During This Session

| File | Change |
|---|---|
| `index.html` | Fixed broken CTA HTML, i18n SVG fix on 8 elements, passive scroll listener, Tailwind duration-400 config |
| `fr/index.html` | Same fixes mirrored |
| `llms.txt` | Added Key Facts section, full absolute URLs for social links |

## Reports Generated

| File | Contents |
|---|---|
| `GEO-CITABILITY-SCORE.md` | AI citability analysis with per-section scores and rewrite suggestions |
| `GEO-CRAWLER-ACCESS.md` | AI crawler access map with recommended robots.txt |
| `GEO-BRAND-MENTIONS.md` | Brand authority report across YouTube, Reddit, Wikipedia, LinkedIn |
| `SITE-UPGRADE-PLAN.md` | This master plan |
