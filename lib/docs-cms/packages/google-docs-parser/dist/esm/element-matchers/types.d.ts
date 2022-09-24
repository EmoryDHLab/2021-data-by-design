import { parseContentArray } from "../parse";
export declare type element = {
    type: string;
} | string;
export declare type elementMatcher = {
    matchProperty: string;
    resolve: (object: object, parseChildren: typeof parseContentArray) => element | false;
};
