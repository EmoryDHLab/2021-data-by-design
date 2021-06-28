<template>
  <Renderer :content="content" :components="components"></Renderer>
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
    }
  }
}
</script>

<style scoped>

</style>
