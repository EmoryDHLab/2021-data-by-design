<template>
  <div>
    <PageLayout :docData="docsData"></PageLayout>
  </div>
</template>

<script>
import PageLayout from "~/components/PageLayout";
import Renderer from "docs-renderer-vue2"

import chaptersConfig from "@/chapters-config"

import { componentsFromDoc } from "google-docs-components"
export default {
  name: "peabody",
  async asyncData({ params, $http }) {
    const docsData = await $http.$get(`/api/livedoc/${chaptersConfig.peabody}`)
    return { docsData }
  },
  computed: {
  },
  mounted () {
  },
  components: {Renderer},
  layout: "chapter"
}
</script>

<style scoped>

</style>
