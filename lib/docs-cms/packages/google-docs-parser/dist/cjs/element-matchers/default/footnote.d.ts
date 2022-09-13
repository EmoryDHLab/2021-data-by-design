import { elementMatcher } from "../types";
export declare type footnoteReference = {
    type: "footnoteReference";
    footnoteId: string;
    footnoteNumber: number;
};
export declare const footnoteReferenceMatcher: elementMatcher;
