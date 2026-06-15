/**
 * Community buy-order layer — front-end client (PROPOSAL / SKELETON).
 *
 * NOT loaded by index.html yet. This is the isolated skeleton from plan 003:
 * it adds the pro/community-consensus UI WITHOUT changing the existing curated
 * site, and degrades to a no-op when no backend is configured (rule: "the site
 * must never break"). The maintainer wires it in during finalisation — see
 * community/README.md for the one-line integration.
 *
 * Two signals are kept strictly separate (Pro vs Community) and never merged.
 * All user-derived strings are escaped on render (plan 003 §6); the backend is
 * still responsible for sanitising on write and computing is_pro/consensus
 * server-side — the client only displays.
 */
(function (global) {
    'use strict';

    var cfg = global.COMMUNITY_CONFIG || { enabled: false, backend: 'none' };

    function isEnabled() {
        return !!cfg.enabled && cfg.backend && cfg.backend !== 'none';
    }

    // --- Render hardening: escape untrusted strings before innerHTML. ---------
    // The existing app.js interpolates author-controlled data straight into
    // innerHTML, which is safe today. Community display names / notes are NOT
    // author-controlled, so anything user-derived must go through this.
    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // --- Backend adapter. Swap on cfg.backend; only 'supabase' is sketched. ---
    function backendUrl(path) {
        if (cfg.backend === 'supabase') {
            return cfg.supabase.url.replace(/\/$/, '') + '/rest/v1/' + path;
        }
        return null;
    }

    function authHeaders() {
        if (cfg.backend === 'supabase') {
            return { apikey: cfg.supabase.anonKey, Authorization: 'Bearer ' + cfg.supabase.anonKey };
        }
        return {};
    }

    /**
     * Fetch precomputed aggregates for one character.
     * Returns { pro: [...], community: [...] } keyed by category, or null on
     * any failure (caller falls back to the curated data.js view).
     */
    function fetchAggregates(characterId) {
        if (!isEnabled()) return Promise.resolve(null);
        var pro = backendUrl('pro_consensus?character_id=eq.' + encodeURIComponent(characterId));
        var com = backendUrl('community_consensus?character_id=eq.' + encodeURIComponent(characterId));
        if (!pro || !com) return Promise.resolve(null);
        return Promise.all([
            fetch(pro, { headers: authHeaders() }).then(function (r) { return r.json(); }),
            fetch(com, { headers: authHeaders() }).then(function (r) { return r.json(); })
        ]).then(function (res) {
            return { pro: res[0], community: res[1] };
        }).catch(function () { return null; });
    }

    /**
     * Submit (or replace) the current user's buy order for a character.
     * choices: [{ category, choice: 'A'|'B', buyPriority }], note: string.
     * Real implementation posts through a backend edge function that validates
     * the Discord OAuth session and derives is_pro server-side. Stub for now.
     */
    function submitBuyOrder(/* characterId, choices, note */) {
        if (!isEnabled()) return Promise.reject(new Error('community layer disabled'));
        return Promise.reject(new Error('submitBuyOrder: backend endpoint not implemented yet'));
    }

    /**
     * Build the community/pro panel for a character modal. Reuses the existing
     * .choice-percent-* bar classes from styles.css. Returns an HTML string with
     * every user-derived field escaped. Empty signals render as a friendly note.
     */
    function buildPanelHtml(aggregates) {
        if (!aggregates) return '';
        function rows(list, emptyLabel) {
            if (!list || !list.length) return '<p class="community-empty">' + escapeHtml(emptyLabel) + '</p>';
            return list.map(function (row) {
                return '' +
                    '<div class="upgrade-pair-row">' +
                        '<div class="upgrade-pair-header">' +
                            '<span class="upgrade-category-title">' + escapeHtml(row.category) + '</span>' +
                        '</div>' +
                        '<div class="choice-percentage-bar-area">' +
                            '<span class="choice-percent-number">' + escapeHtml(row.pct_a) + '% A</span>' +
                        '</div>' +
                    '</div>';
            }).join('');
        }
        // Pro leads (plan 003 §3.1). Presentation (tabs vs side-by-side) is a
        // maintainer choice carried in cfg.presentation; both kept separate.
        return '' +
            '<section class="community-section" data-presentation="' + escapeHtml(cfg.presentation || 'tabs') + '">' +
                '<h3 class="visualizer-section-title">Pro Consensus</h3>' +
                rows(aggregates.pro, 'No pro submissions yet.') +
                '<h3 class="visualizer-section-title">Community Consensus</h3>' +
                rows(aggregates.community, 'No community submissions yet.') +
            '</section>';
    }

    /**
     * Entry point the site would call after rendering a character modal:
     *   Community.enhanceModal(char.id, modalDetailsBodyElement)
     * No-op (and silent) unless the community layer is enabled and the fetch
     * succeeds, so the curated experience is unaffected.
     */
    function enhanceModal(characterId, container) {
        if (!isEnabled() || !container) return;
        fetchAggregates(characterId).then(function (aggs) {
            var html = buildPanelHtml(aggs);
            if (html) container.insertAdjacentHTML('beforeend', html);
        });
    }

    global.Community = {
        isEnabled: isEnabled,
        escapeHtml: escapeHtml,
        fetchAggregates: fetchAggregates,
        submitBuyOrder: submitBuyOrder,
        buildPanelHtml: buildPanelHtml,
        enhanceModal: enhanceModal
    };
})(window);
