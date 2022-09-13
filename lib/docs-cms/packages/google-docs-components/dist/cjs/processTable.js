"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function matchesName(componentDef, title) {
    const matchers = Array.isArray(componentDef.matchName) ? componentDef.matchName : [componentDef.matchName];
    if (matchers.find(matcher => matcher == title)) {
        return true;
    }
    return false;
}
function matchesPropOrSlot(componentDef, key) {
    const matchesKey = name => name.toLowerCase() == key.toLowerCase();
    const foundProp = componentDef.props && Object.keys(componentDef.props).find(matchesKey);
    if (foundProp) {
        return { prop: foundProp };
    }
    if (componentDef.slots) {
        if (componentDef.slots === "any") {
            return { slot: key };
        }
        for (const slotDef of componentDef.slots) {
            if (typeof slotDef === "string") {
                if (matchesKey(slotDef)) {
                    return { slot: slotDef };
                }
                continue;
            }
            if (typeof slotDef === "function") {
                if (slotDef(key)) {
                    return { slot: key };
                }
                continue;
            }
            if (slotDef.test(key)) {
                return { slot: key };
            }
        }
    }
    const foundSlot = componentDef.slots && Object.keys(componentDef.slots).find(matchesKey);
    if (foundSlot) {
        return { slot: foundSlot };
    }
    return false;
}
function parseSimple(element) {
    if (element.children.length != 1) {
        return false;
    }
    const loneChild = element.children[0];
    let text;
    if (typeof loneChild == "string") {
        text = loneChild;
    }
    else if ("text" in loneChild) {
        text = loneChild.text;
    }
    else {
        return false;
    }
    text = text
        .replace("\n", "")
        .trim();
    return text;
}
function verifySimpleCell(cell) {
    if (cell.length != 1) {
        return { errorMessage: "must have one paragraph of content" };
    }
    const element = cell[0];
    if (typeof element === "string") {
        //Probably impossible, as Docs seems to always consider text within a cell as a paragraph
        return { text: element };
    }
    if ((element === null || element === void 0 ? void 0 : element.type) === "paragraph") {
        const tryToParse = parseSimple(element);
        if (tryToParse === false) {
            return { errorMessage: "must consist of a single line with uniform styling." };
        }
        return { text: tryToParse };
    }
    return { errorMessage: "must consist of a single, one-line paragraph." };
}
function findComponent(table, componentDefs) {
    if (table.rows.some(row => row.length > 2)) {
        return { error: "A row in the table has more than two entries" };
    }
    const titleCell = table.cells[0];
    const verifyTitle = verifySimpleCell(titleCell);
    if ("errorMessage" in verifyTitle) {
        return { error: `The dev slot or title cell ${verifyTitle.errorMessage})` };
    }
    const title = verifyTitle.text;
    const matchingDef = componentDefs.find(def => matchesName(def, title));
    if (matchingDef)
        return {
            component: matchingDef
        };
    if (table.rows.length == 1) {
        return {
            devSlot: {
                slot: title
            }
        };
    }
    return { error: `${title} isn't the name of a registered component` };
}
function default_1(componentDefs, inputTable, parseContent, defaultToTable = true, classProp = false) {
    var _a, _b;
    let matchingDef;
    const [componentNotFoundError, invalidPropError, tableFormatError, componentError] = ["ComponentNotFoundError", "InvalidPropError", "TableFormatError", "ComponentError"]
        .map((error) => (message) => {
        return Object.assign({ error, message }, (matchingDef && { parsingAs: matchingDef.componentName }));
    });
    const table = Object.assign({}, inputTable);
    let className;
    //TODO: have other kinds of automatically found props?
    if (classProp) {
        const propName = typeof classProp === "string" ? classProp : "class";
        const isClassPropRow = row => {
            if (row.length != 2
                || row.some(index => index < 0)
                || row[1] - row[0] != 1) {
                return false;
            }
            const firstCell = verifySimpleCell(table.cells[row[0]]);
            if ("text" in firstCell) {
                return firstCell.text.toLowerCase() == propName.toLowerCase();
            }
        };
        const foundRowIndex = table.rows.findIndex(isClassPropRow);
        const foundRow = table.rows[foundRowIndex];
        if (foundRow) {
            const valueCell = verifySimpleCell(table.cells[foundRow[1]]);
            if ("text" in valueCell) {
                className = valueCell.text;
            }
            const cellsRemoved = 2;
            const decrementedIndices = row => row.map(index => index - cellsRemoved);
            table.rows = [...table.rows.slice(0, foundRowIndex), ...table.rows.slice(foundRowIndex + 1).map(decrementedIndices)];
            table.cells = [...table.cells.slice(0, foundRow[0]), ...table.cells.slice(foundRow[0] + cellsRemoved)];
        }
    }
    const found = findComponent(table, componentDefs);
    if (found.error) {
        if (defaultToTable) {
            const data = Object.assign({ rows: table.rows, cells: table.cells.map(parseContent) }, (className && { className }));
            return data;
        }
        return componentNotFoundError(found.error);
    }
    if (found.devSlot) {
        return found.devSlot;
    }
    matchingDef = found.component;
    const returnData = Object.assign({ component: matchingDef.componentName }, (className && { className }));
    const isSlot = row => (row.length == 1 || row[0] == row[1]);
    const defaultSlotIndex = table.rows.findIndex((row, index) => (index > 0) && isSlot(row));
    if (defaultSlotIndex > -1) {
        if (defaultSlotIndex != table.rows.length - 1)
            return tableFormatError("There's a default slot (a row with one entry) that isn't the last row");
        const cellIndex = table.rows[defaultSlotIndex][0];
        returnData.slots = {
            default: parseContent(table.cells[cellIndex])
        };
    }
    const requiredProps = new Set();
    if (matchingDef.props) {
        Object.keys(matchingDef.props).forEach(prop => {
            if (matchingDef.props[prop].required) {
                requiredProps.add(prop);
            }
        });
    }
    const keyValueRows = table.rows.slice(1, defaultSlotIndex > -1 ? defaultSlotIndex : table.rows.length);
    if (keyValueRows.length) {
        for (let i = keyValueRows.length - 1; i >= 0; i--) {
            const row = keyValueRows[i];
            const keyCell = table.cells[row[0]];
            const verifyKey = verifySimpleCell(keyCell);
            if ("errorMessage" in verifyKey) {
                return tableFormatError(`Row #${i + 2}'s first cell is a prop or slot key cell. It ${verifyKey.errorMessage}`);
            }
            const keyString = verifyKey.text;
            const matches = matchesPropOrSlot(matchingDef, keyString);
            if (!matches) {
                return invalidPropError(`Key ${keyString} on row #${i + 2} doesn't match a prop or slot on component ${matchingDef.componentName}`);
            }
            const valueCell = table.cells[row[1]];
            if ("slot" in matches) {
                if ((_a = returnData.slots) === null || _a === void 0 ? void 0 : _a[matches.slot]) {
                    return invalidPropError(`Slot ${matches.slot} cannot be set twice.`);
                }
                if (!returnData.slots) {
                    returnData.slots = {};
                }
                returnData.slots[matches.slot] = parseContent(valueCell);
                continue;
            }
            if ((_b = returnData.props) === null || _b === void 0 ? void 0 : _b[matches.prop]) {
                return invalidPropError(`Prop ${matches.prop} cannot be set twice.`);
            }
            const verifyValue = verifySimpleCell(valueCell);
            if ("errorMessage" in verifyValue) {
                return tableFormatError(`The value cell for prop ${matches.prop} isn't formatted correctly. It ${verifyValue.errorMessage}`);
            }
            let value = verifyValue.text;
            if (matchingDef.props[matches.prop].type == "number") {
                value = Number(value);
            }
            if (!returnData.props) {
                returnData.props = {};
            }
            returnData.props[matches.prop] = value;
            requiredProps.delete(matches.prop);
        }
    }
    if (requiredProps.size > 0) {
        const string = Array.from(requiredProps).join(", ");
        return componentError("Missing required props: " + string);
    }
    return returnData;
}
exports.default = default_1;
//# sourceMappingURL=processTable.js.map