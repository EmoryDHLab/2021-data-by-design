<template>
  <div>
    <ChapterLayout
      v-if="docsData"
      :docData="docsData"
      :config="config"
      :docsRendererComponent="duboisSlots"
    ></ChapterLayout>
  </div>
</template>

<script>
import ChapterLayout from "~/components/page/chapter/ChapterLayout";
import chaptersConfig from "~/chaptersConfig";
import docsData from "~/docs/dubois.json";
import duboisSlots from "~/components/chapter-slots/dubois";

export default {
  data() {
    const config = chaptersConfig.dubois;

    return {
      docsData,
      config,
      duboisSlots,
    };
  },
  computed: {},
  mounted() {},
  components: { ChapterLayout },
};
</script>

<style></style>
