"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.footnoteReferenceMatcher = void 0;
exports.footnoteReferenceMatcher = {
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