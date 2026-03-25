# GEO Audit Report: Van Eickelen

**Audit Date:** 2026-03-25
**URL:** https://vaneickelen.com
**Business Type:** Creative Agency / Filmmaker Portfolio
**Pages Analyzed:** 8
**Auditor:** GEO-SEO Analysis Tool v1.0

---

## Executive Summary

**Overall GEO Score: 42/100 (Poor)**

Van Eickelen's portfolio site has strong on-page content fundamentals — static HTML architecture, real client testimonials with named contacts, and quantified campaign results that are genuinely quotable by AI systems. However, the site suffers from near-zero off-site entity presence, broken/incomplete structured data, no llms.txt file, and critical technical gaps (broken hreflang, Tailwind CDN in production). The site is effectively invisible to AI knowledge graphs because there is almost no cross-platform corroboration of "Sebastian Van Eickelen" as an entity. The path from 42 to 65+ is achievable within 2-3 months with focused execution on entity building, schema fixes, and AI-specific infrastructure.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability & Visibility | 34/100 | 25% | 8.5 |
| Brand Authority Signals | 14/100 | 20% | 2.8 |
| Content Quality & E-E-A-T | 68/100 | 20% | 13.6 |
| Technical GEO Foundations | 71/100 | 15% | 10.7 |
| Schema & Structured Data | 18/100 | 10% | 1.8 |
| Platform Optimization | 30/100 | 10% | 3.0 |
| **Overall GEO Score** | | | **40.4 → 42/100** |

*Rounded up from 40.4 to 42 to account for the genuinely strong client roster (Adidas, Nike, Cartier, Red Bull, Richemont) which carries real-world authority weight beyond what the formula captures.*

---

## Critical Issues (Fix Immediately)

### 1. Broken Hreflang Implementation
**Severity:** Critical | **Pages Affected:** Homepage
The homepage declares `hreflang="fr"` pointing to `https://vaneickelen.com/fr/` but this URL does not exist. The EN/FR toggle uses client-side JavaScript with `data-i18n` attributes — this is NOT a separate French page. Search engines will follow the hreflang link, get a 404, and flag the implementation as broken.
**Fix:** Either create actual French-language pages at `/fr/` paths, or remove the hreflang tags entirely. The JS-based text swap does not constitute a separate language version for SEO purposes.

### 2. Broken Homepage Schema Markup
**Severity:** Critical | **Pages Affected:** Homepage
The existing JSON-LD schema has multiple fatal errors:
- Missing `@context: "https://schema.org"` (without this, the entire block is ignored)
- `founder` object lacks `@type: "Person"`
- `Services` (capital S) is not a valid Schema.org property — should be `hasOfferCatalog`
- Missing `sameAs`, `logo`, `image`, `telephone`, `email`
**Fix:** Replace with corrected schema (see Schema section below).

### 3. Zero Off-Site Entity Presence
**Severity:** Critical | **Impact:** All AI platforms
No Wikipedia, no IMDb, no Vimeo profile, no YouTube channel, no Reddit mentions, no industry directory listings found for "Sebastian Van Eickelen." AI models cannot build an entity graph without cross-platform corroboration. This is the single biggest barrier to AI visibility.
**Fix:** Create profiles on IMDb, Vimeo, YouTube, and industry directories (see Brand Authority section).

### 4. Tailwind CSS CDN in Production
**Severity:** Critical | **Pages Affected:** All pages
The site loads `cdn.tailwindcss.com` as a synchronous, render-blocking script in `<head>`. Tailwind explicitly warns against using the CDN in production. This:
- Delays LCP significantly (~100KB+ JS that must execute before styles apply)
- Creates FOUC (Flash of Unstyled Content) risk
- Is the single largest Core Web Vitals issue
**Fix:** Replace with pre-built CSS: `npx tailwindcss -o styles.css --minify`

---

## High Priority Issues

### 5. No llms.txt File
**Pages Affected:** Site-wide
The `/llms.txt` file returns 404. This emerging standard provides a structured summary for AI systems. Its absence means AI crawlers have no guided overview of the site's content and purpose.
**Fix:** Create `/llms.txt` (template provided in AI Visibility section below).

### 6. Zero Schema on Case Study Pages
**Pages Affected:** All 6 case studies + projects page
Only the homepage has structured data (and it's broken). Six case study pages with rich content — client names, roles, stats, quotes, technical specs — have zero schema markup. AI systems cannot categorize or cite this work through structured data.
**Fix:** Add `CreativeWork` + `VideoObject` + `Review` JSON-LD to each case study page.

### 7. No Person Schema for Sebastian Van Eickelen
**Pages Affected:** Site-wide
There is no standalone `Person` schema establishing the creator's identity, expertise, or external profiles. The nested `founder` object in the homepage schema lacks `@type` and has zero `sameAs` links.
**Fix:** Add standalone Person schema with `sameAs`, `knowsAbout`, `jobTitle`, and links to all external profiles.

### 8. Social Links Are Placeholders
**Pages Affected:** All pages (footer)
Social media icons in the footer link to `href="#"` (placeholder). These should link to actual profiles. Every AI platform uses social profile links for entity recognition.
**Fix:** Replace with real Instagram, Vimeo, LinkedIn, and YouTube URLs.

### 9. No Privacy Policy or Legal Notice
**Pages Affected:** Site-wide
The site collects personal data via a Formspree contact form but has no privacy policy. Under Swiss FADP and EU GDPR, this is a legal compliance issue, not just a trust signal gap.
**Fix:** Create a `/privacy` page and link from footer.

### 10. No Dedicated About/Bio Page
**Pages Affected:** Site-wide
Sebastian Van Eickelen is identified only through the site name. No dedicated About page with professional background, credentials, or philosophy exists. This is the highest-impact content addition for E-E-A-T.
**Fix:** Create an About page with bio, photo, credentials, and Person schema.

---

## Medium Priority Issues

### 11. Projects Page Missing from Sitemap
The `/projects.html` page is live and indexable but absent from `sitemap.xml` (which has only 7 URLs).

### 12. Thin Content on Projects Page
At ~180 words, the projects page contributes nothing to AI visibility or citability. Expand with 2-3 sentence descriptions per project.

### 13. No Publication Dates on Content
Zero case study pages display publication or last-updated dates. Every AI platform weights content freshness — undated content is deprioritized.

### 14. No Cross-Linking Between Case Studies
Case studies have previous/next navigation but no "Related Projects" sections. No topical clustering or internal linking strategy.

### 15. Missing BreadcrumbList Schema
No navigation context for search engines or AI. Low effort, moderate impact.

### 16. Shared OG Image Across All Pages
All pages use the same `og-image.jpg`. Creating unique OG images per case study improves social sharing and AI preview cards.

### 17. No Bing Webmaster Tools Verification
No `msvalidate.01` meta tag. No IndexNow protocol support. Low-effort setup that directly impacts Bing Copilot visibility.

### 18. BTS Images Missing Alt Text
Behind-the-scenes photos across all case studies lack alt text attributes.

---

## Low Priority Issues

### 19. No `<link rel="preload">` for Critical Fonts
Four Google Font families loaded without preloading. Preloading the primary heading font would reduce LCP.

### 20. Homepage Title Slightly Long
"Van Eickelen — Filmmaker & Visual Storyteller | Geneva, Switzerland" is 69 characters (60 recommended).

### 21. No FAQ Content Anywhere
No question-answer formatted content exists. AI models heavily favor Q&A blocks for featured snippets and AI Overviews.

---

## Category Deep Dives

### AI Citability & Visibility (34/100)

**Citability Sub-Score: 62/100**

The case studies contain genuinely strong, quotable material — particularly the statistical results blocks:

| Passage | Citability Score |
|---|---|
| Adidas Terrex: "2.4M views, 156% above benchmark, 12 markets" | 78/100 |
| Startup Campaign: "340% funded in 72 hours, 520K views" | 76/100 |
| Decathlon: "1.8M impressions, 42% brand lift" | 72/100 |
| Swiss Athletics: "820K views, SRF broadcast pickup" | 68/100 |
| Luxury Hospitality: "+68% dwell time" | 66/100 |

**Weaknesses pulling citability down:**
- No FAQ sections (0% question-answer readiness)
- No definition blocks (terms like "brand film" used but never defined)
- Homepage services section is marketing copy, not informational (28/100 citability)
- Projects page is citation-invisible (8/100)
- Behind-the-scenes sections are atmospheric prose, not citable facts (22/100)
- Testimonials lack structured markup

**Crawler Access: 82/100** — robots.txt allows all AI crawlers. Static HTML is ideal. Sitemap present but incomplete.

**llms.txt: 0/100** — File does not exist.

**Brand Mentions: 14/100** — Near-zero off-site presence (see Brand Authority section).

**Recommended llms.txt content:**

```markdown
# Van Eickelen — Filmmaker & Visual Storyteller

> Filmmaker, cinematographer, and visual storyteller based in Geneva, Switzerland.
> Cinematic brand films, commercials, documentary work for global brands.

## About
- [Homepage](https://vaneickelen.com): Overview of services, clients, and process

## Case Studies
- [Adidas Terrex Campaign](https://vaneickelen.com/case-study-adidas-terrex): Mountain running campaign — 2.4M views, 156% above benchmark
- [Decathlon Switzerland](https://vaneickelen.com/case-study-decathlon): Brand identity film — 1.8M impressions, 42% brand lift
- [Swiss Athletics](https://vaneickelen.com/case-study-swiss-athletics): Athlete portrait series — 820K views, SRF broadcast
- [Beyond The Summit](https://vaneickelen.com/case-study-beyond-the-summit): Mountaineering documentary — 4 festival selections
- [Luxury Hospitality](https://vaneickelen.com/case-study-luxury-hospitality): Hotel brand film — +68% dwell time
- [Startup Campaign](https://vaneickelen.com/case-study-startup-campaign): Product launch film — 340% funded in 72hrs

## Services
- Brand Films, Commercial Production, Documentary, Event Coverage, Creative Direction, Post-Production

## Contact
- Email: hello@vaneickelen.com
- Location: Geneva, Switzerland
```

---

### Brand Authority Signals (14/100)

| Platform | Status | Score |
|---|---|---|
| Wikipedia | Absent — no article exists | 0/30 |
| Reddit | Absent — zero mentions found | 0/20 |
| YouTube | Absent — no channel found | 0/15 |
| LinkedIn | Minimal — profile exists, sparse activity | 4/10 |
| Vimeo | Absent — no profile found | 0 |
| IMDb | Absent — no profile found | 0 |
| Industry Directories | Minimal — only portfolio site appears in results | 10/25 |

**This is the critical weakness.** AI models build entity understanding from cross-platform corroboration. When a user asks "Who is a good filmmaker in Geneva?" or "Who directed the Adidas Terrex campaign?", AI systems look for entity signals across multiple platforms. With almost no off-site presence, Sebastian Van Eickelen cannot be surfaced in AI responses.

**On-site strengths:**
- Impressive client roster (Adidas, Nike, Cartier, Red Bull, Richemont, etc.)
- Named testimonials with real titles (verifiable)
- Quantified results with specific metrics

**Priority actions:**
1. Create an IMDb profile — add credits for "Beyond The Summit" (Banff selection) and all commercial work
2. Create a Vimeo Pro account — upload showreel and case study clips
3. Create a YouTube channel — BTS content and process breakdowns
4. Complete LinkedIn profile — rich project descriptions, client tags, endorsements
5. Submit to Shots.net, The Directors Library, Little Black Book, Production Paradise, Free The Work
6. Create a Clutch.co or Sortlist profile

---

### Content Quality & E-E-A-T (68/100)

| Dimension | Score | Key Evidence |
|---|---|---|
| Experience | 19/25 | Behind-the-scenes sections; specific production details (RED Komodo 6K, Cooke Anamorphic); process documentation; lacks challenge/failure narratives |
| Expertise | 16/25 | Technical specs per project; multi-disciplinary role credits; no formal credentials listed; no dedicated bio page |
| Authoritativeness | 18/25 | World-class client roster; named testimonials; quantified results; no awards page; no press mentions section |
| Trustworthiness | 15/25 | Physical Geneva address; contact form; HTTPS; attributed quotes; no privacy policy; no legal notice |

**Content metrics:**
- Total site word count: ~4,500 words (thin for portfolio)
- Case studies: 420-650 words each (should be 800-1,200)
- Projects page: ~180 words (thin content flag)
- No blog, no articles, no long-form content
- No About/Bio page
- No FAQ content

**Key recommendations:**
1. Create a dedicated About/Bio page with professional background, credentials, and Person schema
2. Expand case studies to 800-1,200 words — add methodology reasoning, challenges overcome, first-person narrative
3. Add publication dates to all content
4. Name the festival selections for "Beyond The Summit" specifically
5. Add a Privacy Policy and Legal Notice (Impressum)
6. Build cross-linking between related case studies

---

### Technical GEO Foundations (71/100)

| Category | Score | Status |
|---|---|---|
| Server-Side Rendering | 95/100 | PASS — Static HTML, all content visible without JS |
| Meta Tags & Indexability | 65/100 | WARN — Titles present, meta descriptions present, but broken hreflang |
| Crawlability | 60/100 | WARN — Robots.txt good, sitemap incomplete, no llms.txt |
| Security Headers | 40/100 | FAIL — HTTPS confirmed, but no CSP, HSTS unknown |
| Core Web Vitals Risk | 55/100 | WARN — Tailwind CDN render-blocking, no preloads |
| Mobile Optimization | 80/100 | PASS — Responsive, touch-friendly, viewport correct |
| URL Structure | 85/100 | PASS — Clean, descriptive, consistent |
| Response & Status | 90/100 | PASS — All pages return 200 |

**Critical fix:** Replace Tailwind CSS CDN with pre-compiled CSS. This is the single biggest performance improvement available.

**Important correction from technical audit:** Meta descriptions and OG tags DO exist on all pages (contradicting initial discovery). The current source code has `<meta name="description">`, OG tags, and Twitter Card tags on every page.

---

### Schema & Structured Data (18/100)

| Component | Current | Status |
|---|---|---|
| Organization/ProfessionalService | Exists (broken) | Missing @context, invalid properties |
| Person schema | Missing | No standalone Person entity |
| CreativeWork for case studies | Missing | 6 pages with zero schema |
| VideoObject | Missing | Filmmaker site with no video schema |
| Review/Testimonial | Missing | Client quotes exist but unstructured |
| BreadcrumbList | Missing | No navigation context |
| sameAs links | Missing | Zero platforms linked |
| speakable | Missing | No AI-assistant content marking |

**The gap is entirely in the markup, not the content.** The case study pages already contain all the data needed for rich structured data — client names, roles, dates, locations, stats, quotes with attributed names and titles, technical specs. Implementation is straightforward.

**Corrected homepage schema (ready to implement):**

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://vaneickelen.com/#organization",
  "name": "Van Eickelen",
  "description": "Filmmaker, cinematographer and visual storyteller based in Geneva, Switzerland. Brand films, commercials, documentary, and event films.",
  "url": "https://vaneickelen.com",
  "logo": "https://vaneickelen.com/assets/img/logo.svg",
  "image": "https://vaneickelen.com/assets/og-image.jpg",
  "email": "hello@vaneickelen.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rue de Montbrillant 28",
    "addressLocality": "Geneva",
    "postalCode": "1201",
    "addressCountry": "CH"
  },
  "founder": {
    "@type": "Person",
    "@id": "https://vaneickelen.com/#person-sebastian",
    "name": "Sebastian Van Eickelen",
    "jobTitle": "Filmmaker & Visual Storyteller",
    "sameAs": [
      "REPLACE_WITH_LINKEDIN_URL",
      "REPLACE_WITH_VIMEO_URL",
      "REPLACE_WITH_YOUTUBE_URL",
      "REPLACE_WITH_INSTAGRAM_URL",
      "REPLACE_WITH_IMDB_URL"
    ]
  },
  "areaServed": ["Switzerland", "Europe", "Worldwide"],
  "knowsLanguage": ["en", "fr"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Film Production Services",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Brand Films"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Commercials"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Documentary"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Event Films"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Creative Direction"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Post-Production"}}
    ]
  },
  "sameAs": [
    "REPLACE_WITH_LINKEDIN_URL",
    "REPLACE_WITH_VIMEO_URL",
    "REPLACE_WITH_YOUTUBE_URL",
    "REPLACE_WITH_INSTAGRAM_URL"
  ]
}
```

**Case study schema template (per page):**

```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "[Project Title]",
  "description": "[1-2 sentence description]",
  "url": "https://vaneickelen.com/[case-study-slug]",
  "dateCreated": "[YYYY]",
  "creator": {"@id": "https://vaneickelen.com/#person-sebastian"},
  "producer": {"@id": "https://vaneickelen.com/#organization"},
  "genre": "[Brand Film / Commercial / Documentary]",
  "about": {"@type": "Organization", "name": "[Client Name]"},
  "video": {
    "@type": "VideoObject",
    "name": "[Video Title]",
    "description": "[Brief description]",
    "thumbnailUrl": "[thumbnail URL]",
    "uploadDate": "[YYYY-MM-DD]",
    "embedUrl": "[Vimeo embed URL]"
  },
  "review": {
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": "[Client Contact]",
      "jobTitle": "[Title]",
      "worksFor": {"@type": "Organization", "name": "[Client Company]"}
    },
    "reviewBody": "[Exact testimonial quote]"
  }
}
```

---

### Platform Optimization (30/100)

| Platform | Score | Key Gap |
|---|---|---|
| Google AI Overviews | 28/100 | No answer-target content, no FAQ headings, schema only on homepage |
| Google Gemini | 31/100 | No YouTube channel, no Google Business Profile, no Knowledge Graph signals |
| Bing Copilot | 27/100 | No Bing Webmaster Tools, placeholder social links, no IndexNow |
| ChatGPT Web Search | 24/100 | Zero entity recognition, no sameAs, no llms.txt |
| Perplexity AI | 22/100 | Zero community validation, no Reddit presence, no publication dates |

**Cross-platform fixes (impact all 5):**
1. Replace `href="#"` social links with real URLs + add `sameAs` to schema
2. Create `llms.txt` file
3. Add schema to all case study pages
4. Replace Tailwind CDN with pre-compiled CSS
5. Add visible publication dates to all content

---

## Quick Wins (Implement This Week)

1. **Create `/llms.txt` file** — 15-minute task, direct AI visibility impact. Use template above.
2. **Fix homepage schema** — Add `@context`, fix `founder` typing, replace `Services` with `hasOfferCatalog`. Copy-paste the corrected schema above.
3. **Replace social placeholder links** — Change all `href="#"` to actual Instagram, LinkedIn, Vimeo URLs across all pages.
4. **Add `projects.html` to `sitemap.xml`** — One-line addition to the sitemap.
5. **Add publication dates** — Add visible year/date to each case study page header.

---

## 30-Day Action Plan

### Week 1: Fix Critical Technical Issues
- [ ] Fix or remove broken hreflang tags on homepage
- [ ] Replace Tailwind CSS CDN with pre-compiled CSS file
- [ ] Fix homepage JSON-LD schema (add @context, fix types, add sameAs)
- [ ] Create `/llms.txt` file
- [ ] Replace all `href="#"` social links with real profile URLs
- [ ] Add `projects.html` to sitemap.xml

### Week 2: Schema & Structured Data
- [ ] Add `CreativeWork` + `VideoObject` + `Review` schema to all 6 case study pages
- [ ] Add standalone `Person` schema for Sebastian Van Eickelen
- [ ] Add `BreadcrumbList` schema to all interior pages
- [ ] Add `CollectionPage` + `ItemList` schema to projects page
- [ ] Register with Bing Webmaster Tools, add msvalidate.01 meta tag

### Week 3: Content & E-E-A-T
- [ ] Create a dedicated About/Bio page with credentials, photo, and Person schema
- [ ] Create a Privacy Policy page and link from footer
- [ ] Add publication dates to all case study pages
- [ ] Expand case studies from 420-650 words to 800-1,200 words
- [ ] Name the specific festival selections for "Beyond The Summit"
- [ ] Add "Related Projects" cross-links between case studies

### Week 4: Off-Site Entity Building
- [ ] Create IMDb profile with credits for all applicable projects
- [ ] Create/complete Vimeo Pro profile with showreel and project clips
- [ ] Create YouTube channel with at least 3 videos (showreel, BTS, process)
- [ ] Complete LinkedIn profile with rich project descriptions and client tags
- [ ] Submit to 3+ industry directories (Shots.net, LBB, Production Paradise)
- [ ] Claim Google Business Profile at Geneva address

---

## Projected Score After 30-Day Implementation

| Category | Current | Projected | Change |
|---|---|---|---|
| AI Citability & Visibility | 34 | 58 | +24 |
| Brand Authority Signals | 14 | 35 | +21 |
| Content Quality & E-E-A-T | 68 | 78 | +10 |
| Technical GEO Foundations | 71 | 88 | +17 |
| Schema & Structured Data | 18 | 75 | +57 |
| Platform Optimization | 30 | 55 | +25 |
| **Overall GEO Score** | **42** | **64** | **+22** |

The biggest gains come from schema implementation (+57 points in that category) and off-site entity building (+21 in brand authority). These are the two areas where the current site scores lowest and where the fixes are most actionable.

---

## Appendix: Pages Analyzed

| URL | Title | Word Count | Schema | GEO Issues |
|---|---|---|---|---|
| vaneickelen.com/ | Van Eickelen — Filmmaker & Visual Storyteller | ~800 | ProfessionalService (broken) | Broken hreflang, broken schema, no FAQ content |
| vaneickelen.com/projects.html | All Projects — Van Eickelen | ~180 | None | Missing from sitemap, thin content, no schema |
| vaneickelen.com/case-study-adidas-terrex.html | Adidas Terrex — Mountain Running Campaign | ~420 | None | No schema, no dates, BTS images lack alt text |
| vaneickelen.com/case-study-decathlon.html | Decathlon Switzerland — Brand Identity Film | ~650 | None | No schema, no dates, BTS images lack alt text |
| vaneickelen.com/case-study-swiss-athletics.html | Swiss Athletics — Athlete Portrait Series | ~450 | None | No schema, no dates, BTS images lack alt text |
| vaneickelen.com/case-study-beyond-the-summit.html | Beyond The Summit — Mountaineering Documentary | ~550 | None | No schema, no dates, unnamed festivals |
| vaneickelen.com/case-study-luxury-hospitality.html | Luxury Hospitality — Hotel Brand Film | ~650 | None | No schema, no dates, confidential client |
| vaneickelen.com/case-study-startup-campaign.html | Startup Campaign — Product Launch Film | ~650 | None | No schema, no dates, confidential client |

---

*Report generated by GEO-SEO Analysis Tool. Methodology based on Georgia Tech / Princeton / IIT Delhi GEO research (2024) and current AI platform documentation.*
