<template>
  <Renderer :content="docContent" :ignoreCss="ignoreCssProperties" :components="components">
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
