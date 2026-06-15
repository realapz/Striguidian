/**
 * Community system configuration (EXAMPLE / SKELETON).
 *
 * Copy this file to `community/config.js` and fill in your backend details.
 * The anon/public key is safe to ship to the browser, so `config.js` can be
 * committed if you like; the OAuth client secret is NOT browser-safe and must
 * live only in the backend edge function, never in this file.
 *
 * The whole community layer is OFF unless `enabled` is true AND a backend is
 * configured — so dropping these files into the site changes nothing until the
 * maintainer flips the switch.
 *
 * `backend` is the single swap point: choose 'supabase' now, change later
 * without touching the rest of the code.
 */
window.COMMUNITY_CONFIG = {
    enabled: false,

    // 'supabase' | 'cloudflare' | 'none'
    backend: 'none',

    supabase: {
        url: 'https://YOUR-PROJECT.supabase.co',
        anonKey: 'YOUR-PUBLIC-ANON-KEY',
    },

    // Show pro and community side-by-side, or as tabs ('tabs' | 'sidebyside').
    // Pro leads either way (plan 003 §3.1). Maintainer's presentation choice.
    presentation: 'tabs',

    // Below this many pro votes, show "Pro pick: X (N pros)" instead of a %.
    proMinCountForPercent: 3,
};
