<template>

</template>

<script>
export default {
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
</script>

<style scoped>

</style>
