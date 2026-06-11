/**
 * Strinova Weapon Upgrade Guide - Core Client Script (APZ Guides)
 */

document.addEventListener('DOMContentLoaded', () => {
    // State
    let characters = [];
    let activeRoleFilter = 'all';
    let searchQuery = '';

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
                char.weaponName.toLowerCase().includes(normalizedQuery) ||
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

            // Pre-calculate short names for buy order to show on card
            const miniStepsHTML = char.buyOrder.map((stepId, index) => {
                const upgrade = char.upgrades.find(u => u.id === stepId);
                const stepLabel = upgrade ? upgrade.name : stepId;
                const arrow = index < char.buyOrder.length - 1 ? '<span class="mini-step-arrow">&rarr;</span>' : '';
                return `
                    <span class="mini-step-badge">${stepLabel}</span>
                    ${arrow}
                `;
            }).join('');

            card.innerHTML = `
                <div class="card-header-area">
                    <div class="avatar-graphic">
                        <span class="avatar-letter">${char.name.charAt(0)}</span>
                    </div>
                    <span class="role-badge">${char.role}</span>
                </div>
                <div class="character-info-wrapper">
                    <h3 class="character-name">${char.name}</h3>
                    <div class="weapon-subinfo">
                        <span>${char.weaponName}</span>
                        <span class="weapon-dot"></span>
                        <span>${char.weaponType}</span>
                    </div>
                </div>
                <div class="quick-path-summary">
                    <div class="quick-path-title">Top Buy Order</div>
                    <div class="path-steps-mini">
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
        });
    }

    // Open Character Details Modal
    function openCharacterDetails(char) {
        modalDetailsBody.style.setProperty('--modal-theme', char.themeColor);
        
        // Generate buy order timeline HTML
        const timelineHTML = char.buyOrder.map((stepId, index) => {
            const upgrade = char.upgrades.find(u => u.id === stepId);
            if (!upgrade) return '';
            
            return `
                <div class="timeline-item">
                    <div class="timeline-number-node">${index + 1}</div>
                    <div class="timeline-card">
                        <div class="timeline-card-header">
                            <span class="upgrade-title">${upgrade.name}</span>
                            <span class="consensus-percentage-badge">${upgrade.consensus}% Buy First</span>
                        </div>
                        <p class="upgrade-effect">${upgrade.effect}</p>
                        <div class="consensus-metric-area">
                            <div class="consensus-progress-track">
                                <div class="consensus-progress-bar" id="progress-${char.id}-${stepId}" style="width: 0%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        modalDetailsBody.innerHTML = `
            <div class="detail-header">
                <div class="modal-avatar" style="--modal-theme: ${char.themeColor}">
                    <span class="modal-avatar-letter">${char.name.charAt(0)}</span>
                </div>
                <div class="detail-header-text">
                    <h2 class="detail-character-name">${char.name}</h2>
                    <div class="detail-sub-row">
                        <span class="role-badge" style="border-color: ${char.themeColor}; color: ${char.themeColor}">${char.role}</span>
                        <span class="detail-weapon-info">${char.weaponName} (${char.weaponType})</span>
                    </div>
                </div>
            </div>
            
            <p class="detail-description">${char.description}</p>
            
            <section class="buy-order-section">
                <h3 class="visualizer-section-title">Upgrade Build Priority</h3>
                <div class="timeline-flow">
                    ${timelineHTML}
                </div>
            </section>
        `;

        // Open Dialog
        detailModal.showModal();
        document.body.style.overflow = 'hidden'; // Block background scroll

        // Animate the progress bars after modal displays
        setTimeout(() => {
            char.buyOrder.forEach(stepId => {
                const upgrade = char.upgrades.find(u => u.id === stepId);
                if (upgrade) {
                    const progressBar = document.getElementById(`progress-${char.id}-${stepId}`);
                    if (progressBar) {
                        progressBar.style.width = `${upgrade.consensus}%`;
                    }
                }
            });
        }, 100);
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
