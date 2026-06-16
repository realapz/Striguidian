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

    // --------------------------------------------------------------------------
    // Session (custom, NOT Supabase Auth/GoTrue)
    // --------------------------------------------------------------------------
    //
    // Logins go through the discord-auth Edge Function, which does its own
    // Discord OAuth code exchange with scope=identify only (see
    // supabase/functions/discord-auth) and hands back a JWT signed with the
    // project's JWT secret. We never call db.auth.* here -- there's no
    // auth.users row for any of this, on purpose, so we manage the session
    // ourselves: store the JWT, decode its claims for display, and attach it
    // as the Authorization header on a Supabase client used for anything
    // that needs RLS to see the caller's identity.

    var SESSION_STORAGE_KEY = 'community_session_jwt';
    var authedClient = null;
    var authedClientToken = null;

    function decodeJwtPayload(token) {
        try {
            var base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
            var json = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(json);
        } catch (e) {
            return null;
        }
    }

    function readStoredSession() {
        var token;
        try {
            token = global.localStorage.getItem(SESSION_STORAGE_KEY);
        } catch (e) {
            return null;
        }
        if (!token) return null;
        var payload = decodeJwtPayload(token);
        if (!payload || !payload.exp || payload.exp * 1000 <= Date.now()) {
            try { global.localStorage.removeItem(SESSION_STORAGE_KEY); } catch (e) {}
            return null;
        }
        return {
            token: token,
            identityId: payload.sub,
            displayName: payload.discord_username,
            isPro: !!payload.is_pro
        };
    }

    function captureSessionFromUrlFragment() {
        var hash = global.location.hash;
        if (!hash) return;
        var tokenMatch = /community_token=([^&]+)/.exec(hash);
        var errorMatch = /community_error=([^&]+)/.exec(hash);
        if (!tokenMatch && !errorMatch) return;

        if (tokenMatch) {
            try { global.localStorage.setItem(SESSION_STORAGE_KEY, decodeURIComponent(tokenMatch[1])); } catch (e) {}
        }
        if (errorMatch) {
            // Surfaced via getLastAuthError() below; deliberately not thrown
            // since this runs at module load, before any UI exists yet.
            global.Community_lastAuthError = decodeURIComponent(errorMatch[1]);
        }
        var cleaned = global.location.pathname + global.location.search;
        global.history.replaceState(null, '', cleaned);
    }

    if (db) captureSessionFromUrlFragment();

    function getSession() {
        return readStoredSession();
    }

    function clientFor(session) {
        if (!session) return db;
        if (authedClient && authedClientToken === session.token) return authedClient;
        authedClient = global.supabase.createClient(cfg.supabase.url, cfg.supabase.anonKey, {
            global: { headers: { Authorization: 'Bearer ' + session.token } },
            auth: { persistSession: false, autoRefreshToken: false }
        });
        authedClientToken = session.token;
        return authedClient;
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
        var session = getSession();
        if (!session) return Promise.resolve(null);
        return Promise.resolve({ id: session.identityId, displayName: session.displayName, isPro: session.isPro });
    }

    function signInWithDiscord() {
        if (!db || !cfg.supabase) return;
        var startUrl = cfg.supabase.url + '/functions/v1/discord-auth/start?returnTo=' +
            encodeURIComponent(global.location.href);
        global.location.href = startUrl;
    }

    function signOut() {
        try { global.localStorage.removeItem(SESSION_STORAGE_KEY); } catch (e) {}
        authedClient = null;
        authedClientToken = null;
        return Promise.resolve();
    }

    function getLastAuthError() {
        return global.Community_lastAuthError || null;
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

    function hasVoted(characterId, session) {
        // RLS on `submissions` already restricts selects to the caller's own
        // rows (identity_id = auth.uid()), so no explicit identity filter
        // is needed here -- this query simply can't see anyone else's row.
        return clientFor(session).from('submissions')
            .select('id')
            .eq('character_id', characterId)
            .limit(1)
            .then(function (res) {
                return !!(res.data && res.data.length > 0);
            }).catch(function () { return false; });
    }

    function submitBuyOrder(characterId, choices) {
        if (!isEnabled()) return Promise.reject(new Error('community layer disabled'));
        var session = getSession();
        if (!session) return Promise.reject(new Error('not authenticated'));

        var rows = choices.map(function (c) {
            return { category: c.category, choice: c.choice, buyPriority: c.buyPriority };
        });

        // submit_build() is a SECURITY DEFINER function (see schema.sql) --
        // it's the only allowed write path for votes, and it derives the
        // identity from auth.uid() itself rather than trusting a client-sent id.
        return clientFor(session).rpc('submit_build', {
            p_character_id: characterId,
            p_choices: rows
        }).then(function (res) {
            if (res.error) throw res.error;
            return res;
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

        var pairCards = char.upgradePairs.map(function (pair, i) {
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
                '<div class="submit-pair-row buy-order-card" data-pair-index="' + i + '">' +
                    '<div class="buy-order-badge" id="buy-badge-' + escapeHtml(char.id) + '-' + i + '">?</div>' +
                    '<div class="buy-order-card-body">' +
                        '<span class="submit-category">' + escapeHtml(pair.category) + '</span>' +
                        '<div class="submit-choice-group">' + choiceGroup + '</div>' +
                    '</div>' +
                '</div>';
        }).join('');

        return '' +
            '<form class="community-submit-form" id="comm-submit-' + escapeHtml(char.id) + '">' +
                '<p class="buy-order-instruction" style="color:' + escapeHtml(char.themeColor) + ';font-size:0.85em;">Click each upgrade in the order you want to buy it. Click again to remove it.</p>' +
                '<div class="submit-pairs-list">' + pairCards + '</div>' +
                '<div class="submit-actions">' +
                    '<button type="submit" class="submit-build-btn" disabled>Submit My Build</button>' +
                    '<button type="button" class="buy-order-reset-btn" id="comm-reset-' + escapeHtml(char.id) + '">Reset</button>' +
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
        var submitBtn = form ? form.querySelector('.submit-build-btn') : null;
        var resetBtn = document.getElementById('comm-reset-' + characterId);
        if (!form || !submitBtn) return;

        var pairCount = char.upgradePairs.length;
        // priorities[i] = 1-based buy order assigned to pair i, or null if unassigned
        var priorities = new Array(pairCount).fill(null);
        var nextPriority = 1;

        function badgeEl(i) {
            return document.getElementById('buy-badge-' + characterId + '-' + i);
        }

        function refresh() {
            char.upgradePairs.forEach(function (_, i) {
                var badge = badgeEl(i);
                var card = form.querySelector('.buy-order-card[data-pair-index="' + i + '"]');
                if (!badge || !card) return;
                if (priorities[i] !== null) {
                    badge.textContent = priorities[i];
                    card.classList.add('buy-order-assigned');
                } else {
                    badge.textContent = '?';
                    card.classList.remove('buy-order-assigned');
                }
            });
            submitBtn.disabled = priorities.some(function (p) { return p === null; });
        }

        function resetOrder() {
            priorities = new Array(pairCount).fill(null);
            nextPriority = 1;
            refresh();
        }

        // Clicking a card assigns the next priority; clicking an already-assigned
        // card removes it and shifts subsequent numbers down so there are no gaps.
        form.querySelectorAll('.buy-order-card').forEach(function (card) {
            card.addEventListener('click', function (e) {
                if (e.target.type === 'radio') return; // let radio clicks through
                var idx = parseInt(card.getAttribute('data-pair-index'), 10);

                if (priorities[idx] !== null) {
                    // Remove this card and close the gap
                    var removed = priorities[idx];
                    priorities[idx] = null;
                    priorities = priorities.map(function (p) {
                        return (p !== null && p > removed) ? p - 1 : p;
                    });
                    nextPriority--;
                } else {
                    if (nextPriority > pairCount) return; // already full
                    priorities[idx] = nextPriority;
                    nextPriority++;
                }
                refresh();
            });
        });

        if (resetBtn) resetBtn.addEventListener('click', resetOrder);

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            errorEl.style.display = 'none';

            var choices = char.upgradePairs.map(function (pair, i) {
                var choiceInput = form.querySelector('input[name="choice-' + i + '"]:checked');
                return {
                    category: pair.category,
                    choice: choiceInput ? choiceInput.value : 'A',
                    buyPriority: priorities[i]
                };
            });

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

            hasVoted(characterId, getSession()).then(function (voted) {
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
        getLastAuthError: getLastAuthError,
        fetchAggregates: fetchAggregates,
        fetchPriorityVotes: fetchPriorityVotes,
        computeRankedPriorities: computeRankedPriorities,
        submitBuyOrder: submitBuyOrder,
        enhanceModal: enhanceModal
    };
})(window);
