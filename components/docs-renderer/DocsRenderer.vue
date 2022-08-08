<template>
  <Renderer
    class="space-y-6"
    ref="renderer"
    :content="docContent"
    :ignoreCss="ignoreCssProperties"
    :components="components"
  >
    <template
      v-for="(_, name) in $scopedSlots"
      :slot="name"
      slot-scope="slotData"
      ><slot :name="name" v-bind="slotData"
    /></template>
  </Renderer>
</template>

<script>
import { Renderer } from "docs-renderer-vue2";
import { globalComponents } from "./componentImports";

export default {
  components: { Renderer },
  props: {
    docContent: Array,
  },
  inject: ["docsComponents"],
  mounted() {
    setTimeout(() => {
      // TODO: Find a way to run this exactly after all assets are loaded
      const el = this.$refs.renderer;
      const height = [...el.children].reduce(
        (acc, child) => acc + child.scrollHeight,
        0
      );
      this.$emit("mounted", { height });
    }, 2000);
  },
  computed: {
    components() {
      return { ...globalComponents, ...(this.docsComponents.components || {}) };
    },
    ignoreCssProperties() {
      return ["font-family", "font-size", "background-color"];
    },
  },
};
</script>

<style>
.doc-table-root {
  @apply gap-2;
}
</style>
