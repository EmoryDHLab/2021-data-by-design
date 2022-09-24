export declare type ContentData = ElementData | ComponentData | TableData | DevSlotData;
export declare type ProcessedContent = Array<ContentData>;
export declare type ProcessedDocument = {
    body: ProcessedContent;
    footnotes: {
        [index: number]: ProcessedContent;
    };
    readAt: number;
    title: string;
};
export declare type ElementData = string | {
    element: string;
    children: ProcessedContent;
    style?: {
        [propertyName: string]: string | number;
    };
    attrs?: {
        href?: string;
    };
};
export declare type TableData = {
    rows: Array<Array<number>>;
    cells: Array<ProcessedContent>;
    className?: string;
};
export declare type ComponentData = {
    component: string;
    props?: PropsData;
    slots?: SlotsData;
    className?: string;
};
export declare type DevSlotData = {
    slot: string;
};
export declare type PropsDef = {
    [propName: string]: {
        type: 'string' | 'number';
        required?: boolean;
    };
};
export declare type PropsData = {
    [propName: string]: string | number;
};
export declare type SlotsDef = Array<RegExp | string | ((name: string) => boolean)>;
export declare type SlotsData = {
    default?: ProcessedContent;
    [propName: string]: ProcessedContent;
};
export declare type ComponentDef = {
    matchName: string | Array<string>;
    componentName: string;
    props?: PropsDef;
    slots?: "any" | SlotsDef;
};
export declare type Config = {
    components: Array<ComponentDef>;
    classProp?: boolean | string;
};
