import {element, elementMatcher} from "../types";
import {paragraph} from "./paragraph";
import {docs_v1} from "@googleapis/docs";

export type table = {
  type: "table",
  rows: Array<Array<number>>,
  cells: Array<Array<element>>
}

export const tableMatcher: elementMatcher = {
  matchProperty: "table",
  resolve(object, parseChildren): table | false {
    const table = object as docs_v1.Schema$Table;
    if (!table.tableRows?.length) return false;
    const cells: Array<Array<element>> = [];
    const rows = Array.from(Array(table.rows!), () => Array(table.columns!).fill(-1));
    table.tableRows.forEach((tableRow, y) => {
        tableRow.tableCells!.forEach((cell, x) => {

          const content = parseChildren(cell.content).map(element => {
            if (typeof element == "object" && "paragraph" in element) {
              const paragraph = (element as paragraph);
              if (paragraph.simple) {
                return paragraph.children[0];
              }
            }
            return element;
          })

          if (content.length == 0) return;

          const {rowSpan, columnSpan} = cell.tableCellStyle!;

          for (let i = 0; i < rowSpan!; i++) {
            for (let j = 0; j < columnSpan!; j++) {
              rows[y + i][x + j] = cells.length;
            }
          }

          cells.push(content as Array<element>);
        })
      }
    );
    return {
      type: "table",
      rows,
      cells
    };
    return false;
  }
}