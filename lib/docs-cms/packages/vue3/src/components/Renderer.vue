
<script lang="ts">
import type { ContentData, ProcessedContent } from "google-docs-components";
import { defineComponent, h } from "vue";
import type { PropType, VNode } from "vue";
import DefaultTable from "./DefaultTable.vue";

export default defineComponent({
  name: "Renderer",
  props: {
    rootElement: {
      type: [Boolean, String] as PropType<string | false>,
      default: false,
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
      default: () => /\[\^(\d*[a-zA-z]+\d*)\](?:(.+)\[\/\1\])*/g,
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
  render() {
    const fromContent = (
      data: ContentData
    ): VNode | Array<String | VNode> | string | false => {
      if (typeof data == "string") {
        const inlineSlotMatches = data.matchAll(this.inlineSlotFormat);

        const insertions = [];
        for (const match of inlineSlotMatches) {
          if (match.index == undefined) continue;
          const slotName = match[1];
          const inner = match[2];
          if (slotName in this.$slots) {
            const slotFunction = this.$slots[slotName] as (args: object) => any;
            const resolvedSlot = slotFunction({ inner });
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
        const nodeData = {
          ...(data.attrs && data.attrs),
          ...(data.style && {
            style: Object.fromEntries(
              Object.entries(data.style).filter(
                ([key]) => !this.ignoreCss.includes(key)
              )
            ),
          }),
          ...(data.element in this.elementClasses && {
            class: this.elementClasses[data.element],
          }),
        };
        return h(data.element, nodeData, fromContentArray(data.children));
      }
      if ("component" in data) {
        const nodeProps: { [key: string]: any } = {};
        if (!(data.component in this.components)) return false;
        if (data.props) {
          Object.assign(nodeProps, data.props);
        }
        if (data.className) {
          nodeProps.class = data.className;
        }
        if (!data.slots) {
          return h(this.components[data.component], nodeProps);
        }
        const slotsEntries = Object.entries(data.slots).map(
          ([slotName, contentData]) => [
            slotName,
            () => fromContentArray(contentData),
          ]
        );

        const componentSlots: { [key: string]: any } =
          Object.fromEntries(slotsEntries);

        return h(this.components[data.component], nodeProps, componentSlots);
      }

      if ("slot" in data) {
        if (data.slot in this.$slots) {
          const slotFunction = this.$slots[data.slot] as (args: object) => any;
          const resolvedSlot = slotFunction({});
          console.log(resolvedSlot);
          if (resolvedSlot) return resolvedSlot;
        }
      }
      if ("rows" in data) {
        if (typeof this.tableComponent == "object") {
          const slotsEntries = data.cells.map((contentData, index) => [
            `cell:${index}`,
            () => fromContentArray(contentData),
          ]);
          return h(
            this.tableComponent,
            {
              tableData: data,
              ...(data.className && { class: data.className }),
            },
            Object.fromEntries(slotsEntries)
          );
        }
      }
      return false;
    };
    function fromContentArray(contentArray: ProcessedContent) {
      return contentArray
        .map((data) => fromContent(data))
        .flat(1)
        .filter(Boolean) as Array<VNode>;
    }

    if (this.rootElement) {
      return h(this.rootElement, {}, fromContentArray(this.content));
    }

    return fromContentArray(this.content);
  },
});
</script>
