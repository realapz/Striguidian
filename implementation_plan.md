# Strinova Weapon Upgrade Guide

A responsive, high-fidelity web application hosted on GitHub Pages that displays Strinova characters, their weapon upgrades (awakening perks), and the recommended upgrade buy orders based on top player recommendations (consensus percentages).

## User Review Required

> **Technical Stack Update**:
> Since Node.js is not installed on your system, we will build the site using **Vanilla HTML5, CSS3, and modern JavaScript (ES6)** instead of React/Vite.
> *   **No Install Required**: You do not need to install Node.js, npm, or run any package installers.
> *   **Premium Design**: We can still achieve the exact same stunning, responsive, and animated user interface using modern Vanilla CSS (variables, grids, animations) and JavaScript.

## Proposed Changes

We will create the web files directly in the root of your repository `C:/Users/Jeramiah/Documents/GitHub/apzguides`.

---

### [NEW] Web Frontend Files

#### [NEW] [index.html](file:///C:/Users/Jeramiah/Documents/GitHub/apzguides/index.html)
Main HTML5 entry point containing:
*   A header with logo and role navigation (Duelist, Sentinel, Controller, Support, Vanguard).
*   Search and filter controls.
*   A responsive grid containing Strinova character cards.
*   A detailed, interactive overlay/view for each character.

#### [NEW] [styles.css](file:///C:/Users/Jeramiah/Documents/GitHub/apzguides/styles.css)
Core styling using modern Vanilla CSS, featuring:
*   An anime-cyberpunk dark theme (deep navy/slate background, neon pink and blue glowing borders).
*   Smooth animations (fade-ins, button hover glows, progress bar fills).
*   A responsive grid layout.

#### [NEW] [app.js](file:///C:/Users/Jeramiah/Documents/GitHub/apzguides/app.js)
Frontend logic handling:
*   Dynamic rendering of character cards.
*   Filtering by character role and text search.
*   Showing/hiding the details view.
*   Displaying the step-by-step weapon upgrade buy order.

#### [NEW] [characters.json](file:///C:/Users/Jeramiah/Documents/GitHub/apzguides/characters.json)
Data file storing character details, weapon name, upgrade choices, and consensus buy-order percentages.

---

## Verification Plan

### Manual Verification
- Open `index.html` directly in your browser.
- Verify responsive layout on mobile, tablet, and desktop screens.
- Test filters (sorting characters by role or searching by name).
- Verify interactive elements (opening/closing details, weapon buy order progression).
