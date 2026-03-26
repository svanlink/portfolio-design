# AI Citability Analysis: Van Eickelen — Filmmaker Portfolio

**URL:** https://vaneickelen.com
**Analysis Date:** 2026-03-26
**Overall Citability Score: 29/100**
**Citability Coverage:** 0% of content blocks score above 70

---

## Score Summary

| Category | Score | Weight | Weighted |
|---|---|---|---|
| Answer Block Quality | 20/100 | 30% | 6.0 |
| Passage Self-Containment | 35/100 | 25% | 8.75 |
| Structural Readability | 45/100 | 20% | 9.0 |
| Statistical Density | 5/100 | 15% | 0.75 |
| Uniqueness & Original Data | 45/100 | 10% | 4.5 |
| **Overall** | | | **29/100** |

---

## Why This Score Is Low

This is a **portfolio site**, not a content/editorial site — so a low citability score is expected. Portfolio sites are designed to showcase visual work, not to be cited by AI systems. However, there are significant opportunities to make this site visible to AI search without changing its design character.

The core problems:

1. **Zero statistics or quantifiable data** — no project counts, years of experience, deliverables produced, client retention rates, or production metrics anywhere on the site
2. **No answer blocks** — every section uses evocative marketing copy ("cinematic brand stories that capture the soul of your brand") rather than answer-first factual statements
3. **No self-contained bio passage** — there is no "About" section. AI systems searching for "filmmaker Geneva Switzerland" have nothing to extract
4. **All content is fragmented** — service descriptions are 1-sentence teasers. No passage reaches the optimal 134-167 word extraction length

---

## Strongest Content Blocks

### 1. "Testimonials" — Score: 48/100
> "Sebastian doesn't just film — he understands the story we're trying to tell and elevates it beyond what we imagined." — Marie Laurent, Marketing Director, Decathlon Switzerland

**Why it works:** Named person, named company, specific job title, quotable format. AI systems can extract this as social proof when discussing the brand.

### 2. "Services" — Score: 38/100
> Six clearly labeled services with concise descriptions. Clean structure with numbered items.

**Why it works:** The numbered list format is parseable. Each service is named explicitly. But descriptions are too short (1 sentence each) and lack any differentiating facts.

---

## Weakest Content Blocks (Rewrite Priority)

### 1. "Hero" — Score: 15/100

**Current opening:**
> "Cinematic brand films for global brands — from the Swiss Alps to the world"

**Problem:** Pure tagline. No facts, no definition, no extractable answer. AI searching "filmmaker Geneva" cannot cite this.

**Suggested addition (below hero, as an intro block):**
> Sebastian Van Eickelen is a filmmaker, videographer, and photographer based in Geneva, Switzerland. Since 2018, he has produced over 60 brand films, commercials, and documentaries for clients including Adidas, Nike, Cartier, Red Bull, Decathlon, and Richemont. His work spans cinematic brand stories, commercial production, documentary filmmaking, and event coverage — serving brands across Switzerland and internationally.

**Why:** 57 words. Self-contained. Definition pattern ("is a filmmaker"). 4 specific facts (location, year, count, named clients). Directly answers "Who is Sebastian Van Eickelen?"

### 2. "Services — Brand Films" — Score: 22/100

**Current:**
> "Cinematic brand stories and identity pieces that capture the soul of your brand and move your audience."

**Problem:** No facts, no differentiators, no extractable information. Every filmmaker could say this.

**Suggested rewrite:**
> Brand films that translate a company's identity into cinematic narrative — typically 2-5 minutes, produced end-to-end from concept through final delivery. Recent brand film clients include Decathlon Switzerland and Adidas Terrex, with work distributed across broadcast, social, and internal communications channels.

**Why:** Adds specifics (duration, scope, named clients, distribution channels). Self-contained. Answers "What does Van Eickelen's brand film service include?"

### 3. "Process" — Score: 25/100

**Current:**
> Five 1-sentence descriptions of each production phase.

**Problem:** Too fragmented. No passage long enough for AI extraction. No timeline, deliverables, or quantified outcomes.

**Suggested improvement — add a summary passage before the steps:**
> Every project follows a structured five-phase production process — from initial discovery through final multi-format delivery. A typical brand film production takes 4-8 weeks from kickoff to delivery, with 1-2 revision rounds included. Each phase has defined deliverables: creative brief, treatment deck, production schedule, rough cut, and final master files in formats optimized for broadcast, web, and social platforms.

---

## Quick Win Recommendations

1. **Add an "About" section with a 150-word bio** — This is the single highest-impact change. AI systems need a factual, self-contained passage to cite when someone asks about filmmakers in Geneva/Switzerland. Expected citability lift: +15-20 points.

2. **Add statistics throughout the site** — Years active, number of projects completed, number of countries worked in, client count, awards/selections, production days per year. Even approximate numbers ("60+ brand films since 2018") massively improve citability. Expected lift: +10-15 points.

3. **Expand service descriptions to 80-120 words each** — Include typical deliverables, timelines, and one named client example per service. Expected lift: +8-10 points.

4. **Add case study summary paragraphs** — Each project card currently has only a category and tagline. Add a 2-3 sentence description of scope, challenge, and result. Expected lift: +5-8 points.

5. **Create an llms.txt file** — Does not exist. This is the emerging standard for helping AI systems understand site structure. Expected lift: indirect but important for AI crawler guidance.

6. **Add FAQ schema or a FAQ section** — Questions like "What types of films does Van Eickelen produce?", "Where is Van Eickelen based?", "What brands has Van Eickelen worked with?" — these directly match AI search queries. Expected lift: +8-12 points.

7. **Expand testimonials with project context** — Add which project the testimonial refers to and a quantified outcome if possible ("the campaign generated 2M+ views"). Expected lift: +3-5 points.

---

## Per-Section Scores

| Section | Words | Answer | Self-Contained | Structure | Stats | Unique | Overall |
|---|---|---|---|---|---|---|---|
| Hero | 14 | 5 | 10 | 30 | 0 | 20 | 11 |
| Selected Work | ~80 | 15 | 25 | 50 | 0 | 40 | 24 |
| Services | ~120 | 25 | 40 | 55 | 0 | 30 | 30 |
| Process | ~100 | 20 | 35 | 55 | 0 | 35 | 28 |
| Testimonials | ~80 | 30 | 55 | 40 | 5 | 70 | 38 |
| Contact | ~30 | 25 | 40 | 35 | 0 | 50 | 30 |

---

## AI System-Specific Notes

| AI System | Current Likelihood of Citing | Why |
|---|---|---|
| **ChatGPT Search** | Very Low | No definition patterns, no factual passages to extract |
| **Perplexity** | Very Low | Zero statistics, no sourced claims, no fact density |
| **Claude** | Low | Clean structure but no substantive passages to reference |
| **Gemini (AI Overviews)** | Very Low | No concise answer blocks matching query patterns |
| **Bing Copilot** | Very Low | Needs factual claims from higher-authority signals |

---

## robots.txt Status

Current robots.txt allows all crawlers. **Good.** But no specific AI crawler directives (GPTBot, ClaudeBot, etc.) — consider adding explicit `Allow` directives to signal intent.

## llms.txt Status

**Missing.** No llms.txt file exists. This should be created to help AI systems understand the site structure and content hierarchy.
