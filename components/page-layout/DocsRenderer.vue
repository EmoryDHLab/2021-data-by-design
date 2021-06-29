<template>
  <Renderer :content="content" :ignoreCss="ignoreCssProperties" :components="components">
    <template v-slot:Hover1>
      Hover1 test
    </template>
  </Renderer>
</template>

<script>
import Renderer from "docs-renderer-vue2"
import globalComponents from "@/components/global"

export default {
  components: {Renderer},
  props: {
    content: Array,
    chapter: {
      type: String,
      required: false
    }
  },
  computed: {
    components () {
      return globalComponents;
    },
    ignoreCssProperties () {
      return ["font-family", "font-size"]
    }
  }
}
</script>

<style scoped>

</style>
