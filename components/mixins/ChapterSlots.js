const ChapterSlots = {
  props: {
    docContent: Array,
  },
  provide() {
    return {
      parent: this
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
