import Vue, { PropType, VNode, VNodeData } from "vue";
import { ProcessedContent, ContentData } from "google-docs-components";
import DefaultTable from "./DefaultTable.vue";

export default Vue.extend({
  functional: true,
  name: "Renderer",
  props: {
    rootElement: {
      type: String,
      default: "div",
    },
    content: {
      type: Array as PropType<ProcessedContent>,
      required: true,
      default: () => [],
    },
    components: {
      type: Object,
      default: () => ({}),
    },
    tableComponent: {
      type: [Object, Boolean],
      default: (): Object => DefaultTable,
    },
    inlineSlotFormat: {
      type: RegExp,
      default: () => /\[\^(\d*[a-zA-z]+\d*)](?:(.+)\[\/\1])*/g,
    },
    ignoreCss: {
      type: Array as PropType<Array<string>>,
      default: () => [],
    },
    elementClasses: {
      type: Object as PropType<{
        [element: string]: string | object | Array<string | object>;
      }>,
      default: () => ({}),
    },
  },
  render(h, context) {
    function fromContent(
      data: ContentData
    ): VNode | Array<String | VNode> | string | false {
      if (typeof data == "string") {
        const inlineSlotMatches = data.matchAll(context.props.inlineSlotFormat);

        const insertions = [];
        for (const match of inlineSlotMatches) {
          if (match.index == undefined) continue;
          const slotName = match[1];
          const inner = match[2];
          if (slotName in context.scopedSlots) {
            const resolvedSlot = context.scopedSlots[slotName]({ inner });
            if (resolvedSlot) {
              const start = match.index;
              const end = start + match[0].length;
              insertions.push({ start, end, slot: resolvedSlot });
            }
          }
        }

        if (!insertions.length) return data;
        const returnArr: Array<string | VNode> = [];
        let lastIndex = 0;
        insertions
          .sort((a, b) => a.start - b.start)
          .forEach(({ start, end, slot }) => {
            if (lastIndex != start)
              returnArr.push(data.slice(lastIndex, start));
            returnArr.push(...slot);
            lastIndex = end;
          });
        if (lastIndex != data.length) returnArr.push(data.slice(lastIndex));
        return returnArr;
      }

      if ("element" in data) {
        const nodeData: VNodeData = {
          ...(data.attrs && { attrs: data.attrs }),
        };
        if (data.style) {
          nodeData.style = Object.fromEntries(
            Object.entries(data.style).filter(
              ([key]) => !context.props.ignoreCss.includes(key)
            )
          );
        }
        if (data.element in context.props.elementClasses) {
          nodeData.class = context.props.elementClasses[data.element];
        }
        return h(data.element, nodeData, fromContentArray(data.children));
      }
      if ("component" in data) {
        const nodeData: VNodeData = {};
        if (!(data.component in context.props.components)) return false;
        if (data.props) {
          nodeData.props = data.props;
        }
        if (data.className) {
          nodeData.class = data.className;
        }
        if (data.slots) {
          const slotsEntries = Object.entries(data.slots).map(
            ([slotName, contentData]) => [
              slotName,
              () => fromContentArray(contentData),
            ]
          );
          nodeData.scopedSlots = Object.fromEntries(slotsEntries);
        }
        return h(context.props.components[data.component], nodeData);
      }
      if ("slot" in data) {
        if (data.slot in context.scopedSlots) {
          const resolvedSlot = context.scopedSlots[data.slot]({});
          if (resolvedSlot) return resolvedSlot;
        }
      }
      if ("rows" in data) {
        if (typeof context.props.tableComponent == "object") {
          const slotsEntries = data.cells.map((contentData, index) => [
            `cell:${index}`,
            () => fromContentArray(contentData),
          ]);
          return h(context.props.tableComponent, {
            props: {
              tableData: data,
            },
            scopedSlots: Object.fromEntries(slotsEntries),
            ...(data.className && { class: data.className }),
          });
        }
      }
      return false;
    }
    function fromContentArray(contentArray: ProcessedContent) {
      return contentArray
        .map((data) => fromContent(data))
        .flat(1)
        .filter(Boolean) as Array<VNode>;
    }

    return h(
      context.props.rootElement,
      context.data,
      fromContentArray(context.props.content)
    );
  },
});
