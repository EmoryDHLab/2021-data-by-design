import {paragraphMatcher, paragraph, header} from "./paragraph";
import {textRunMatcher, styledText} from "./text";
import {tableMatcher, table} from "./table";
import {footnoteReferenceMatcher, footnoteReference} from "./footnote";
import {listMatcher, list} from "./list";

export const elementMatchers = [paragraphMatcher, tableMatcher, textRunMatcher, footnoteReferenceMatcher, listMatcher];
export type { paragraph, header, styledText, table, footnoteReference, list }