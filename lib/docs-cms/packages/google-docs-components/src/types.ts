
export type ContentData = ElementData | ComponentData | TableData | DevSlotData;
export type ProcessedContent = Array<ContentData>;
export type ProcessedDocument = {
  body: ProcessedContent,
  footnotes: {
    [index: number]: ProcessedContent
  },
  readAt: number,
  title: string,
};

export type ElementData = string | {
  element: string,
  children: ProcessedContent,
  style?: {
    [propertyName: string]: string | number,
  },
  attrs?: {
    href?: string
  }
}

export type TableData = {
  rows: Array<Array<number>>,
  cells: Array<ProcessedContent>,
  className?: string,
}

export type ComponentData = {
  component: string,
  props?: PropsData
  slots?: SlotsData,
  className?: string
}

export type DevSlotData = {
  slot: string,
}
// type ValidatorFunction = (value: string) => boolean;

//TODO: validator and convertor functions?

export type PropsDef = {
  [propName: string]: {
    type: 'string' | 'number',
    required?: boolean
    // validator?: ValidatorFunction
  }
}

export type PropsData = {
  [propName: string]: string | number
}

export type SlotsDef = Array<RegExp | string | ((name: string) => boolean)>;

export type SlotsData = {
  default?: ProcessedContent,
  [propName: string]: ProcessedContent
}

export type ComponentDef = {
  matchName: string | Array<string>,
  componentName: string,
  props?: PropsDef,
  slots?: "any" | SlotsDef
}



export type Config = {
  components: Array<ComponentDef>,
  classProp?: boolean | string
}