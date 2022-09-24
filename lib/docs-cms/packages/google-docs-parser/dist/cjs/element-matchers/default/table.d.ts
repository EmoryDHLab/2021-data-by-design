import { element, elementMatcher } from "../types";
export declare type table = {
    type: "table";
    rows: Array<Array<number>>;
    cells: Array<Array<element>>;
};
export declare const tableMatcher: elementMatcher;
