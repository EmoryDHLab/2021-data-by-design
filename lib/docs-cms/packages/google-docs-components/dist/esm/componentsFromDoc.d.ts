import type { ProcessedDocument, ProcessedContent } from "./types";
import { Config } from "./types";
import { document, element } from "google-docs-parser";
export declare type ParseContent = (element: Array<element>) => ProcessedContent;
export default function componentsFromDoc(config: Config, doc: document): ProcessedDocument;
