<template>
  <div>
    <ChapterLayout
      v-if="docsData"
      :docData="docsData"
      :config="config"
      :docsRendererComponent="brooksSlots"
    ></ChapterLayout>
  </div>
</template>

<script>
import ChapterLayout from "~/components/page/chapter/ChapterLayout";
import chaptersConfig from "~/chaptersConfig";
import docsData from "~/docs/brooks.json";
import brooksSlots from "~/components/chapter-slots/brooks";

export default {
  data() {
    const config = chaptersConfig.brooks;

    return {
      docsData,
      config,
      brooksSlots,
    };
  },
  computed: {},
  mounted() {},
  components: { ChapterLayout },
};
</script>

<style></style>
