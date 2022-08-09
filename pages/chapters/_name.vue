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
  async asyncData({ req, params, $http }) {
    const config = chaptersConfig[params.name];

    if (config) {
      if (process.server) {
        const docsData = await $http.$get(`/api/livedoc/${config.doc}`);
        return { docsData, config };
      }

      const request = await fetch(
        `http://${location.host}/api/livedoc/${config.doc}`
      );
      const docsData = await request.json();
      return { docsData, config };
    }
  },
  computed: {},
  mounted() {},
  components: { ChapterLayout },
};
</script>

<style></style>
