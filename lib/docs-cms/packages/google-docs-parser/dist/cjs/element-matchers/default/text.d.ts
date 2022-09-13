import { elementMatcher } from "../types";
declare type textCSS = {
    color?: string;
    "background-color"?: string;
    "font-family"?: string;
    "font-weight"?: string;
    "font-size"?: string;
    "font-style"?: string;
    "text-decoration"?: string;
};
export declare type styledText = {
    type: "styledText";
    text: string;
    css: textCSS;
    link?: string;
};
export declare const textRunMatcher: elementMatcher;
export {};
