-- Run this in the Supabase SQL Editor.
-- Deletes ALL identities and everything tied to them (their pro status and
-- all submitted builds/votes). This is destructive and cannot be undone.
-- Logged-in browsers will keep a now-orphaned session JWT until it expires
-- (see SESSION_TTL_SECONDS in supabase/functions/discord-auth) -- the next
-- vote attempt will fail with "unknown identity" and they'll need to log
-- back in, which recreates their identities row.

delete from public.submission_choices;
delete from public.submissions;
delete from public.identities;
