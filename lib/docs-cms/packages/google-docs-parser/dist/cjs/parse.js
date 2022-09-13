"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDoc = exports.parseContentArray = void 0;
const default_1 = require("./element-matchers/default");
const listParsing = __importStar(require("./listParsing"));
let usingMatchers = default_1.elementMatchers;
function parseContent(obj) {
    const matcher = usingMatchers
        .find(matcher => matcher.matchProperty in obj);
    if (matcher) {
        return matcher.resolve(obj[matcher.matchProperty], parseContentArray);
    }
    return Object.assign({ type: "unmatched" }, obj);
}
function parseContentArray(contentArray, extractLists = true) {
    const array = extractLists ? listParsing.extractLists(contentArray) : contentArray;
    return array.map(c => parseContent(c)).filter(Boolean);
}
exports.parseContentArray = parseContentArray;
function parseDoc(doc, elementMatchers = undefined) {
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
exports.parseDoc = parseDoc;
//# sourceMappingURL=parse.js.map