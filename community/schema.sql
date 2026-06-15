-- ============================================================================
-- APZ Guides — Community buy-order system: database schema (PROPOSAL / SKELETON)
-- ============================================================================
-- Status: NOT DEPLOYED. This is a proposal skeleton (see plan 003). The
-- maintainer signs off on the backend choice before any of this runs.
--
-- Written as plain PostgreSQL so it maps onto a managed Postgres BaaS
-- (Supabase recommended) but stays portable to Cloudflare D1 / Neon / plain
-- Postgres. Supabase-specific niceties (RLS, auth.uid()) are noted in comments
-- so they can be switched on without restructuring.
--
-- Design rules this schema enforces (from plan 003):
--   * Two SEPARATE signals: pro consensus vs community consensus, never merged.
--   * Real dedup: one active submission per (identity, character).
--   * is_pro is curated (set by the maintainer), never self-asserted.
--   * data.js consensus numbers are PLACEHOLDER — do NOT seed from them. Both
--     signals start empty and fill from real submissions.
-- ============================================================================

-- One row per voter. The (type, external_id) pair is the anti-multi-vote key.
create table if not exists identities (
    id            uuid primary key default gen_random_uuid(),
    type          text not null check (type in ('discord', 'ign')),
    external_id   text not null,              -- Discord user id, or normalised IGN
    display_name  text not null,
    is_pro        boolean not null default false,   -- curated by maintainer only
    pro_title     text,                       -- e.g. rank/role, nullable
    verified_at   timestamptz,                -- when promoted to pro
    created_at    timestamptz not null default now(),
    unique (type, external_id)
);

-- One voter's complete proposed buy order for one character. This IS the vote.
create table if not exists submissions (
    id            uuid primary key default gen_random_uuid(),
    character_id  text not null,              -- matches STRINOVA_DATA[].id
    identity_id   uuid not null references identities (id) on delete cascade,
    status        text not null default 'published'
                      check (status in ('published', 'flagged', 'removed')),
    is_pro        boolean not null default false,   -- snapshot of identity.is_pro at submit time
    note          text,                       -- optional free text (sanitised on write)
    created_at    timestamptz not null default now()
);

-- Enforce "one active submission per identity per character" at the DB level.
-- Re-submitting means marking the old one removed and inserting a new published row.
create unique index if not exists submissions_one_active_per_identity_character
    on submissions (identity_id, character_id)
    where status = 'published';

create index if not exists submissions_character_published
    on submissions (character_id) where status = 'published';

-- Per-category choice within a submission.
create table if not exists submission_choices (
    submission_id uuid not null references submissions (id) on delete cascade,
    category      text not null,             -- e.g. "Critical Hit"
    choice        text not null check (choice in ('A', 'B')),
    buy_priority  integer not null,
    primary key (submission_id, category)
);

-- ----------------------------------------------------------------------------
-- Aggregation views. The front-end reads these; it never tallies raw votes.
-- ----------------------------------------------------------------------------

-- Community consensus: % choosing option A per character/category, all published.
create or replace view community_consensus as
select
    s.character_id,
    c.category,
    count(*)                                            as total_votes,
    round(100.0 * count(*) filter (where c.choice = 'A') / count(*)) as pct_a,
    round(100.0 * count(*) filter (where c.choice = 'B') / count(*)) as pct_b,
    mode() within group (order by c.buy_priority)       as buy_priority_mode
from submissions s
join submission_choices c on c.submission_id = s.id
where s.status = 'published'
group by s.character_id, c.category;

-- Pro consensus: same computation, restricted to verified-pro submissions.
-- When pro count is small the UI should show "Pro pick: X (N pros)" instead of a %.
create or replace view pro_consensus as
select
    s.character_id,
    c.category,
    count(*)                                            as pro_votes,
    round(100.0 * count(*) filter (where c.choice = 'A') / count(*)) as pct_a,
    round(100.0 * count(*) filter (where c.choice = 'B') / count(*)) as pct_b,
    mode() within group (order by c.buy_priority)       as buy_priority_mode
from submissions s
join submission_choices c on c.submission_id = s.id
where s.status = 'published' and s.is_pro = true
group by s.character_id, c.category;

-- ----------------------------------------------------------------------------
-- Supabase note (uncomment when deploying on Supabase):
--   alter table identities          enable row level security;
--   alter table submissions         enable row level security;
--   alter table submission_choices  enable row level security;
--   -- public read of aggregates; writes only via an edge function that has
--   -- validated the Discord OAuth token and computed is_pro server-side.
-- ----------------------------------------------------------------------------
