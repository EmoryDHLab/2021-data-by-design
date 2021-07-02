
const ChapterSlots = {
  props: {
    docContent: Array,
  },
  provide() {
    return {
      parent: this
    }
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
      inject: ['parent'],
      render(createElement, context) {
        return createElement("DocsRenderer", {
          props: {
            docContent: this.parent.docContent
          },
          scopedSlots: this.$scopedSlots
        })
      }
    }
  },
}
export default ChapterSlots;
