-- Community buy-order schema (skeleton, not deployed). Plain PostgreSQL, portable
-- to a managed BaaS like Supabase. Pro and Community are kept as separate signals.

create table if not exists identities (
    id            uuid primary key default gen_random_uuid(),
    type          text not null check (type in ('discord', 'ign')),
    external_id   text not null,              -- Discord user id, or normalised IGN
    display_name  text not null,
    is_pro        boolean not null default false,
    pro_title     text,
    verified_at   timestamptz,
    created_at    timestamptz not null default now(),
    unique (type, external_id)
);

create table if not exists submissions (
    id            uuid primary key default gen_random_uuid(),
    character_id  text not null,              -- matches STRINOVA_DATA[].id
    identity_id   uuid not null references identities (id) on delete cascade,
    status        text not null default 'published'
                      check (status in ('published', 'flagged', 'removed')),
    is_pro        boolean not null default false,
    note          text,
    created_at    timestamptz not null default now()
);

create unique index if not exists submissions_one_active_per_identity_character
    on submissions (identity_id, character_id)
    where status = 'published';

create index if not exists submissions_character_published
    on submissions (character_id) where status = 'published';

create table if not exists submission_choices (
    submission_id uuid not null references submissions (id) on delete cascade,
    category      text not null,
    choice        text not null check (choice in ('A', 'B')),
    buy_priority  integer not null,
    primary key (submission_id, category)
);

-- Aggregation views; the front-end reads these, never raw votes.

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

-- Supabase note (uncomment when deploying on Supabase): enable row level
-- security on the three tables, allow public read of the aggregate views, and
-- restrict writes to an edge function that validates auth and sets is_pro.
