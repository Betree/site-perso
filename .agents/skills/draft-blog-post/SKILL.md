---
name: draft-blog-post
description: Drafts new blog posts for this personal website through discovery questions, scope confirmation, and online research to challenge the narrative. Use when the user wants to write, draft, or outline a blog post, article, or essay for src/content/blog/.
---

# Draft Blog Post

## Workflow

Copy this checklist and track progress:

```
Task Progress:
- [ ] Phase 1: Discovery (ask questions, do not draft yet)
- [ ] Phase 2: Scope confirmation (get explicit approval)
- [ ] Phase 3: Research (search online for counter-perspectives)
- [ ] Phase 4: Outline (share structure before full draft)
- [ ] Phase 5: Draft (write the post)
- [ ] Phase 6: File setup (frontmatter, slug folder, images)
```

**Do not skip Phase 1–3.** The goal is a richer, more honest post - not a fast first draft.

---

## Phase 1: Discovery

Ask questions to clarify and enrich the story. Use `AskQuestion` when available; otherwise ask conversationally. Adapt to the topic - not every question applies.

### Core questions (always ask)

1. **Thesis** - What is the one argument or takeaway? What should the reader believe or do differently after reading?
2. **Origin** - What prompted this post? (a user question, a project lesson, a news event, a debate?)
3. **Audience** - Who is this for? (developers, civic-tech peers, general public, French vs English readers?)
4. **Language** - English, French, or bilingual? (Existing posts use both; match the audience.)
5. **CaptainFact angle** - Should this tie into [CaptainFact](https://captainfact.io)? How directly?

### Story enrichment (ask 3–5 that fit)

- What personal experience or concrete example anchors this?
- What misconception do you want to correct?
- What did you believe before, and what changed your mind?
- What is the strongest counter-argument to your position?
- What evidence, data, or sources do you already have?
- What should readers *not* conclude from this post?
- Is this a tutorial (how-to) or an essay (why/what)?

### Boundaries (always ask)

- Topics, names, or claims to **include**
- Topics, names, or claims to **exclude** (competitors, unfinished work, legal sensitivity, etc.)
- Desired length (short opinion piece vs long-form)

Summarize your understanding back to the user before moving on.

---

## Phase 2: Scope confirmation

Present a short brief and get explicit approval:

```markdown
## Post brief

**Working title:** …
**Language:** …
**Category:** civic-tech | elixir | (other)
**Type:** essay | tutorial | announcement
**Thesis:** …
**Include:** …
**Exclude:** …
**CaptainFact tie-in:** yes/no - …
**Target length:** …
```

Ask: *"Does this brief look right? Anything to add, cut, or change before I research and outline?"*

Wait for confirmation before Phase 3.

---

## Phase 3: Research - challenge the narrative

Use `WebSearch` (and `WebFetch` for key sources) to find perspectives that **challenge or complicate** the planned thesis. Do not only gather supporting evidence.

Search for:

1. **Counter-arguments** - critics, skeptics, failed attempts at similar ideas
2. **Alternative framings** - how others describe the same problem
3. **Recent developments** - news, papers, or posts since the user's last thinking on the topic
4. **Primary sources** - official docs, studies, methodology pages (not just opinion pieces)

Present findings as:

```markdown
## Research findings

### Supports the narrative
- …

### Challenges or complicates it
- …

### Gaps / open questions
- …

### Recommended response in the post
- Acknowledge: …
- Push back on: …
- Omit (per scope): …
```

If research significantly changes the thesis, return to Phase 2 for re-confirmation.

---

## Phase 4: Outline

Share a section-by-section outline before writing the full draft:

```markdown
## Outline

### [Section title]
- Key point
- Evidence / example
- Link or source to cite

…
```

Get approval or iterate before Phase 5.

---

## Phase 5: Draft

Write the post following the style guidelines below. Save to:

```
src/content/blog/<slug>/index.md
```

Co-locate images in the same folder. Reference them by filename (e.g. `![Alt text](banner.jpeg)`).

### Frontmatter template

```yaml
---
title: "…"
description: "…"
pubDate: YYYY-MM-DD
category: civic-tech
draft: true
---
```

- `description`: one sentence - often a question or sharp thesis (see existing posts).
- `category`: use `civic-tech` or `elixir` when applicable; propose a new slug only if needed.
- Set `draft: true` until the user approves for publication.

### Republished posts

If cross-posted from Medium elsewhere, add after frontmatter:

```markdown
**This article was first posted on [Medium](https://medium.com/…)**.

-------------------------------------------------

<br/>
```

---

## Style guidelines

Derived from existing posts in `src/content/blog/`. Match this voice.

### Tone and voice

- **Direct and opinionated, but reasoned.** Take a position; support it with evidence. Acknowledge nuance without hedging every sentence.
- **Flowing prose over staccato cuts.** Prefer compound sentences with conjunctions (*but*, *and*, *yet*) over short parallel sentences that repeat the same structure. Instead of *"The shift did not come from reading a paper. It came from using the web."* write *"The shift did not come from reading a paper, but from using the web."*
- **Conversational authority.** Write like a practitioner explaining something they care about rather than a press release or academic paper.
- **First person when personal.** Use "I" for personal views, "we" for CaptainFact, Open Collective or collective work.
- **Rhetorical questions** to frame sections and pull the reader in (*"But can we rely on a single, centralized media…?"*). Avoid fragment questions followed by a punchy answer - the same staccato cut as above. Instead of *"And the people it was meant to stop? They were never really stopped."* write *"The people it was meant to stop were never really stopped."*
- **Accessible language.** Explain jargon on first use; link to Wikipedia or primary sources for concepts like *confirmation bias* or *filter bubbles*.

### Structure

- **Hook in the opening paragraph** - a recurring question, a trend, or a concrete situation.
- **Bold thesis statements** inline and as short standalone paragraphs:

  > **Truth, especially in politics, cannot rely only on a central authority.**

- **Section headings (`##`)** that advance the argument, not generic labels ("Introduction", "Conclusion").
- **Close with purpose** - a call to action, an open question, or a punchy final line. Tech tutorials can end with open-source links.

### Evidence and links

- **Cite generously** - inline links to studies, methodology pages, news articles, and primary sources.
- **Name specific examples** rather than vague "some platforms".
- **Quote primary sources** with blockquotes when the exact wording matters.

### Formatting habits

- `**bold**` for key claims and emphasis
- `*italics*` for project names and terms in running text (*CaptainFact*, *Le Monde*)
- No Em dashes (—), use -.
- Use ';' when it makes sense to separate sentences.

### French posts

- Use inclusive typography where appropriate: `intervenant·e·s`, `un·e`
- Same argumentative structure as English posts

### Tech / tutorial posts

- State the **problem and constraints** up front (privacy, performance, scale).
- Credit prior art and note its **flaws** honestly before presenting your approach.
- Include runnable code blocks with file paths in prose (`lib/my_app_web/presence.ex`).
- End with a practical result screenshot and, when relevant, link to open-source repos.

### What to avoid

- Corporate marketing tone ("We're excited to announce…")
- Walls of bullet points without narrative connective tissue
- Unsupported superlatives ("best", "revolutionary")
- Burying the thesis - state it early, defend it in the body
- One-sided research - if Phase 3 found strong counter-arguments, address them

---

## Phase 6: File setup

1. Choose a **slug** - lowercase, hyphenated and simple (e.g "Why-we-should-have-a-better-web" => `better-web`).
2. Create `src/content/blog/<slug>/index.md`.
3. Note any images the user must provide (banner, screenshots).
4. Leave `draft: true` unless told otherwise.

---

## Examples

**Discovery → brief:** User says "I want to write about credibility scores." Ask whether the angle is PolitiFact-style aggregation, CaptainFact user requests, or something new. Confirm French vs English. Exclude or include specific politicians/platforms.

**Research → narrative challenge:** For a post arguing against credibility scores, search for PolitiFact methodology defenders, academic work on aggregate truth ratings, and media-literacy advocates who support simple heuristics. Weave the strongest objection into the post, then explain why the thesis still holds.

**Style match:** Open with a concrete hook tied to CaptainFact, build through 3–4 argument sections with bold thesis lines, close with what the reader should take away - not a summary of what was already said.
