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
    const host = process.server ? req.headers.host : location.host;
    const protocol = host.startsWith("localhost") ? "http://" : "https://";
    if (config) {
      const request = await fetch(
        `${protocol}${host}/api/livedoc/${config.doc}`
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
