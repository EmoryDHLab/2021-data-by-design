<template>
  <div>
    <Renderer v-if="content" :content="content">
      <template v-slot:Hover1="{inner}">
        <b>{{ inner }}</b>
      </template>
    </Renderer>
  </div>
</template>

<script>
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
    content () {
      if (this.docsData) {
        const parsed = componentsFromDoc({components: []}, this.docsData);
        return parsed.body;
      }
    }
  },
  mounted () {
    console.log(this.docsData)
  },
  components: {Renderer},
  layout: "chapter"
}
</script>

<style scoped>

</style>
