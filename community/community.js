// Community buy-order client (skeleton, not loaded by the site). Adds an optional
// pro/community-consensus panel; no-ops when no backend is configured.
(function (global) {
    'use strict';

    var cfg = global.COMMUNITY_CONFIG || { enabled: false, backend: 'none' };

    function isEnabled() {
        return !!cfg.enabled && cfg.backend && cfg.backend !== 'none';
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

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

    // Real impl posts through a backend that validates auth and sets is_pro.
    function submitBuyOrder(/* characterId, choices, note */) {
        if (!isEnabled()) return Promise.reject(new Error('community layer disabled'));
        return Promise.reject(new Error('submitBuyOrder: backend endpoint not implemented yet'));
    }

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
        return '' +
            '<section class="community-section" data-presentation="' + escapeHtml(cfg.presentation || 'tabs') + '">' +
                '<h3 class="visualizer-section-title">Pro Consensus</h3>' +
                rows(aggregates.pro, 'No pro submissions yet.') +
                '<h3 class="visualizer-section-title">Community Consensus</h3>' +
                rows(aggregates.community, 'No community submissions yet.') +
            '</section>';
    }

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
