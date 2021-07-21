import DocsRenderer from "../page-layout/DocsRenderer.vue";

const ChapterSlots = {
  props: {
    docContent: Array,
  },
  created () {
    this.$store.commit("currentChapter/initializeChapterState", {initialState: this.$options.chapterState})
  },
  mounted() {
  },
  computed: {
    chapterState () {
      const obj = {}
      Object.keys(this.$options.chapterState).forEach(key => Object.defineProperty(obj, key, {
        get: () => {
          return this.$store.state.currentChapter.chapterState[key];
        },
        set: (value) => {
          this.$store.commit("currentChapter/updateChapterState", {key, value})
        },
        enumerable: true
      }))
      return obj;
    }
  },
  components: {
    Slots: {
      render(createElement, context) {
        return createElement(DocsRenderer, {
          props: {
            docContent: this.$parent.docContent,
          },
          scopedSlots: this.$scopedSlots,
          on: this.$parent.$listeners
        })
      }
    }
  },
}
export default ChapterSlots;
