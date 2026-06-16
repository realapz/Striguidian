(function (global) {
    'use strict';

    var cfg = global.COMMUNITY_CONFIG || { enabled: false, backend: 'none' };
    var db = null;

    if (cfg.enabled && cfg.backend === 'supabase' && global.supabase && cfg.supabase) {
        db = global.supabase.createClient(cfg.supabase.url, cfg.supabase.anonKey);
    }

    function isEnabled() {
        return !!cfg.enabled && cfg.backend !== 'none' && !!db;
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // --------------------------------------------------------------------------
    // Auth
    // --------------------------------------------------------------------------

    function getUser() {
        if (!db) return Promise.resolve(null);
        return db.auth.getUser().then(function (res) {
            return (res.data && res.data.user) || null;
        }).catch(function () { return null; });
    }

    function signInWithDiscord() {
        if (!db) return;
        db.auth.signInWithOAuth({
            provider: 'discord',
            options: { redirectTo: global.location.href, scopes: 'identify' }
        });
    }

    function signOut() {
        if (!db) return Promise.resolve();
        return db.auth.signOut();
    }

    // --------------------------------------------------------------------------
    // Data
    // --------------------------------------------------------------------------

    function fetchAggregates(characterId) {
        if (!isEnabled()) return Promise.resolve(null);
        return Promise.all([
            db.from('pro_consensus').select('*').eq('character_id', characterId),
            db.from('community_consensus').select('*').eq('character_id', characterId)
        ]).then(function (res) {
            return { pro: res[0].data || [], community: res[1].data || [] };
        }).catch(function () { return null; });
    }

    function fetchPriorityVotes(characterId) {
        if (!isEnabled()) return Promise.resolve([]);
        return db.from('priority_votes').select('*').eq('character_id', characterId)
            .then(function (res) { return res.data || []; })
            .catch(function () { return []; });
    }

    function computeRankedPriorities(char, votes) {
        var voteMap = {};
        votes.forEach(function (v) {
            if (!voteMap[v.category]) voteMap[v.category] = {};
            voteMap[v.category][v.buy_priority] = Number(v.votes) || 0;
        });

        var remaining = char.upgradePairs.map(function (p) { return p.category; });
        var ranking = {};
        var total = remaining.length;

        for (var rank = 1; rank <= total; rank++) {
            var best = remaining[0];
            var bestVotes = (voteMap[best] && voteMap[best][rank]) || 0;
            remaining.forEach(function (cat) {
                var count = (voteMap[cat] && voteMap[cat][rank]) || 0;
                if (count > bestVotes) {
                    bestVotes = count;
                    best = cat;
                }
            });
            ranking[best] = rank;
            remaining.splice(remaining.indexOf(best), 1);
        }
        return ranking;
    }

    function hasVoted(characterId, userId) {
        return db.from('buy_order_submissions')
            .select('id')
            .eq('character_id', characterId)
            .eq('user_id', userId)
            .limit(1)
            .then(function (res) {
                return !!(res.data && res.data.length > 0);
            }).catch(function () { return false; });
    }

    function submitBuyOrder(characterId, choices) {
        if (!isEnabled()) return Promise.reject(new Error('community layer disabled'));
        return getUser().then(function (user) {
            if (!user) return Promise.reject(new Error('not authenticated'));
            var rows = choices.map(function (c) {
                return {
                    character_id: characterId,
                    category: c.category,
                    choice: c.choice,
                    buy_priority: c.buyPriority,
                    user_id: user.id
                };
            });
            return db.from('buy_order_submissions').insert(rows).then(function (res) {
                if (res.error) throw res.error;
                return res;
            });
        });
    }

    // --------------------------------------------------------------------------
    // HTML builders
    // --------------------------------------------------------------------------

    function buildAggregatesHtml(aggregates) {
        function rows(list, emptyLabel) {
            if (!list || !list.length) {
                return '<p class="community-empty">' + escapeHtml(emptyLabel) + '</p>';
            }
            return list.map(function (row) {
                var pctA = Number(row.pct_a) || 0;
                var pctB = 100 - pctA;
                return '' +
                    '<div class="community-stat-row">' +
                        '<span class="community-category">' + escapeHtml(row.category) + '</span>' +
                        '<div class="community-bar-wrap">' +
                            '<span class="community-label">A&nbsp;' + pctA + '%</span>' +
                            '<div class="community-bar-track">' +
                                '<div class="community-bar-fill" style="width:' + pctA + '%"></div>' +
                            '</div>' +
                            '<span class="community-label">' + pctB + '%&nbsp;B</span>' +
                        '</div>' +
                    '</div>';
            }).join('');
        }
        return '' +
            '<div class="community-aggregates">' +
                '<h4 class="community-sub-title">Pro Consensus</h4>' +
                rows(aggregates.pro, 'No pro submissions yet.') +
                '<h4 class="community-sub-title">Community Consensus</h4>' +
                rows(aggregates.community, 'No community submissions yet.') +
            '</div>';
    }

    function buildLoginPromptHtml(characterId) {
        return '' +
            '<div class="community-login-prompt">' +
                '<p class="community-login-text">Log in with Discord to submit your own build.</p>' +
                '<button class="community-discord-btn" id="comm-login-' + escapeHtml(characterId) + '">' +
                    '<svg class="discord-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
                        '<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>' +
                    '</svg>' +
                    'Login with Discord' +
                '</button>' +
            '</div>';
    }

    function buildSubmitFormHtml(char, voted) {
        if (voted) {
            return '<div class="community-voted"><p class="community-voted-text">&#10003; You\'ve already submitted a build for ' + escapeHtml(char.name) + '.</p></div>';
        }
        var pairCount = char.upgradePairs.length;
        var pairInputs = char.upgradePairs.map(function (pair, i) {
            var priorityOptions = Array.from({ length: pairCount }, function (_, idx) { return idx + 1; }).map(function (n) {
                return '<option value="' + n + '"' + (n === (i + 1) ? ' selected' : '') + '>' + n + '</option>';
            }).join('');

            var choiceGroup = !pair.optionB
                ? '<span class="submit-choice-label submit-choice-fixed">' + escapeHtml(pair.optionA.name) + '</span>'
                : '' +
                    '<label class="submit-choice-label">' +
                        '<input type="radio" name="choice-' + i + '" value="A"' + (pair.recommended === 'A' ? ' checked' : '') + '> ' +
                        escapeHtml(pair.optionA.name) +
                    '</label>' +
                    '<label class="submit-choice-label">' +
                        '<input type="radio" name="choice-' + i + '" value="B"' + (pair.recommended === 'B' ? ' checked' : '') + '> ' +
                        escapeHtml(pair.optionB.name) +
                    '</label>';

            return '' +
                '<div class="submit-pair-row">' +
                    '<span class="submit-category">' + escapeHtml(pair.category) + '</span>' +
                    '<div class="submit-choice-group">' + choiceGroup + '</div>' +
                    '<label class="submit-priority-label">Buy order:&nbsp;' +
                        '<select name="priority-' + i + '" class="submit-priority-select">' + priorityOptions + '</select>' +
                    '</label>' +
                '</div>';
        }).join('');

        return '' +
            '<form class="community-submit-form" id="comm-submit-' + escapeHtml(char.id) + '">' +
                '<div class="submit-pairs-list">' + pairInputs + '</div>' +
                '<div class="submit-actions">' +
                    '<button type="submit" class="submit-build-btn">Submit My Build</button>' +
                    '<button type="button" class="submit-signout-btn" id="comm-signout-' + escapeHtml(char.id) + '">Sign Out</button>' +
                '</div>' +
                '<p class="submit-error" id="comm-error-' + escapeHtml(char.id) + '" style="display:none"></p>' +
            '</form>';
    }

    // --------------------------------------------------------------------------
    // Form event wiring
    // --------------------------------------------------------------------------

    function attachFormListeners(characterId, char) {
        var form = document.getElementById('comm-submit-' + characterId);
        var errorEl = document.getElementById('comm-error-' + characterId);
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            errorEl.style.display = 'none';

            var choices = char.upgradePairs.map(function (pair, i) {
                var choiceInput = form.querySelector('input[name="choice-' + i + '"]:checked');
                var priorityInput = form.querySelector('select[name="priority-' + i + '"]');
                return {
                    category: pair.category,
                    choice: choiceInput ? choiceInput.value : 'A',
                    buyPriority: priorityInput ? parseInt(priorityInput.value, 10) : (i + 1)
                };
            });

            var priorities = choices.map(function (c) { return c.buyPriority; });
            if (new Set(priorities).size !== priorities.length) {
                errorEl.textContent = 'Each upgrade must have a unique buy order position.';
                errorEl.style.display = 'block';
                return;
            }

            var submitBtn = form.querySelector('.submit-build-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';

            submitBuyOrder(characterId, choices).then(function () {
                form.innerHTML = '<p class="community-voted-text">&#10003; Build submitted! Thank you.</p>';
            }).catch(function (err) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit My Build';
                errorEl.textContent = err.message || 'Submission failed. Please try again.';
                errorEl.style.display = 'block';
            });
        });
    }

    // --------------------------------------------------------------------------
    // Modal entry point
    // --------------------------------------------------------------------------

    function enhanceModal(characterId, container, char) {
        if (!isEnabled() || !container) return;

        Promise.all([fetchAggregates(characterId), getUser()]).then(function (res) {
            var aggs = res[0];
            var user = res[1];

            var html = '<section class="community-section"><h3 class="visualizer-section-title">Community</h3>';

            if (aggs) html += buildAggregatesHtml(aggs);

            if (!user) {
                html += buildLoginPromptHtml(characterId) + '</section>';
                container.insertAdjacentHTML('beforeend', html);
                var loginBtn = document.getElementById('comm-login-' + characterId);
                if (loginBtn) loginBtn.addEventListener('click', signInWithDiscord);
                return;
            }

            hasVoted(characterId, user.id).then(function (voted) {
                html += buildSubmitFormHtml(char, voted) + '</section>';
                container.insertAdjacentHTML('beforeend', html);

                if (!voted) attachFormListeners(characterId, char);

                var signoutBtn = document.getElementById('comm-signout-' + characterId);
                if (signoutBtn) {
                    signoutBtn.addEventListener('click', function () {
                        signOut().then(function () { global.location.reload(); });
                    });
                }
            });
        });
    }

    global.Community = {
        isEnabled: isEnabled,
        escapeHtml: escapeHtml,
        getUser: getUser,
        signInWithDiscord: signInWithDiscord,
        signOut: signOut,
        fetchAggregates: fetchAggregates,
        fetchPriorityVotes: fetchPriorityVotes,
        computeRankedPriorities: computeRankedPriorities,
        submitBuyOrder: submitBuyOrder,
        enhanceModal: enhanceModal
    };
})(window);
