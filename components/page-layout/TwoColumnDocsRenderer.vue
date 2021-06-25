<template>
  <div>
    {{ docsComponents.length }}
  </div>
</template>

<script>
import {findSections} from "google-docs-components";

export default {
  props: {
    docsComponents: {
      type: Array,
      required: true
    }
  },
  mounted () {
    if (this.docsComponents) {
    }
  }
}
</script>

<style scoped>

</style>
