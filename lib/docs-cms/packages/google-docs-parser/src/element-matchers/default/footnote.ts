import {elementMatcher} from "../types";
import {docs_v1} from "@googleapis/docs";

export type footnoteReference = {
  type: "footnoteReference",
  footnoteId: string,
  footnoteNumber: number,
}
export const footnoteReferenceMatcher: elementMatcher = {
  matchProperty: "footnoteReference",
  resolve(object, parseChildren): footnoteReference | false {
    const footnoteReference = object as docs_v1.Schema$FootnoteReference;
    const { footnoteNumber, footnoteId } = footnoteReference;
    if (!(footnoteNumber && footnoteId)) return false;
    return {
      type: "footnoteReference",
      footnoteNumber: Number(footnoteNumber),
      footnoteId
    }
  }
}
