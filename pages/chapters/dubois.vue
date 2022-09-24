<template>
  <div>
    <ChapterLayout
      v-if="docsData"
      :docData="docsData"
      :config="config"
      :chapterSlot="duboisSlot"
    ></ChapterLayout>
  </div>
</template>

<script>
import ChapterLayout from "~/components/page/chapter/ChapterLayout";
import chaptersConfig from "~/chaptersConfig";
import docsData from "~/docs/dubois.json";
import duboisSlot from "~/components/chapter-slots/dubois";

export default {
  data() {
    const config = chaptersConfig.dubois;

    return {
      docsData,
      config,
      duboisSlot,
    };
  },
  computed: {},
  mounted() {},
  components: { ChapterLayout },
};
</script>

<style></style>
