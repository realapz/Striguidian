/**
 * Data-integrity checker for data.js.
 *
 * data.js is a plain browser script that assigns a global `STRINOVA_DATA`
 * (no module export), so we read it as text and evaluate it in a sandbox to
 * recover the array. Runs with plain `node` — zero dependencies, no installs.
 *
 * Usage:   node scripts/check-data.js
 * Exits 0 and prints "OK: <N> characters, 0 problems" when the data is valid;
 * exits 1 and prints one line per problem (naming the offending record) otherwise.
 */

const fs = require('fs');
const vm = require('vm');
const path = require('path');

// Roles that appear in the data. NOTE: index.html currently only renders filter
// buttons for Duelist/Vanguard/Sentinel/Support — "Controller" characters exist
// in the data but are not reachable by any role filter (a UI gap, not a data bug).
const VALID_ROLES = ['Duelist', 'Vanguard', 'Sentinel', 'Support', 'Controller'];

function loadData() {
    const src = fs.readFileSync(path.join(__dirname, '..', 'data.js'), 'utf8');
    // data.js declares `const STRINOVA_DATA = [...]`. A top-level `const` does
    // not attach to the vm sandbox object, so we append a trailing expression
    // and use its completion value (works for const/let/var alike).
    return vm.runInNewContext(src + '\n;STRINOVA_DATA;', {});
}

function isNonEmptyString(v) {
    return typeof v === 'string' && v.trim() !== '';
}

function check(data) {
    const problems = [];

    if (!Array.isArray(data)) {
        problems.push('STRINOVA_DATA is not an array (or is undefined)');
        return problems;
    }

    const seenIds = new Map();

    data.forEach((char, index) => {
        const where = isNonEmptyString(char && char.id) ? char.id : `index ${index}`;

        // Schema: required character fields.
        ['id', 'name', 'role', 'weaponType'].forEach(field => {
            if (!isNonEmptyString(char && char[field])) {
                problems.push(`${where}: missing or empty "${field}"`);
            }
        });

        // role must be one of the known filter values.
        if (char && char.role !== undefined && !VALID_ROLES.includes(char.role)) {
            problems.push(`${where}: role "${char.role}" is not one of ${VALID_ROLES.join(', ')}`);
        }

        // Unique id across all characters.
        if (char && isNonEmptyString(char.id)) {
            if (seenIds.has(char.id)) {
                problems.push(`${where}: duplicate id (also at index ${seenIds.get(char.id)})`);
            } else {
                seenIds.set(char.id, index);
            }
        }

        // upgradePairs must be an array.
        if (!Array.isArray(char && char.upgradePairs)) {
            problems.push(`${where}: "upgradePairs" is not an array`);
            return;
        }

        char.upgradePairs.forEach(pair => {
            const cat = isNonEmptyString(pair && pair.category) ? pair.category : '(unnamed pair)';
            const at = `${where} / ${cat}`;

            if (!isNonEmptyString(pair.category)) {
                problems.push(`${at}: missing or empty "category"`);
            }
            if (pair.recommended !== 'A' && pair.recommended !== 'B') {
                problems.push(`${at}: "recommended" is ${JSON.stringify(pair.recommended)}, expected "A" or "B"`);
            }
            if (typeof pair.buyPriority !== 'number' || Number.isNaN(pair.buyPriority)) {
                problems.push(`${at}: "buyPriority" is not a number`);
            }

            ['optionA', 'optionB'].forEach(key => {
                const opt = pair[key];
                if (!opt || typeof opt !== 'object') {
                    problems.push(`${at}: "${key}" is missing`);
                    return;
                }
                if (!isNonEmptyString(opt.id)) {
                    problems.push(`${at}: "${key}.id" is missing or empty`);
                }
                if (!isNonEmptyString(opt.name)) {
                    problems.push(`${at}: "${key}.name" is missing or empty`);
                }
                if (typeof opt.consensus !== 'number' || Number.isNaN(opt.consensus)) {
                    problems.push(`${at}: "${key}.consensus" is not a number`);
                }
            });

            // Invariant: the two consensus values must sum to 100.
            const a = pair.optionA && pair.optionA.consensus;
            const b = pair.optionB && pair.optionB.consensus;
            if (typeof a === 'number' && typeof b === 'number' && a + b !== 100) {
                problems.push(`${at}: consensus values sum to ${a + b}, expected 100 (A=${a}, B=${b})`);
            }
        });
    });

    return problems;
}

function main() {
    let data;
    try {
        data = loadData();
    } catch (err) {
        console.error('Failed to load data.js:', err.message);
        process.exit(1);
    }

    const problems = check(data);
    const count = Array.isArray(data) ? data.length : 0;

    if (problems.length === 0) {
        console.log(`OK: ${count} characters, 0 problems`);
        process.exit(0);
    }

    problems.forEach(p => console.log(p));
    console.log(`\nFAIL: ${count} characters, ${problems.length} problem(s)`);
    process.exit(1);
}

main();
