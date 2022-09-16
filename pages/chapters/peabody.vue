<template>
  <div>
    <ChapterLayout
      v-if="docsData"
      :docData="docsData"
      :config="config"
      :docsRendererComponent="peabodySlots"
    ></ChapterLayout>
  </div>
</template>

<script>
import ChapterLayout from "~/components/page/chapter/ChapterLayout";
import chaptersConfig from "~/chaptersConfig";
import docsData from "~/docs/peabody.json";
import peabodySlots from "~/components/chapter-slots/peabody";

export default {
  data() {
    const config = chaptersConfig.peabody;

    return {
      docsData,
      config,
      peabodySlots,
    };
  },
  computed: {},
  mounted() {},
  components: { ChapterLayout },
};
</script>

<style></style>
