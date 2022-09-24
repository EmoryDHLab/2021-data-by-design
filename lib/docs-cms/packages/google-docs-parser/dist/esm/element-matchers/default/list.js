export const listMatcher = {
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