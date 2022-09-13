import { elementMatcher, element } from "../types";
export declare type list = {
    type: "list";
    ordered: boolean;
    items: Array<element>;
};
export declare const listMatcher: elementMatcher;
