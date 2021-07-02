<template>
  <Renderer ref="renderer" :content="docContent" :ignoreCss="ignoreCssProperties" :components="components">
    <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData"><slot :name="name" v-bind="slotData" /></template>
  </Renderer>
</template>

<script>
import Renderer from "docs-renderer-vue2"
import globalComponents from "@/components/global"

export default {
  components: {Renderer},
  props: {
    docContent: Array,
  },
  mounted () {
    const el = this.$refs.renderer;
    const height = [...el.children].reduce((acc, child) => (acc + child.scrollHeight), 0);
    this.$emit("mounted", {height});
  },
  computed: {
    components() {
      return globalComponents;
    },
    ignoreCssProperties() {
      return ["font-family", "font-size"]
    },
  },
}
</script>

<style scoped>

</style>
