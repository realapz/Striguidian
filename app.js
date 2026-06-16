/**
 * Strinova Weapon Upgrade Guide - Core Client Script (APZ Guides)
 */

document.addEventListener('DOMContentLoaded', () => {
    // State
    let characters = [];
    let activeRoleFilter = 'all';
    let searchQuery = '';
    const rankingCache = {};
    const rankingFetchStarted = {};
    const choiceCache = {};

    // Cache DOM Elements
    const gridContainer = document.getElementById('characters-grid-container');
    const searchInput = document.getElementById('character-search');
    const roleFiltersContainer = document.getElementById('role-filters');
    const gridHeader = document.getElementById('grid-header');
    
    // Modal Elements
    const detailModal = document.getElementById('character-detail-modal');
    const modalDetailsBody = document.getElementById('modal-details-body');
    const modalCloseButton = document.getElementById('modal-close-button');
    const modalCloseBackdrop = document.getElementById('modal-close-backdrop');

    // Initialize Character Data from static data.js
    function init() {
        if (typeof STRINOVA_DATA !== 'undefined') {
            characters = STRINOVA_DATA;
            renderGrid();
        } else {
            console.error('Initialization Error: STRINOVA_DATA is undefined');
            gridContainer.innerHTML = `
                <div class="loading-spinner" style="color: var(--accent-pink);">
                    Error: Character database failed to load.
                </div>
            `;
        }
    }

    // Render Character Grid based on Filters
    function renderGrid() {
        // Clear Grid
        gridContainer.innerHTML = '';

        // Filter Characters
        const filteredCharacters = characters.filter(char => {
            const matchesRole = activeRoleFilter === 'all' || char.role.toLowerCase() === activeRoleFilter.toLowerCase();
            
            const normalizedQuery = searchQuery.toLowerCase().trim();
            const matchesSearch = normalizedQuery === '' ||
                char.name.toLowerCase().includes(normalizedQuery) ||
                char.weaponType.toLowerCase().includes(normalizedQuery) ||
                char.role.toLowerCase().includes(normalizedQuery);

            return matchesRole && matchesSearch;
        });

        // Update Grid Header text
        const activeFilterBtn = roleFiltersContainer.querySelector('.filter-btn.active');
        const roleLabel = activeFilterBtn ? activeFilterBtn.textContent : 'All Roles';
        gridHeader.textContent = searchQuery ? `Search Results for "${searchQuery}"` : `${roleLabel} Characters`;

        // Render Empty State
        if (filteredCharacters.length === 0) {
            gridContainer.innerHTML = `
                <div class="loading-spinner">
                    No characters found matching your search.
                </div>
            `;
            return;
        }

        // Render Cards
        filteredCharacters.forEach(char => {
            const card = document.createElement('article');
            card.className = 'character-card';
            card.style.setProperty('--card-theme', char.themeColor);
            card.id = `char-card-${char.id}`;
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-haspopup', 'dialog');
            card.setAttribute('aria-label', `View weapon upgrades for ${char.name}`);

            const miniStepsHTML = buildMiniStepsHtml(char);

            card.innerHTML = `
                <div class="card-header-area">
                    <div class="avatar-graphic">
                        ${char.imageUrl ? `<img src="${char.imageUrl}" alt="${char.name}" class="avatar-img">` : `<span class="avatar-letter">${char.name.charAt(0)}</span>`}
                    </div>
                    <span class="role-badge">${char.role}</span>
                </div>
                <div class="character-info-wrapper">
                    <h3 class="character-name">${char.name}</h3>
                    <div class="weapon-subinfo">
                        <span>${char.weaponType}</span>
                    </div>
                </div>
                <div class="quick-path-summary">
                    <div class="quick-path-title">Top Buy Order</div>
                    <div class="path-steps-mini" id="path-steps-${char.id}">
                        ${miniStepsHTML}
                    </div>
                </div>
            `;

            // Event Listeners for Opening Modal
            card.addEventListener('click', () => openCharacterDetails(char));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openCharacterDetails(char);
                }
            });

            gridContainer.appendChild(card);
            ensureRankingLoaded(char);
        });
    }

    // Build the "Top Buy Order" mini-steps HTML, using the live vote-based
    // ranking and chosen option once loaded, falling back to static data.js values until then
    function buildMiniStepsHtml(char) {
        const ranking = rankingCache[char.id];
        const choices = choiceCache[char.id];
        const chosenUpgradesSorted = char.upgradePairs
            .map(pair => {
                const liveChoice = choices && choices[pair.category];
                const useB = pair.optionB && (liveChoice ? liveChoice === 'B' : pair.recommended === 'B');
                const upgrade = useB ? pair.optionB : pair.optionA;
                return {
                    name: upgrade.name,
                    priority: (ranking && ranking[pair.category]) || pair.buyPriority
                };
            })
            .sort((a, b) => a.priority - b.priority);

        return chosenUpgradesSorted.map((upg, index) => {
            const arrow = index < chosenUpgradesSorted.length - 1 ? '<span class="mini-step-arrow">&rarr;</span>' : '';
            return `
                <span class="mini-step-badge">${upg.name}</span>
                ${arrow}
            `;
        }).join('');
    }

    // Pick the live-winning option (A or B) per category: pro consensus wins,
    // falling back to community consensus when no pro data exists
    function computeChoiceMap(aggregates) {
        const map = {};
        [...(aggregates.community || []), ...(aggregates.pro || [])].forEach(row => {
            const pctA = Number(row.pct_a) || 0;
            const pctB = 100 - pctA;
            map[row.category] = pctA >= pctB ? 'A' : 'B';
        });
        return map;
    }

    // Fetch live priority votes and consensus choices for a character once,
    // then refresh its card in place
    function ensureRankingLoaded(char) {
        if (rankingFetchStarted[char.id]) return;
        rankingFetchStarted[char.id] = true;

        if (typeof Community === 'undefined' || !Community.isEnabled()) return;

        Promise.all([
            Community.fetchPriorityVotes(char.id),
            Community.fetchAggregates(char.id)
        ]).then(([votes, aggregates]) => {
            let changed = false;
            if (votes && votes.length) {
                rankingCache[char.id] = Community.computeRankedPriorities(char, votes);
                changed = true;
            }
            if (aggregates) {
                choiceCache[char.id] = computeChoiceMap(aggregates);
                changed = true;
            }
            if (!changed) return;
            const container = document.getElementById(`path-steps-${char.id}`);
            if (container) container.innerHTML = buildMiniStepsHtml(char);
        });
    }

    // Open Character Details Modal
    function openCharacterDetails(char) {
        modalDetailsBody.style.setProperty('--modal-theme', char.themeColor);
        
        // Generate buy order pairs HTML
        const pairsHTML = char.upgradePairs.map((pair, pairIndex) => {
            const optionA = pair.optionA;
            const optionB = pair.optionB;
            const isAChosen = pair.recommended === 'A';
            const isBChosen = pair.recommended === 'B';

            if (!optionB) {
                return `
                    <div class="upgrade-pair-row">
                        <div class="upgrade-pair-header">
                            <span class="upgrade-category-title">${pair.category}</span>
                            <span class="buy-priority-tag" id="priority-tag-${char.id}-${pairIndex}">Buy Priority #${pair.buyPriority}</span>
                        </div>
                        <div class="upgrade-pair-grid single-option">
                            <div class="upgrade-choice-card chosen">
                                <span class="choice-card-name">${optionA.name}</span>
                                <div class="choice-percentage-bar-area">
                                    <span class="choice-percent-number">${optionA.consensus}%</span>
                                    <div class="choice-percent-track">
                                        <div class="choice-percent-fill" id="fill-${char.id}-${optionA.id}" style="width: 0%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }

            return `
                <div class="upgrade-pair-row">
                    <div class="upgrade-pair-header">
                        <span class="upgrade-category-title">${pair.category}</span>
                        <span class="buy-priority-tag" id="priority-tag-${char.id}-${pairIndex}">Buy Priority #${pair.buyPriority}</span>
                    </div>
                    <div class="upgrade-pair-grid">
                        <!-- Option A Card -->
                        <div class="upgrade-choice-card ${isAChosen ? 'chosen' : 'subdued'}">
                            <span class="choice-card-name">${optionA.name}</span>
                            <div class="choice-percentage-bar-area">
                                <span class="choice-percent-number">${optionA.consensus}%</span>
                                <div class="choice-percent-track">
                                    <div class="choice-percent-fill" id="fill-${char.id}-${optionA.id}" style="width: 0%"></div>
                                </div>
                            </div>
                        </div>
                        <!-- Option B Card -->
                        <div class="upgrade-choice-card ${isBChosen ? 'chosen' : 'subdued'}">
                            <span class="choice-card-name">${optionB.name}</span>
                            <div class="choice-percentage-bar-area">
                                <span class="choice-percent-number">${optionB.consensus}%</span>
                                <div class="choice-percent-track">
                                    <div class="choice-percent-fill" id="fill-${char.id}-${optionB.id}" style="width: 0%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        modalDetailsBody.innerHTML = `
            <div class="detail-header">
                <div class="modal-avatar" style="--modal-theme: ${char.themeColor}">
                    ${char.imageUrl ? `<img src="${char.imageUrl}" alt="${char.name}" class="modal-avatar-img">` : `<span class="modal-avatar-letter">${char.name.charAt(0)}</span>`}
                </div>
                <div class="detail-header-text">
                    <h2 class="detail-character-name">${char.name}</h2>
                    <div class="detail-sub-row">
                        <span class="role-badge" style="border-color: ${char.themeColor}; color: ${char.themeColor}">${char.role}</span>
                        <span class="detail-weapon-info">${char.weaponType}</span>
                    </div>
                </div>
            </div>
            
            <section class="buy-order-section">
                <h3 class="visualizer-section-title">Upgrade Decision Matrix</h3>
                <div class="upgrade-pairs-container">
                    ${pairsHTML}
                </div>
            </section>
            ${char.notes ? `
            <section class="notes-section">
                <h3 class="visualizer-section-title">Notes</h3>
                <p class="character-notes">${char.notes}</p>
            </section>
            ` : ''}
        `;

        // Open Dialog
        detailModal.showModal();
        document.body.style.overflow = 'hidden'; // Block background scroll

        // Append community consensus panel if the community layer is active
        if (typeof Community !== 'undefined') {
            Community.enhanceModal(char.id, modalDetailsBody, char);

            // Overlay real pro-submission data onto the main matrix, once it exists
            if (Community.isEnabled()) {
                Community.fetchAggregates(char.id).then(aggregates => {
                    if (!aggregates) return;
                    choiceCache[char.id] = computeChoiceMap(aggregates);
                    const cardContainer = document.getElementById(`path-steps-${char.id}`);
                    if (cardContainer) cardContainer.innerHTML = buildMiniStepsHtml(char);
                    if (aggregates.pro && aggregates.pro.length) {
                        applyProConsensus(char, aggregates.pro);
                    }
                });

                rankingFetchStarted[char.id] = true;
                Community.fetchPriorityVotes(char.id).then(votes => {
                    if (votes && votes.length) {
                        const ranking = Community.computeRankedPriorities(char, votes);
                        rankingCache[char.id] = ranking;
                        applyRankedPriorities(char, ranking);
                        const cardContainer = document.getElementById(`path-steps-${char.id}`);
                        if (cardContainer) cardContainer.innerHTML = buildMiniStepsHtml(char);
                    }
                });
            }
        }

        // Animate the progress fills after modal displays
        setTimeout(() => {
            char.upgradePairs.forEach(pair => {
                const fillA = document.getElementById(`fill-${char.id}-${pair.optionA.id}`);
                const fillB = pair.optionB ? document.getElementById(`fill-${char.id}-${pair.optionB.id}`) : null;
                if (fillA) fillA.style.width = `${pair.optionA.consensus}%`;
                if (fillB) fillB.style.width = `${pair.optionB.consensus}%`;
            });
        }, 100);
    }

    // Override the static Buy Order Matrix percentages with live pro-submission data
    function applyProConsensus(char, proRows) {
        const rowsByCategory = {};
        proRows.forEach(row => { rowsByCategory[row.category] = row; });

        char.upgradePairs.forEach(pair => {
            const row = rowsByCategory[pair.category];
            if (!row || !pair.optionB) return; // skip categories with no live data, or single-option entries

            const pctA = Number(row.pct_a) || 0;
            const pctB = 100 - pctA;

            const fillA = document.getElementById(`fill-${char.id}-${pair.optionA.id}`);
            const fillB = document.getElementById(`fill-${char.id}-${pair.optionB.id}`);
            const cardA = fillA ? fillA.closest('.upgrade-choice-card') : null;
            const cardB = fillB ? fillB.closest('.upgrade-choice-card') : null;

            if (cardA) cardA.querySelector('.choice-percent-number').textContent = `${pctA}%`;
            if (cardB) cardB.querySelector('.choice-percent-number').textContent = `${pctB}%`;
            if (fillA) fillA.style.width = `${pctA}%`;
            if (fillB) fillB.style.width = `${pctB}%`;

            if (cardA && cardB) {
                const aChosen = pctA >= pctB;
                cardA.classList.toggle('chosen', aChosen);
                cardA.classList.toggle('subdued', !aChosen);
                cardB.classList.toggle('chosen', !aChosen);
                cardB.classList.toggle('subdued', aChosen);
            }
        });
    }

    // Re-rank the displayed "Buy Priority #" tags using live submission votes
    function applyRankedPriorities(char, ranking) {
        char.upgradePairs.forEach((pair, i) => {
            const rank = ranking[pair.category];
            if (!rank) return;
            const tag = document.getElementById(`priority-tag-${char.id}-${i}`);
            if (tag) tag.textContent = `Buy Priority #${rank}`;
        });
    }

    // Close Modal
    function closeModal() {
        detailModal.close();
        document.body.style.overflow = ''; // Restore scroll
    }

    // Modal Close Listeners
    modalCloseButton.addEventListener('click', closeModal);
    modalCloseBackdrop.addEventListener('click', closeModal);
    detailModal.addEventListener('close', () => {
        document.body.style.overflow = '';
    });

    // Handle Search Input
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderGrid();
    });

    // Handle Role Filter Clicks
    roleFiltersContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        // Toggle Active Classes
        roleFiltersContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update active filter and render
        activeRoleFilter = btn.dataset.role;
        renderGrid();
    });

    // Run app initialization
    init();
});
