<template>
  <div>
    <ChapterLayout
      v-if="docsData"
      :docData="docsData"
      :config="config"
      :chapterSlot="playfairSlot"
    ></ChapterLayout>
  </div>
</template>

<script>
import ChapterLayout from "~/components/page/chapter/ChapterLayout";
import chaptersConfig from "~/chaptersConfig";
import docsData from "~/docs/playfair.json";
import playfairSlot from "~/components/chapter-slots/playfair";

export default {
  data() {
    const config = chaptersConfig.playfair;

    return {
      docsData,
      config,
      playfairSlot,
    };
  },
  computed: {},
  mounted() {},
  components: { ChapterLayout },
};
</script>

<style></style>
