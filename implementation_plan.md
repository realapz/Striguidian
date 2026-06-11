# Strinova Weapon Upgrade Guide

We are refining the site structure to support Strinova's game mechanics: **8 upgrades per weapon structured as 4 mutually exclusive binary pairs**. 

Players must choose one upgrade from each pair (e.g., Base Damage OR Rate of Fire) and then decide the priority buy order of their 4 selected choices.

## Proposed Changes

We will modify `data.js`, `styles.css`, and `app.js` in `C:/Users/Jeramiah/Documents/GitHub/apzguides`.

---

### [MODIFY] [data.js](file:///C:/Users/Jeramiah/Documents/GitHub/apzguides/data.js)
Refactor the dataset to define 4 upgrade pairs for each character. Each pair contains:
*   `type`: The categories (e.g., "Firepower", "Precision", "Sustain", "Handling").
*   `optionA` & `optionB`: Upgrade details including effect and top-player selection percentage.
*   `recommended`: Indicates which option is selected (e.g., "A" or "B").
*   `buyPriority`: A ranking (1 to 4) indicating when this selected upgrade is bought during the match.

### [MODIFY] [styles.css](file:///C:/Users/Jeramiah/Documents/GitHub/apzguides/styles.css)
Add styles for the binary-choice layout:
*   `upgrade-pair-row`: Flex layout displaying the two options side-by-side.
*   `upgrade-choice-card`: Styles for the individual upgrade blocks.
    *   **Chosen state**: Neon glow, colored borders, active priority badge (e.g., "#1 Buy").
    *   **Subdued state**: Lower opacity, crossed-out style or locked badge, signaling it is bypassed.
*   `vs-connector`: A central divider indicating the percentage split between choices (e.g., `85% vs 15%`).

### [MODIFY] [app.js](file:///C:/Users/Jeramiah/Documents/GitHub/apzguides/app.js)
Modify the details modal rendering logic to:
*   Render 4 rows of side-by-side binary comparison cards.
*   Clearly mark the chosen vs. unchosen upgrade in each pair.
*   Sort the timeline or show a secondary summary list highlighting the final `#1` to `#4` buy order sequence.

---

## Verification Plan

### Manual Verification
- Open `index.html` locally.
- Open a character detail modal and verify that all 4 pairs of upgrades are displayed side-by-side.
- Ensure the active/chosen upgrade is highlighted and the unchosen option is correctly dimmed.
- Verify that the buy order badges (#1 to #4) are correctly positioned on the chosen options.
