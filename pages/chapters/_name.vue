<template>
  <div>
    <ChapterLayout
      v-if="docsData"
      :docData="docsData"
      :config="config"
    ></ChapterLayout>
  </div>
</template>

<script>
import ChapterLayout from "~/components/page/chapter/ChapterLayout";

import chaptersConfig from "~/chaptersConfig";

export default {
  async asyncData({ params, $http }) {
    const config = chaptersConfig[params.name];
    if (config) {
      const docsData = await $http.$get(`/api/livedoc/${config.doc}`);
      return { docsData, config };
    }
  },
  computed: {},
  mounted() {},
  components: { ChapterLayout },
};
</script>

<style></style>
