export const paragraphMatcher = {
    matchProperty: "paragraph",
    resolve(object, parseChildren) {
        var _a, _b;
        const paragraph = object;
        if (paragraph.elements) {
            const children = [];
            parseChildren(paragraph.elements).forEach(el => {
                var _a;
                if (!el)
                    return;
                if (el == "\n" || ((_a = el) === null || _a === void 0 ? void 0 : _a.text) == "\n")
                    return;
                const lastAdded = children.length && children[children.length - 1];
                if (typeof lastAdded == "string" && typeof el == "string") {
                    children[children.length - 1] += el;
                    return;
                }
                children.push(el);
            });
            if (children.length == 0)
                return false;
            const isSimple = children.length == 1 && typeof children[0] == "string";
            const properties = Object.assign({ children }, (isSimple && { simple: true }));
            if ((_b = (_a = paragraph.paragraphStyle) === null || _a === void 0 ? void 0 : _a.namedStyleType) === null || _b === void 0 ? void 0 : _b.includes("HEADING")) {
                const size = Number(paragraph.paragraphStyle.namedStyleType.split('_')[1]);
                return Object.assign({ type: "header", size }, properties);
            }
            return Object.assign({ type: "paragraph" }, properties);
        }
        return false;
    }
};
//# sourceMappingURL=paragraph.js.map