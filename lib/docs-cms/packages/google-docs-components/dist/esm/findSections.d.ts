import { ProcessedContent } from "./types";
declare type SectionDef = {
    name: string;
    start: string | RegExp;
    end?: string | RegExp;
    endByNextStart?: boolean;
    endByContentEnd?: boolean;
};
export default function findSections(contentArray: ProcessedContent, sectionDefs: Array<SectionDef>, allEnd?: string | RegExp): {
    [name: string]: {
        startString: string;
        startIndex: number;
        endIndex: number;
    }[];
};
export {};
