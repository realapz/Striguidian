-- Run this in the Supabase SQL Editor.
-- Adds a manually-maintained list of "pro" users and rebuilds the two
-- aggregate views that community.js already reads from.

create table if not exists public.pro_users (
    user_id  uuid primary key references auth.users(id) on delete cascade,
    added_at timestamptz not null default now()
);

alter table public.pro_users enable row level security;
-- intentionally no policies: only readable/writable via the SQL editor (service role)

drop view if exists public.community_consensus;
drop view if exists public.pro_consensus;

create view public.community_consensus as
select
    s.character_id,
    s.category,
    count(*) as total_votes,
    round(100.0 * count(*) filter (where s.choice = 'A') / count(*)) as pct_a,
    round(100.0 * count(*) filter (where s.choice = 'B') / count(*)) as pct_b
from public.buy_order_submissions s
group by s.character_id, s.category;

create view public.pro_consensus as
select
    s.character_id,
    s.category,
    count(*) as total_votes,
    round(100.0 * count(*) filter (where s.choice = 'A') / count(*)) as pct_a,
    round(100.0 * count(*) filter (where s.choice = 'B') / count(*)) as pct_b
from public.buy_order_submissions s
join public.pro_users p on p.user_id = s.user_id
group by s.character_id, s.category;

grant select on public.community_consensus to anon, authenticated;
grant select on public.pro_consensus to anon, authenticated;

-- Find the Supabase user_id for someone who has already logged in with Discord,
-- so you can add them to pro_users:
-- select i.user_id, i.identity_data->>'provider_id' as discord_id,
--        i.identity_data->>'full_name' as discord_name
-- from auth.identities i
-- where i.provider = 'discord';

-- Then mark them as pro:
-- insert into public.pro_users (user_id) values ('paste-uuid-here');
