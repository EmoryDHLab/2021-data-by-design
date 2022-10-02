<template>
  <div>
    <ChapterLayout
      v-if="docsData"
      :docData="docsData"
      :config="config"
      :chapterSlot="peabodySlot"
    ></ChapterLayout>
  </div>
</template>

<script>
import ChapterLayout from "~/components/page/chapter/ChapterLayout";
import chaptersConfig from "~/chaptersConfig";
import docsData from "~/docs/peabody.json";
import peabodySlot from "~/components/chapter-slots/peabody";

export default {
  data() {
    const config = chaptersConfig.peabody;

    return {
      docsData,
      config,
      peabodySlot,
    };
  },
  computed: {},
  mounted() {},
  components: { ChapterLayout },
};
</script>

<style></style>
