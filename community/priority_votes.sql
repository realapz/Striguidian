-- Run this in the Supabase SQL Editor.
-- Counts how many submissions picked each category at each buy_priority slot,
-- per character. community.js uses this to rank categories by "most #1 picks,
-- then most #2 picks among what's left", etc.

create or replace view public.priority_votes as
select
    character_id,
    category,
    buy_priority,
    count(*) as votes
from public.buy_order_submissions
group by character_id, category, buy_priority;

grant select on public.priority_votes to anon, authenticated;
