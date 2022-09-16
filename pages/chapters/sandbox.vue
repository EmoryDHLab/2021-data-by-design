<template>
  <div>
    <ChapterLayout
      v-if="docsData"
      :docData="docsData"
      :config="config"
      :docsRendererComponent="sandboxSlots"
    ></ChapterLayout>
  </div>
</template>

<script>
import ChapterLayout from "~/components/page/chapter/ChapterLayout";
import chaptersConfig from "~/chaptersConfig";
import docsData from "~/docs/sandbox.json";
import sandboxSlots from "~/components/chapter-slots/sandbox";

export default {
  data() {
    const config = chaptersConfig.sandbox;

    return {
      docsData,
      config,
      sandboxSlots,
    };
  },
  computed: {},
  mounted() {},
  components: { ChapterLayout },
};
</script>

<style></style>
