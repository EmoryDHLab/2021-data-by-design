import {elementMatcher, element} from "../types";
import {rawList} from "../../listParsing";
import {docs_v1} from "@googleapis/docs";
import Schema$Paragraph = docs_v1.Schema$Paragraph;

export type list = {
  type: "list",
  ordered: boolean,
  items: Array<element>
}


export const listMatcher: elementMatcher = {
  matchProperty: "list",
  resolve(object, parseChildren): list | false {
    const rawList = object as rawList;

    return {
      type: "list",
      ordered: !!rawList.properties.glyphType,
      items: parseChildren(rawList.items, false),
    }

  }
}
