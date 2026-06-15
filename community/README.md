# Community buy-order system — proposal skeleton

> **Status: proposal, not live.** Nothing in this folder runs against the site
> yet. It's a skeleton submitted for the maintainer to review and finalise — the
> backend, hosting, and presentation decisions are deliberately left open. None
> of these files are loaded by `index.html`, so merging this folder changes
> nothing a visitor sees until you wire it in (see *Enabling* below).

## What this is

APZ Guides today is a static, single-source-of-truth site: `data.js` holds one
curated, expert-verified buy order per character. This skeleton is the groundwork
for letting the community **propose their own buy orders** while keeping the
expert signal front and centre.

The load-bearing idea: **two separate signals, never merged.**

- **Pro Consensus** — computed only from verified high-elo players (curated by
  you). This is the default/primary view and preserves the site's identity.
- **Community Consensus** — open crowd input, clearly labelled and secondary.

## Files

| File | Purpose |
|------|---------|
| `schema.sql` | PostgreSQL schema (Supabase-flavoured, portable): identities, submissions, choices, + `pro_consensus` / `community_consensus` aggregation views. Not deployed. |
| `config.example.js` | Copy to `config.js`; the single swap point for backend choice + keys. Feature flag defaults **off**. |
| `community.js` | Browser client (not loaded yet): escaping helper, aggregate fetch, submit stub, and a `Community.enhanceModal()` entry point that no-ops unless enabled. |

## Decisions left to the maintainer

These are intentionally **not** baked in — change them without restructuring:

1. **Backend / hosting.** Recommended: keep the static front-end on GitHub Pages
   and add an external BaaS (Supabase free tier) alongside it. Swap via
   `config.js → backend`. A thin server tier is required regardless, because the
   Discord OAuth secret can't live in static JS and `is_pro`/consensus must be
   computed server-side. *(You pick the BaaS and own the account/keys.)*
2. **Identity.** Recommended: Discord OAuth for *counted* votes (stable unique id
   to dedupe on; fits the CreatorNova Discord), plus a hardcoded pro registry.
   IGN-only is the weaker fallback if you refuse any external backend.
3. **Presentation.** Pro leads either way; choose tabs vs side-by-side
   (`config.js → presentation`).
4. **Seed data.** The consensus numbers in `data.js` are treated as
   **placeholder, not a baseline** — both signals start empty and fill from real
   submissions. Only the character/pair *structure* is reused.

## Security (non-negotiable before any submission ships)

User-submitted display names and notes are untrusted. `community.js` escapes all
user-derived strings on render (`escapeHtml`); the backend must also sanitise on
write (length caps, allowed charsets, strip HTML) and compute `is_pro`/consensus
server-side. The existing `app.js` `innerHTML` paths are safe today only because
all data is author-controlled — hardening them is a prerequisite the moment any
field can contain user input.

## Phased delivery (each phase keeps the site working)

0. **(now)** Static curated `data.js`.
1. Stand up the backend; seed only character/pair *structure* (not consensus).
2. Render-hardening + read path: show an (empty) Community panel alongside the
   curated bars.
3. Discord OAuth + submission form → community consensus + reactive moderation.
4. Pro registry + "Pro Choices" highlighting (the headline feature).
5. *(spike-gated)* External stats/rank linking, only if a usable public API
   exists.

## Enabling (finalisation — one-line integration)

When you're ready, after the backend is up:

1. `cp community/config.example.js community/config.js` and fill in the backend.
2. In `index.html`, after the existing scripts:
   ```html
   <script src="community/config.js"></script>
   <script src="community/community.js"></script>
   ```
3. In `app.js`, at the end of `openCharacterDetails(char)`:
   ```js
   if (window.Community) Community.enhanceModal(char.id, modalDetailsBody);
   ```

With `config.js → enabled: false` (the default) all of the above stays a no-op,
so you can merge the wiring first and flip the switch when the backend is live.
