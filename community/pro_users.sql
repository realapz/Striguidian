-- Superseded by schema.sql: pro status is now just a boolean column on
-- `identities`, not a separate table joined to auth.users (we don't use
-- auth.users at all anymore -- see schema.sql's header comment for why).
-- This file is kept only as a couple of admin helper queries.

-- Find the identity row for someone who has logged in with Discord at least
-- once, so you can grab their id / confirm their handle before tagging them:
select id, external_id as discord_id, display_name, is_pro
from public.identities
where type = 'discord'
order by created_at desc;

-- These two are alternatives, not a sequence -- run only ONE of them as its
-- own query (select just that statement, or paste it alone), with the
-- discord_id from the select above swapped in. Left commented out so
-- pasting/running this whole file is harmless either way.

-- Mark them as a pro:
-- update public.identities
-- set is_pro = true, pro_title = 'Pro Player'
-- where type = 'discord' and external_id = 'paste-discord-user-id-here';

-- Remove pro status:
-- update public.identities
-- set is_pro = false, pro_title = null
-- where type = 'discord' and external_id = 'paste-discord-user-id-here';
