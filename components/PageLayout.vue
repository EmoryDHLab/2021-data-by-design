<template>
  <TwoColumnDocsRenderer :docsComponents="components">

  </TwoColumnDocsRenderer>

</template>

<script>
import {componentsFromDoc} from "google-docs-components"
export default {
  props: {
    docData: {
      type: Object,
      required: true
    }
  },
  computed: {
    components () {
      return componentsFromDoc({components: []}, this.docData).body;
    }
  }
}
</script>

<style scoped>

</style>
