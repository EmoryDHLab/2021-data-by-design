import { element, elementMatcher } from "../types";
declare type textContent = {
    simple?: true;
    children: Array<element>;
};
export declare type paragraph = {
    type: "paragraph";
} & textContent;
export declare type header = {
    type: "header";
    size: number;
} & textContent;
export declare const paragraphMatcher: elementMatcher;
export {};
