# AI Crawler Access Report: vaneickelen.com

**Analysis Date:** 2026-03-26
**Domain:** vaneickelen.com
**robots.txt Status:** Found

---

## Current robots.txt

```
User-agent: *
Allow: /

Disallow: /.git/
Disallow: /.github/

Sitemap: https://vaneickelen.com/sitemap.xml
```

---

## Crawler Access Summary

| Crawler | Operator | Tier | Status | Impact |
|---|---|---|---|---|
| GPTBot | OpenAI | 1 | **Allowed** (wildcard) | Content accessible to ChatGPT Search |
| OAI-SearchBot | OpenAI | 1 | **Allowed** (wildcard) | Content appears in ChatGPT search results |
| ChatGPT-User | OpenAI | 1 | **Allowed** (wildcard) | Users can ask ChatGPT to browse your pages |
| ClaudeBot | Anthropic | 1 | **Allowed** (wildcard) | Content accessible to Claude web search |
| PerplexityBot | Perplexity | 1 | **Allowed** (wildcard) | Content appears in Perplexity results |
| Google-Extended | Google | 2 | **Allowed** (wildcard) | Content available for Gemini/AI Overviews training |
| GoogleOther | Google | 2 | **Allowed** (wildcard) | Content available for Google AI research |
| Applebot-Extended | Apple | 2 | **Allowed** (wildcard) | Content available for Apple Intelligence |
| Amazonbot | Amazon | 2 | **Allowed** (wildcard) | Content available for Alexa answers |
| FacebookBot | Meta | 2 | **Allowed** (wildcard) | Content available for Meta AI |
| CCBot | Common Crawl | 3 | **Allowed** (wildcard) | Content included in Common Crawl dataset |
| anthropic-ai | Anthropic | 3 | **Allowed** (wildcard) | Content available for Claude training |
| Bytespider | ByteDance | 3 | **Allowed** (wildcard) | Content available for ByteDance AI (consider blocking) |
| cohere-ai | Cohere | 3 | **Allowed** (wildcard) | Content available for Cohere training |

## AI Visibility Score: 82/100

**Tier 1 Access:** 5/5 crawlers allowed
**Tier 2 Access:** 5/5 crawlers allowed
**Tier 3 Access:** 4/4 crawlers allowed

### Score Breakdown

| Component | Weight | Score | Weighted |
|---|---|---|---|
| Tier 1 Crawlers Allowed (5/5) | 50% | 100 | 50 |
| Tier 2 Crawlers Allowed (5/5) | 25% | 100 | 25 |
| No Blanket AI Blocks | 15% | 100 | 15 |
| AI-Specific Files Present | 10% | 0 | 0 |
| **Total** | | | **82/100** |

*Lost 10 points: no llms.txt file, no ai.txt file. Sitemap is present and accessible (-0 penalty).*

---

## Critical Issues

**None.** All Tier 1 and Tier 2 AI crawlers have access. This is a strong foundation.

---

## Recommendations

### Immediate Actions

1. **Create `/llms.txt`** — This file helps AI systems understand your site structure. Currently missing. Would add +5 points to the AI Visibility Score.

2. **Add explicit AI crawler directives to robots.txt** — While the wildcard `Allow: /` works, explicit directives signal intentional AI-friendliness and give you granular control.

3. **Block Bytespider** — Aggressive crawler with minimal benefit for Western-market businesses. No impact on AI search visibility.

4. **Add `<meta name="robots" content="index, follow">` to all pages** — Currently only on the homepage. Verify all 16 sitemap pages have this.

### Recommended robots.txt

```
# Standard crawlers
User-agent: *
Allow: /
Disallow: /.git/
Disallow: /.github/

# AI Search Crawlers - Explicitly Allowed
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: FacebookBot
Allow: /

# Blocked - aggressive/low value
User-agent: Bytespider
Disallow: /

Sitemap: https://vaneickelen.com/sitemap.xml
```

### Additional Technical Findings

- **Meta Robots Tags:** `index, follow` present on homepage. No `noai` or `noimageai` tags. Good.
- **X-Robots-Tag Headers:** None detected. No issues.
- **JavaScript Rendering:** Static HTML site — content fully accessible without JS execution. Excellent for AI crawlers.
- **llms.txt:** Absent. Should be created.
- **ai.txt:** Absent. Optional but emerging standard.
- **Sitemap:** Present at `/sitemap.xml` with 16 URLs (8 EN + 8 FR). All with hreflang alternates. Well-structured.
- **Structured Data:** JSON-LD schema present on homepage (ProfessionalService + Person). Helps AI entity recognition.
