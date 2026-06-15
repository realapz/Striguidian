// Example config. Copy to community/config.js and fill in your backend.
// anonKey is browser-safe; the OAuth client secret must stay server-side only.
window.COMMUNITY_CONFIG = {
    enabled: false,
    backend: 'none', // 'supabase' | 'cloudflare' | 'none'

    supabase: {
        url: 'https://YOUR-PROJECT.supabase.co',
        anonKey: 'YOUR-PUBLIC-ANON-KEY',
    },

    presentation: 'tabs', // 'tabs' | 'sidebyside' — Pro leads either way
    proMinCountForPercent: 3,
};
