import { ComponentData, ComponentDef, DevSlotData, TableData } from "./types";
import { elementTypes } from "google-docs-parser";
import { ParseContent } from "./componentsFromDoc";
declare type Table = elementTypes.table;
export declare type ComponentParseErrorType = "TableFormatError" | "InvalidPropError" | "ComponentError" | "ComponentNotFoundError";
export declare type ComponentParseError = {
    error: ComponentParseErrorType;
    message: string;
    parsingAs?: string;
};
export default function (componentDefs: Array<ComponentDef>, inputTable: Table, parseContent: ParseContent, defaultToTable?: boolean, classProp?: string | boolean): ComponentData | TableData | DevSlotData | ComponentParseError;
export {};
