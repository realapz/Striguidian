-- Run this in the Supabase SQL Editor.
-- Deletes ALL authenticated users and everything tied to them
-- (their pro status and all buy-order submissions/votes).
-- This is destructive and cannot be undone.

delete from public.buy_order_submissions;
delete from public.pro_users;
delete from auth.users;
