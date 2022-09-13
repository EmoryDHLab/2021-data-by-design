import { docs_v1 } from "@googleapis/docs";
import { element, elementMatcher } from "./element-matchers/types";
export declare function parseContentArray(contentArray: Array<object>, extractLists?: boolean): Array<element>;
export declare type document = {
    readAt: number;
    title: string;
    body: Array<element>;
    footnotes?: {
        [footnoteId: string]: Array<element>;
    };
};
export declare function parseDoc(doc: docs_v1.Schema$Document, elementMatchers?: Array<elementMatcher> | undefined): document;
