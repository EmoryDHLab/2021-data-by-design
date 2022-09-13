import {parseContentArray} from "../parse";

export type element = {
  type: string
} | string;

export type elementMatcher = {
  matchProperty: string,
  resolve: (object: object, parseChildren: typeof parseContentArray) => element | false
}
