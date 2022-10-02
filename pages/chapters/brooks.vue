<template>
  <div>
    <ChapterLayout
      v-if="docsData"
      :docData="docsData"
      :config="config"
      :chapterSlot="brooksSlot"
    ></ChapterLayout>
  </div>
</template>

<script>
import ChapterLayout from "~/components/page/chapter/ChapterLayout";
import chaptersConfig from "~/chaptersConfig";
import docsData from "~/docs/brooks.json";
import brooksSlot from "~/components/chapter-slots/brooks";

export default {
  data() {
    const config = chaptersConfig.brooks;

    return {
      docsData,
      config,
      brooksSlot,
    };
  },
  computed: {},
  mounted() {},
  components: { ChapterLayout },
};
</script>

<style></style>
