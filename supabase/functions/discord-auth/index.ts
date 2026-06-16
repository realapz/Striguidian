// Handles the entire Discord OAuth login flow with scope=identify ONLY,
// without ever touching Supabase's built-in GoTrue/auth.users. Two routes,
// dispatched on the trailing path segment:
//   GET /functions/v1/discord-auth/start     -> redirects the browser to Discord
//   GET /functions/v1/discord-auth/callback  -> exchanges the code, upserts
//                                                the identity, mints our own
//                                                JWT, redirects back to the site
//
// Why this exists instead of supabase.auth.signInWithOAuth({provider:'discord'}):
// GoTrue's built-in Discord provider always requests "identify email"
// because it needs an email to populate auth.users.email. That can't be
// trimmed from the client. Running the OAuth code exchange ourselves means
// we control the scope (identify only) and never receive or store an email
// at all -- Discord's /users/@me response simply omits the email field
// entirely unless the email scope was granted.
//
// Required secrets (set with `supabase secrets set NAME=value`):
//   DISCORD_CLIENT_ID      - from the Discord Developer Portal
//   DISCORD_CLIENT_SECRET  - from the Discord Developer Portal (server-side only)
//   DISCORD_REDIRECT_URI   - must exactly match what's registered in Discord,
//                            e.g. https://<project-ref>.supabase.co/functions/v1/discord-auth/callback
//   STATE_SECRET           - random 32+ byte string, signs the CSRF state param
//   SESSION_JWT_SECRET     - your Supabase project's JWT secret
//                            (Dashboard > Project Settings > API > JWT Secret)
//   ALLOWED_RETURN_ORIGIN  - e.g. https://apzguid.es -- only this origin is
//                            accepted as a post-login redirect target
//
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are auto-injected by the
// platform; the service-role client below is the only thing allowed to
// write to `identities` (see schema.sql -- there are no RLS policies
// granting anon/authenticated write access to that table).
//
// Deploy with JWT verification disabled for this function (these routes are
// hit via plain browser navigation -- there's no way to attach an
// Authorization header), see supabase/config.toml.

import { createClient } from "npm:@supabase/supabase-js@2";
import { SignJWT } from "npm:jose@5";

const DISCORD_CLIENT_ID = Deno.env.get("DISCORD_CLIENT_ID")!;
const DISCORD_CLIENT_SECRET = Deno.env.get("DISCORD_CLIENT_SECRET")!;
const DISCORD_REDIRECT_URI = Deno.env.get("DISCORD_REDIRECT_URI")!;
const STATE_SECRET = Deno.env.get("STATE_SECRET")!;
const SESSION_JWT_SECRET = Deno.env.get("SESSION_JWT_SECRET")!;
const ALLOWED_RETURN_ORIGIN = Deno.env.get("ALLOWED_RETURN_ORIGIN")!;
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12h; user just logs in again after

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } },
);

function b64url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function hmac(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return b64url(new Uint8Array(sig));
}

// Stateless, signed CSRF state -- "<nonce>.<returnTo-b64>.<expiry>.<hmac>" --
// so we don't need a server-side session store between /start and /callback.
async function signState(returnTo: string): Promise<string> {
  const nonce = b64url(crypto.getRandomValues(new Uint8Array(16)));
  const exp = (Date.now() + 5 * 60 * 1000).toString();
  const payload = `${nonce}.${btoa(returnTo)}.${exp}`;
  const sig = await hmac(STATE_SECRET, payload);
  return `${payload}.${sig}`;
}

async function verifyState(state: string): Promise<string | null> {
  const parts = state.split(".");
  if (parts.length !== 4) return null;
  const [nonce, returnToB64, exp, sig] = parts;
  const payload = `${nonce}.${returnToB64}.${exp}`;
  const expected = await hmac(STATE_SECRET, payload);
  if (expected !== sig) return null;
  if (Date.now() > Number(exp)) return null;
  try {
    return atob(returnToB64);
  } catch {
    return null;
  }
}

function isAllowedReturnTo(value: string): boolean {
  try {
    return new URL(value).origin === ALLOWED_RETURN_ORIGIN;
  } catch {
    return false;
  }
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const route = url.pathname.split("/").filter(Boolean).pop();

  if (route === "start") return handleStart(url);
  if (route === "callback") return handleCallback(url);
  return new Response("Not found", { status: 404 });
});

async function handleStart(url: URL): Promise<Response> {
  const returnTo = url.searchParams.get("returnTo") || "";
  if (!isAllowedReturnTo(returnTo)) {
    return new Response("Invalid returnTo", { status: 400 });
  }

  const state = await signState(returnTo);
  const authorizeUrl = new URL("https://discord.com/api/oauth2/authorize");
  authorizeUrl.searchParams.set("client_id", DISCORD_CLIENT_ID);
  authorizeUrl.searchParams.set("redirect_uri", DISCORD_REDIRECT_URI);
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("scope", "identify"); // <-- bare minimum, no "email"
  authorizeUrl.searchParams.set("state", state);

  return Response.redirect(authorizeUrl.toString(), 302);
}

async function handleCallback(url: URL): Promise<Response> {
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const discordError = url.searchParams.get("error");

  if (discordError) return redirectWithError(ALLOWED_RETURN_ORIGIN, "discord_denied");
  if (!code || !state) return redirectWithError(ALLOWED_RETURN_ORIGIN, "missing_params");

  const returnTo = await verifyState(state);
  if (!returnTo) return redirectWithError(ALLOWED_RETURN_ORIGIN, "bad_state");

  // 1. Exchange the code for an access token.
  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: DISCORD_REDIRECT_URI,
    }),
  });
  if (!tokenRes.ok) return redirectWithError(returnTo, "token_exchange_failed");
  const tokenJson = await tokenRes.json();

  // 2. Fetch the Discord profile. Because we only ever requested
  //    scope=identify, this response has no "email" field at all -- it's
  //    not filtered out below, Discord simply never includes it.
  const meRes = await fetch("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${tokenJson.access_token}` },
  });
  if (!meRes.ok) return redirectWithError(returnTo, "profile_fetch_failed");
  const me = await meRes.json(); // { id, username, global_name, avatar, ... }

  // 3. Upsert the identity. Service-role client bypasses RLS; this is the
  //    only code path allowed to write to `identities`.
  const displayName = me.global_name || me.username;
  const { data: identity, error: upsertError } = await supabaseAdmin
    .from("identities")
    .upsert(
      {
        type: "discord",
        external_id: me.id,
        display_name: displayName,
        verified_at: new Date().toISOString(),
      },
      { onConflict: "type,external_id" },
    )
    .select("id, is_pro")
    .single();

  if (upsertError || !identity) return redirectWithError(returnTo, "identity_upsert_failed");

  // 4. Mint our own session JWT, signed with the project's JWT secret so
  //    PostgREST/RLS treats it exactly like a normal Supabase Auth session --
  //    auth.uid() resolves to identities.id.
  const secretKey = new TextEncoder().encode(SESSION_JWT_SECRET);
  const jwt = await new SignJWT({
    role: "authenticated",
    discord_username: displayName,
    is_pro: identity.is_pro,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(identity.id)
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS)
    .sign(secretKey);

  const redirectUrl = new URL(returnTo);
  redirectUrl.hash = `community_token=${jwt}`;
  return Response.redirect(redirectUrl.toString(), 302);
}

function redirectWithError(returnTo: string, reason: string): Response {
  try {
    const target = new URL(returnTo || ALLOWED_RETURN_ORIGIN);
    target.hash = `community_error=${reason}`;
    return Response.redirect(target.toString(), 302);
  } catch {
    return new Response(reason, { status: 400 });
  }
}
