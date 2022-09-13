import { elementMatchers as matchers } from "./element-matchers/default";
import * as listParsing from "./listParsing";
let usingMatchers = matchers;
function parseContent(obj) {
    const matcher = usingMatchers
        .find(matcher => matcher.matchProperty in obj);
    if (matcher) {
        return matcher.resolve(obj[matcher.matchProperty], parseContentArray);
    }
    return Object.assign({ type: "unmatched" }, obj);
}
export function parseContentArray(contentArray, extractLists = true) {
    const array = extractLists ? listParsing.extractLists(contentArray) : contentArray;
    return array.map(c => parseContent(c)).filter(Boolean);
}
export function parseDoc(doc, elementMatchers = undefined) {
    if (elementMatchers) {
        usingMatchers = elementMatchers;
    }
    if (!doc)
        return;
    listParsing.registerLists(doc);
    const body = parseContentArray(doc.body.content);
    const footnotes = doc.footnotes && Object.fromEntries(Object.entries(doc.footnotes)
        .map(([footnoteId, data]) => ([footnoteId, parseContentArray(data.content)])));
    const returnDoc = Object.assign({ readAt: Date.now(), title: doc.title, body }, (footnotes && { footnotes }));
    return returnDoc;
}
//# sourceMappingURL=parse.js.map