export const footnoteReferenceMatcher = {
    matchProperty: "footnoteReference",
    resolve(object, parseChildren) {
        const footnoteReference = object;
        const { footnoteNumber, footnoteId } = footnoteReference;
        if (!(footnoteNumber && footnoteId))
            return false;
        return {
            type: "footnoteReference",
            footnoteNumber: Number(footnoteNumber),
            footnoteId
        };
    }
};
//# sourceMappingURL=footnote.js.map