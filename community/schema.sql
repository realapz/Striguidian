-- Community voting schema. Run in the Supabase SQL Editor.
--
-- This deliberately never touches auth.users / auth.identities. Logins come
-- from the discord-auth Edge Function (see supabase/functions/discord-auth),
-- which does its own Discord OAuth code exchange with scope=identify only
-- and mints its own JWT for a row in `identities` below. We bypass Supabase
-- Auth's built-in Discord provider entirely because GoTrue hardcodes
-- "identify email" for it (it needs an email to populate auth.users.email) --
-- there's no way to trim that from the client, so we don't use it at all.
--
-- If you previously ran an earlier version of pro_users.sql/priority_votes.sql
-- against this project, drop that setup first. CREATE OR REPLACE VIEW can't
-- rename/retype existing columns, so the views below must be dropped rather
-- than replaced if they already exist with the old (auth.users-based)
-- column shapes -- safe to run even on a fresh project where they don't exist.
drop view if exists public.pro_consensus;
drop view if exists public.community_consensus;
drop view if exists public.priority_votes;
drop table if exists public.pro_users;
drop table if exists public.buy_order_submissions;

create extension if not exists pgcrypto;

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

alter table identities enable row level security;
-- Intentionally no policies for anon/authenticated: the only writer is the
-- discord-auth Edge Function, using the service role key (bypasses RLS).
-- Clients never need to read this table directly -- their own display_name/
-- is_pro travel inside their session JWT, and aggregates come from the views
-- below.

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

alter table submissions enable row level security;

drop policy if exists "read own submissions" on submissions;
create policy "read own submissions"
    on submissions for select
    to authenticated
    using (identity_id = auth.uid());
-- No insert/update/delete policies here on purpose: every write goes through
-- submit_build() below, which is SECURITY DEFINER and validates everything
-- itself (including which identity is allowed to write).

create table if not exists submission_choices (
    submission_id uuid not null references submissions (id) on delete cascade,
    category      text not null,
    choice        text not null check (choice in ('A', 'B')),
    buy_priority  integer not null,
    primary key (submission_id, category)
);

alter table submission_choices enable row level security;

drop policy if exists "read own submission choices" on submission_choices;
create policy "read own submission choices"
    on submission_choices for select
    to authenticated
    using (
        exists (
            select 1 from submissions s
            where s.id = submission_choices.submission_id
              and s.identity_id = auth.uid()
        )
    );

-- The only allowed write path for votes. auth.uid() resolves to the `sub`
-- claim of the caller's session JWT (minted by the discord-auth function),
-- so this is exactly as trustworthy as auth.uid() normally is with GoTrue.

-- Add guide columns if they don't exist yet (safe to re-run).
alter table submissions add column if not exists guide_url    text;
alter table submissions add column if not exists guide_credit text;

-- Drop old overloads before recreating with the full signature so PostgreSQL
-- doesn't keep stale versions that clash with the new argument list.
drop function if exists submit_build(text, jsonb);
drop function if exists submit_build(text, jsonb, text);

create or replace function submit_build(
    p_character_id text,
    p_choices      jsonb,
    p_note         text    default null,
    p_guide_url    text    default null,
    p_guide_credit text    default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
    v_identity_id uuid := auth.uid();
    v_is_pro boolean;
    v_submission_id uuid;
    v_count int;
    v_distinct_priorities int;
begin
    if v_identity_id is null then
        raise exception 'not authenticated';
    end if;

    select is_pro into v_is_pro from identities where id = v_identity_id;
    if v_is_pro is null then
        raise exception 'unknown identity';
    end if;

    select count(*), count(distinct (elem->>'buyPriority')::int)
      into v_count, v_distinct_priorities
      from jsonb_array_elements(p_choices) elem;

    if v_count = 0 or v_count <> v_distinct_priorities then
        raise exception 'each upgrade must have a unique buy order position';
    end if;

    -- Delete any existing published submission first so re-submissions (edits)
    -- replace the old one atomically instead of erroring.
    delete from submissions
    where character_id = p_character_id
      and identity_id  = v_identity_id
      and status       = 'published';

    insert into submissions (character_id, identity_id, is_pro, note, guide_url, guide_credit)
    values (p_character_id, v_identity_id, v_is_pro,
            -- guide fields and note are only stored for pro players
            case when v_is_pro then nullif(trim(p_note), '')         else null end,
            case when v_is_pro then nullif(trim(p_guide_url), '')    else null end,
            case when v_is_pro then nullif(trim(p_guide_credit), '') else null end)
    returning id into v_submission_id;

    insert into submission_choices (submission_id, category, choice, buy_priority)
    select v_submission_id, elem->>'category', elem->>'choice', (elem->>'buyPriority')::int
    from jsonb_array_elements(p_choices) elem;

    return v_submission_id;
end;
$$;

revoke all on function submit_build(text, jsonb, text, text, text) from public;
grant execute on function submit_build(text, jsonb, text, text, text) to authenticated;

-- Returns all published pro builds for a character, with buy order pre-sorted
-- and display_name pulled from identities. SECURITY DEFINER so callers don't
-- need a SELECT policy on identities (which has none, by design).
create or replace function get_pro_builds(p_character_id text)
returns table (
    submission_id  uuid,
    display_name   text,
    note           text,
    created_at     timestamptz,
    buy_order      jsonb
)
language sql
security definer
set search_path = public
as $$
    select
        s.id,
        i.display_name,
        s.note,
        s.created_at,
        jsonb_agg(
            jsonb_build_object(
                'category',    c.category,
                'choice',      c.choice,
                'buyPriority', c.buy_priority
            ) order by c.buy_priority
        )
    from submissions s
    join identities i on i.id = s.identity_id
    join submission_choices c on c.submission_id = s.id
    where s.status       = 'published'
      and s.is_pro       = true
      and s.character_id = p_character_id
    group by s.id, i.display_name, s.note, s.created_at
    order by s.created_at desc;
$$;

revoke all on function get_pro_builds(text) from public;
grant execute on function get_pro_builds(text) to anon, authenticated;

-- Returns all published pro submissions that include a guide link for a
-- character. SECURITY DEFINER so callers don't need a SELECT policy on
-- identities (which has none, by design).
create or replace function get_guides(p_character_id text)
returns table (
    submission_id  uuid,
    display_name   text,
    guide_url      text,
    guide_credit   text,
    note           text,
    created_at     timestamptz
)
language sql
security definer
set search_path = public
as $$
    select
        s.id,
        i.display_name,
        s.guide_url,
        s.guide_credit,
        s.note,
        s.created_at
    from submissions s
    join identities i on i.id = s.identity_id
    where s.status        = 'published'
      and s.is_pro        = true
      and s.guide_url    is not null
      and s.guide_url    <> ''
      and s.character_id  = p_character_id
    order by s.created_at desc;
$$;

revoke all on function get_guides(text) from public;
grant execute on function get_guides(text) to anon, authenticated;

-- Lets a user retract their own published submission so they can re-submit.
-- SECURITY DEFINER so the caller doesn't need a DELETE RLS policy on submissions
-- (there intentionally isn't one -- all writes go through these functions).
create or replace function delete_submission(p_character_id text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
    v_identity_id uuid := auth.uid();
begin
    if v_identity_id is null then
        raise exception 'not authenticated';
    end if;

    delete from submissions
    where character_id = p_character_id
      and identity_id  = v_identity_id
      and status       = 'published';
end;
$$;

revoke all on function delete_submission(text) from public;
grant execute on function delete_submission(text) to authenticated;

-- Returns the calling user's live is_pro status straight from identities.
-- Needed because is_pro is also stored in the session JWT (for display), but
-- the JWT isn't re-minted when an admin flips the flag in the DB -- so the
-- modal reads this instead of trusting the JWT claim.
create or replace function get_my_profile()
returns table (is_pro boolean, display_name text)
language sql
security definer
set search_path = public
as $$
    select is_pro, display_name
    from identities
    where id = auth.uid();
$$;

revoke all on function get_my_profile() from public;
grant execute on function get_my_profile() to authenticated;

-- Aggregation views; the front-end reads these, never raw votes.

create or replace view community_consensus as
select
    s.character_id,
    c.category,
    count(*)                                                          as total_votes,
    round(100.0 * count(*) filter (where c.choice = 'A') / count(*))  as pct_a,
    round(100.0 * count(*) filter (where c.choice = 'B') / count(*))  as pct_b
from submissions s
join submission_choices c on c.submission_id = s.id
where s.status = 'published'
group by s.character_id, c.category;

create or replace view pro_consensus as
select
    s.character_id,
    c.category,
    count(*)                                                          as pro_votes,
    round(100.0 * count(*) filter (where c.choice = 'A') / count(*))  as pct_a,
    round(100.0 * count(*) filter (where c.choice = 'B') / count(*))  as pct_b
from submissions s
join submission_choices c on c.submission_id = s.id
where s.status = 'published' and s.is_pro = true
group by s.character_id, c.category;

create or replace view priority_votes as
select
    s.character_id,
    c.category,
    c.buy_priority,
    count(*) as votes
from submissions s
join submission_choices c on c.submission_id = s.id
where s.status = 'published'
group by s.character_id, c.category, c.buy_priority;

grant select on community_consensus, pro_consensus, priority_votes to anon, authenticated;

-- To tag someone as a pro once they've logged in at least once (so their
-- identities row exists), see community/pro_users.sql for the helper query.
