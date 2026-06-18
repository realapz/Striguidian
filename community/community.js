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

    function fetchProBuilds(characterId) {
        if (!isEnabled()) return Promise.resolve([]);
        return db.rpc('get_pro_builds', { p_character_id: characterId })
            .then(function (res) { return res.data || []; })
            .catch(function () { return []; });
    }

    // Fetches the caller's existing submission for a character so the edit
    // form can be pre-populated with their previous choices.
    function fetchMySubmission(characterId) {
        if (!isEnabled()) return Promise.resolve(null);
        var session = getSession();
        if (!session) return Promise.resolve(null);
        return clientFor(session)
            .from('submissions')
            .select('id, note, submission_choices(category, choice, buy_priority)')
            .eq('character_id', characterId)
            .eq('status', 'published')
            .limit(1)
            .then(function (res) { return (res.data && res.data[0]) || null; })
            .catch(function () { return null; });
    }

    // Fetches the caller's live is_pro from the DB rather than trusting the
    // JWT claim -- admins can flip the flag at any time without the user
    // re-logging in, so the JWT may be stale.
    function fetchMyProfile() {
        if (!isEnabled()) return Promise.resolve(null);
        var session = getSession();
        if (!session) return Promise.resolve(null);
        return clientFor(session).rpc('get_my_profile')
            .then(function (res) { return (res.data && res.data[0]) || null; })
            .catch(function () { return null; });
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

    function deleteSubmission(characterId) {
        if (!isEnabled()) return Promise.reject(new Error('community layer disabled'));
        var session = getSession();
        if (!session) return Promise.reject(new Error('not authenticated'));
        return clientFor(session).rpc('delete_submission', { p_character_id: characterId }).then(function (res) {
            if (res.error) throw res.error;
            return res;
        });
    }

    function submitBuyOrder(characterId, choices, note) {
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
            p_choices: rows,
            p_note: note || null
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

    function buildProBuildsHtml(builds, char, characterId) {
        if (!builds || !builds.length) {
            return '<p class="community-empty">No top-player builds submitted yet.</p>';
        }

        var cards = builds.map(function (b) {
            var order = (b.buy_order || []).map(function (item) {
                var pair = null;
                for (var k = 0; k < char.upgradePairs.length; k++) {
                    if (char.upgradePairs[k].category === item.category) { pair = char.upgradePairs[k]; break; }
                }
                var label = item.category;
                if (pair) {
                    var opt = item.choice === 'B' ? pair.optionB : pair.optionA;
                    if (opt && opt.name) label = opt.name;
                }
                return '' +
                    '<span class="pb-step">' +
                        '<span class="pb-num">' + escapeHtml(String(item.buyPriority)) + '</span>' +
                        escapeHtml(label) +
                    '</span>';
            }).join('');

            var dateStr = '';
            if (b.created_at) {
                dateStr = new Date(b.created_at).toLocaleDateString(undefined, {
                    year: 'numeric', month: 'short', day: 'numeric'
                });
            }

            return '' +
                '<div class="pro-build-card" data-name="' + escapeHtml((b.display_name || '').toLowerCase()) + '">' +
                    '<div class="pb-header">' +
                        '<span class="pb-name">' + escapeHtml(b.display_name || 'Unknown') + '</span>' +
                        '<span class="pb-pro-tag">Pro</span>' +
                        (dateStr ? '<span class="pb-date">Last updated ' + escapeHtml(dateStr) + '</span>' : '') +
                    '</div>' +
                    '<div class="pb-order">' + order + '</div>' +
                    (b.note ? '<p class="pb-note">' + escapeHtml(b.note) + '</p>' : '') +
                '</div>';
        }).join('');

        return '' +
            '<div class="pb-search-wrap">' +
                '<input type="text" class="pb-search-input" id="pb-search-' + escapeHtml(characterId) + '" placeholder="Search player...">' +
            '</div>' +
            '<div class="pb-list" id="pb-list-' + escapeHtml(characterId) + '">' + cards + '</div>';
    }

    function wireProSearch(characterId) {
        var input = document.getElementById('pb-search-' + characterId);
        var list  = document.getElementById('pb-list-'   + characterId);
        if (!input || !list) return;
        input.addEventListener('input', function () {
            var q = input.value.toLowerCase().trim();
            list.querySelectorAll('.pro-build-card').forEach(function (card) {
                var name = card.getAttribute('data-name') || '';
                card.style.display = (!q || name.indexOf(q) !== -1) ? '' : 'none';
            });
        });
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

    // existingChoices: array of {category, choice, buy_priority} from a previous
    // submission, used to pre-check radio buttons when the user edits their build.
    function buildSubmitFormHtml(char, voted, isPro, existingChoices) {
        if (voted) {
            return '' +
                '<div class="community-voted">' +
                    '<p class="community-voted-text">&#10003; You\'ve already submitted a build for ' + escapeHtml(char.name) + '.</p>' +
                    '<button type="button" class="community-edit-btn" id="comm-edit-' + escapeHtml(char.id) + '">Edit Submission</button>' +
                    '<p class="community-edit-error" id="comm-edit-error-' + escapeHtml(char.id) + '" style="display:none;color:var(--accent-red);font-size:0.8rem;margin-top:0.5rem;"></p>' +
                '</div>';
        }

        // Build a quick lookup so each pair can know its previous A/B choice
        var prevChoiceMap = {};
        if (existingChoices) {
            existingChoices.forEach(function (c) { prevChoiceMap[c.category] = c.choice; });
        }

        var pairCards = char.upgradePairs.map(function (pair, i) {
            var prev = prevChoiceMap[pair.category]; // 'A', 'B', or undefined
            var choiceGroup = !pair.optionB
                ? '<span class="submit-choice-label submit-choice-fixed">' + escapeHtml(pair.optionA.name) + '</span>'
                : '' +
                    '<label class="submit-choice-label">' +
                        '<input type="radio" name="choice-' + i + '" value="A"' +
                            ((prev ? prev === 'A' : pair.recommended === 'A') ? ' checked' : '') + '> ' +
                        escapeHtml(pair.optionA.name) +
                    '</label>' +
                    '<label class="submit-choice-label">' +
                        '<input type="radio" name="choice-' + i + '" value="B"' +
                            ((prev ? prev === 'B' : pair.recommended === 'B') ? ' checked' : '') + '> ' +
                        escapeHtml(pair.optionB.name) +
                    '</label>';

            return '' +
                '<div class="submit-pair-row buy-order-card" data-pair-index="' + i + '">' +
                    '<div class="buy-order-badge" id="buy-badge-' + escapeHtml(char.id) + '-' + i + '" style="color:#fff;border-color:' + escapeHtml(char.themeColor) + '">?</div>' +
                    '<div class="buy-order-card-body">' +
                        '<span class="submit-category">' + escapeHtml(pair.category) + '</span>' +
                        '<div class="submit-choice-group">' + choiceGroup + '</div>' +
                    '</div>' +
                '</div>';
        });

        var leftCards  = pairCards.slice(0, 4).join('');
        var rightCards = pairCards.slice(4).join('');

        var noteField = isPro
            ? '' +
                '<div class="submit-note-wrap">' +
                    '<label class="submit-note-label" for="comm-note-' + escapeHtml(char.id) + '">' +
                        'Note <span class="submit-note-optional">(optional)</span>' +
                    '</label>' +
                    '<textarea class="submit-note-input" id="comm-note-' + escapeHtml(char.id) + '" rows="2" maxlength="1000" placeholder="Share your reasoning or tips for this build..."></textarea>' +
                    '<span class="submit-note-counter" id="comm-note-counter-' + escapeHtml(char.id) + '">0/1000</span>' +
                '</div>'
            : '';

        return '' +
            '<form class="community-submit-form" id="comm-submit-' + escapeHtml(char.id) + '">' +
                '<p class="buy-order-instruction" style="color:' + escapeHtml(char.themeColor) + ';font-size:0.85em;">Click each upgrade in the order you want to buy it. Click again to remove it.</p>' +
                '<div class="upgrade-pairs-container submit-pairs-grid">' +
                    '<div class="upgrade-pairs-column">' + leftCards + '</div>' +
                    '<div class="upgrade-pairs-column">' + rightCards + '</div>' +
                '</div>' +
                noteField +
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

    // existingSubmission: { note, submission_choices: [{category, choice, buy_priority}] }
    // Pass it when restoring an edit so the form starts with the previous state.
    function attachFormListeners(characterId, char, isPro, existingSubmission) {
        var form = document.getElementById('comm-submit-' + characterId);
        var errorEl = document.getElementById('comm-error-' + characterId);
        var submitBtn = form ? form.querySelector('.submit-build-btn') : null;
        var resetBtn = document.getElementById('comm-reset-' + characterId);
        if (!form || !submitBtn) return;

        var pairCount = char.upgradePairs.length;
        // priorities[i] = 1-based buy order assigned to pair i, or null if unassigned
        var priorities = new Array(pairCount).fill(null);
        var nextPriority = 1;

        // Pre-fill from existing submission if editing
        if (existingSubmission && existingSubmission.submission_choices) {
            existingSubmission.submission_choices
                .slice()
                .sort(function (a, b) { return a.buy_priority - b.buy_priority; })
                .forEach(function (c) {
                    for (var k = 0; k < char.upgradePairs.length; k++) {
                        if (char.upgradePairs[k].category === c.category) {
                            priorities[k] = c.buy_priority;
                            if (c.buy_priority >= nextPriority) nextPriority = c.buy_priority + 1;
                            break;
                        }
                    }
                });
        }

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
                    badge.style.background = '';
                    badge.style.color = '#fff';
                    card.classList.add('buy-order-assigned');
                } else {
                    badge.textContent = '?';
                    badge.style.background = '';
                    badge.style.color = '#fff';
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

        // Clicking a card (anywhere on it, including the radio dot) assigns the
        // next priority; clicking an already-assigned card removes it and shifts
        // subsequent numbers down so there are no gaps.
        //
        // When a <label> is clicked the browser immediately fires a synthetic
        // click on the contained <input type="radio"> as well. We want BOTH a
        // direct radio-dot click AND a label click to assign priority exactly
        // once, so we use a per-card flag to absorb that second synthetic event.
        form.querySelectorAll('.buy-order-card').forEach(function (card) {
            var skipNextRadioClick = false;
            card.addEventListener('click', function (e) {
                if (e.target.closest && e.target.closest('.submit-choice-label')) {
                    // Label click: browser will fire a synthetic radio click next;
                    // mark it so we skip that one and don't assign priority twice.
                    skipNextRadioClick = true;
                } else if (e.target.type === 'radio') {
                    if (skipNextRadioClick) {
                        // This is the synthetic follow-up from a label click – skip it.
                        skipNextRadioClick = false;
                        return;
                    }
                    // Direct click on the radio dot – fall through to assign priority.
                }

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

        // Apply pre-filled state immediately (badges + submit button enabled state)
        refresh();

        // Pre-fill note textarea if editing a pro build
        if (isPro && existingSubmission && existingSubmission.note) {
            var noteTextarea = document.getElementById('comm-note-' + characterId);
            if (noteTextarea) noteTextarea.value = existingSubmission.note;
        }

        // Live character counter for the note field
        if (isPro) {
            var noteInput = document.getElementById('comm-note-' + characterId);
            var noteCounter = document.getElementById('comm-note-counter-' + characterId);
            if (noteInput && noteCounter) {
                var updateCounter = function () {
                    noteCounter.textContent = noteInput.value.length + '/1000';
                };
                updateCounter(); // set initial value (covers pre-filled edit case)
                noteInput.addEventListener('input', updateCounter);
            }
        }

        if (resetBtn) resetBtn.addEventListener('click', resetOrder);

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            errorEl.style.display = 'none';

            var noteInput = isPro ? document.getElementById('comm-note-' + characterId) : null;
            var note = noteInput ? noteInput.value.trim() : null;

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

            submitBuyOrder(characterId, choices, note).then(function () {
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

        Promise.all([fetchAggregates(characterId), getUser(), fetchMyProfile()]).then(function (res) {
            var aggs    = res[0];
            var user    = res[1];
            var profile = res[2]; // live DB row — overrides stale JWT claim
            var session = getSession();
            // Prefer the live DB value; fall back to JWT claim if the RPC failed
            var isPro   = profile ? !!profile.is_pro : !!(user && user.isPro);

            var communityPanelId = 'comm-panel-community-' + characterId;
            var proBuildsContentId = 'comm-pb-content-' + characterId;

            // Build the section shell with two tabs
            var shell = '' +
                '<section class="community-section">' +
                    '<h3 class="visualizer-section-title">Community</h3>' +
                    '<div class="community-tabs" id="comm-tabs-' + escapeHtml(characterId) + '">' +
                        '<button class="community-tab community-tab--active" data-tab="community">Community</button>' +
                        '<button class="community-tab" data-tab="pro-builds">Top-Player Builds</button>' +
                    '</div>' +
                    '<div class="community-tab-panel" id="' + escapeHtml(communityPanelId) + '">' +
                        (aggs ? buildAggregatesHtml(aggs) : '') +
                        (!user ? buildLoginPromptHtml(characterId) : '') +
                    '</div>' +
                    '<div class="community-tab-panel" id="comm-panel-pro-builds-' + escapeHtml(characterId) + '" style="display:none">' +
                        '<div id="' + escapeHtml(proBuildsContentId) + '"><p class="community-empty">Loading...</p></div>' +
                    '</div>' +
                '</section>';

            container.insertAdjacentHTML('beforeend', shell);

            // Tab switching + lazy-load pro builds
            var tabsEl = document.getElementById('comm-tabs-' + characterId);
            var proBuildsLoaded = false;

            if (tabsEl) {
                tabsEl.addEventListener('click', function (e) {
                    var btn = e.target.closest('.community-tab');
                    if (!btn) return;
                    var tab = btn.getAttribute('data-tab');

                    tabsEl.querySelectorAll('.community-tab').forEach(function (b) {
                        b.classList.toggle('community-tab--active', b === btn);
                    });

                    var p1 = document.getElementById(communityPanelId);
                    var p2 = document.getElementById('comm-panel-pro-builds-' + characterId);
                    if (p1) p1.style.display = tab === 'community'  ? '' : 'none';
                    if (p2) p2.style.display = tab === 'pro-builds' ? '' : 'none';

                    if (tab === 'pro-builds' && !proBuildsLoaded) {
                        proBuildsLoaded = true;
                        fetchProBuilds(characterId).then(function (builds) {
                            var el = document.getElementById(proBuildsContentId);
                            if (el) {
                                el.innerHTML = buildProBuildsHtml(builds, char, characterId);
                                wireProSearch(characterId);
                            }
                        }).catch(function () {
                            var el = document.getElementById(proBuildsContentId);
                            if (el) el.innerHTML = '<p class="community-empty">Failed to load top-player builds.</p>';
                        });
                    }
                });
            }

            // Wire login if logged out
            if (!user) {
                var loginBtn = document.getElementById('comm-login-' + characterId);
                if (loginBtn) loginBtn.addEventListener('click', signInWithDiscord);
                return;
            }

            // Wire submit form for logged-in users
            hasVoted(characterId, session).then(function (voted) {
                var communityPanel = document.getElementById(communityPanelId);
                if (!communityPanel) return;

                communityPanel.insertAdjacentHTML('beforeend', buildSubmitFormHtml(char, voted, isPro));

                function wireSignout() {
                    var btn = document.getElementById('comm-signout-' + characterId);
                    if (btn) btn.addEventListener('click', function () {
                        signOut().then(function () { global.location.reload(); });
                    });
                }

                function switchToForm(existingSubmission) {
                    var existingChoices = existingSubmission
                        ? existingSubmission.submission_choices || []
                        : null;
                    var votedDiv = communityPanel.querySelector('.community-voted');
                    if (votedDiv) votedDiv.outerHTML = buildSubmitFormHtml(char, false, isPro, existingChoices);
                    attachFormListeners(characterId, char, isPro, existingSubmission);
                    wireSignout();
                }

                if (voted) {
                    var editBtn = document.getElementById('comm-edit-' + characterId);
                    var editErr = document.getElementById('comm-edit-error-' + characterId);
                    if (editBtn) {
                        editBtn.addEventListener('click', function () {
                            editBtn.disabled = true;
                            editBtn.textContent = 'Loading...';
                            if (editErr) editErr.style.display = 'none';
                            // Fetch their existing choices before switching — the
                            // actual deletion happens inside submit_build when they
                            // re-submit, so closing the modal without re-submitting
                            // leaves the original build intact.
                            fetchMySubmission(characterId).then(function (existing) {
                                switchToForm(existing);
                            }).catch(function () {
                                // Still open the form even if fetch fails; it just won't pre-fill
                                switchToForm(null);
                            });
                        });
                    }
                } else {
                    attachFormListeners(characterId, char, isPro, null);
                    wireSignout();
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
        fetchProBuilds: fetchProBuilds,
        computeRankedPriorities: computeRankedPriorities,
        submitBuyOrder: submitBuyOrder,
        enhanceModal: enhanceModal
    };
})(window);
