import matchers from "./element-matchers/default";
let usingMatchers = matchers;
export function parseContent(obj) {
    const matcher = matchers
        .find(matcher => matcher.matchProperty in obj);
    if (matcher) {
        return matcher.resolve(obj[matcher.matchProperty], parseContent);
    }
    return {
        type: "unmatched",
        ...obj
    };
}
export function parseContentArray(contentArray) {
    return contentArray.map(c => parseContent(c)).filter(Boolean);
}
export function parseDoc(doc, elementMatchers) {
    if (elementMatchers) {
        usingMatchers = elementMatchers;
    }
    if (!doc)
        return;
    console.log("change 2");
    const body = parseContentArray(doc.body.content);
    const footnotes = doc.footnotes && Object.fromEntries(Object.entries(doc.footnotes)
        .map(([footnoteId, data]) => ([footnoteId, parseContentArray(data.content)])));
    const returnDoc = {
        readAt: Date.now(),
        title: doc.title,
        body,
        ...(footnotes && { footnotes })
    };
    return returnDoc;
}
//# sourceMappingURL=parse.js.map