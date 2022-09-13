"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMatcher = void 0;
exports.listMatcher = {
    matchProperty: "list",
    resolve(object, parseChildren) {
        const rawList = object;
        return {
            type: "list",
            ordered: !!rawList.properties.glyphType,
            items: parseChildren(rawList.items, false),
        };
    }
};
//# sourceMappingURL=list.js.map