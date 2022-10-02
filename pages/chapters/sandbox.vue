<template>
  <div>
    <ChapterLayout
      v-if="docsData"
      :docData="docsData"
      :config="config"
      :chapterSlot="sandboxSlot"
    ></ChapterLayout>
  </div>
</template>

<script>
import ChapterLayout from "~/components/page/chapter/ChapterLayout";
import chaptersConfig from "~/chaptersConfig";
import docsData from "~/docs/sandbox.json";
import sandboxSlot from "~/components/chapter-slots/sandbox";

export default {
  data() {
    const config = chaptersConfig.sandbox;

    return {
      docsData,
      config,
      sandboxSlot,
    };
  },
  computed: {},
  mounted() {},
  components: { ChapterLayout },
};
</script>

<style></style>
