<template>
  <Slots> </Slots>
</template>

<script>
import DocsRenderer from "../docs-renderer/DocsRenderer";

export default {
  props: {
    docContent: Array,
  },
  created() {
    this.$store.commit("currentChapter/initializeChapterState", {
      initialState: this.$options.chapterState,
    });
  },
  mounted() {},
  computed: {
    chapterState() {
      const obj = {};
      Object.keys(this.$options.chapterState).forEach((key) =>
        Object.defineProperty(obj, key, {
          get: () => this.$store.state.currentChapter.chapterState[key],
          set: (value) => {
            this.$store.commit("currentChapter/updateChapterState", {
              key,
              value,
            });
          },
          enumerable: true,
        })
      );
      return obj;
    },
  },
  components: {
    Slots: {
      render(createElement) {
        return createElement(DocsRenderer, {
          props: {
            docContent: this.$parent.docContent,
          },
          scopedSlots: this.$scopedSlots,
          on: this.$parent.$listeners,
        });
      },
    },
  },
};
</script>

<style scoped></style>
