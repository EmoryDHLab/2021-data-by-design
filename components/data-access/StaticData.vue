<template>
  <div class="contents">
    <slot v-bind="staticData"></slot>
  </div>
</template>

<script>
import {mapMutations, mapGetters} from "vuex"

export default {
  props: {
    dataset: {
      type: [String, Array],
      required: true
    }
  },
  methods: {
    ...mapMutations("currentChapter", ["setStaticData"])
  },
  computed: {
    ...mapGetters("currentChapter", ["staticData"])
  },
  async fetch() {
    const toFetch = Array.isArray(this.dataset) ? this.dataset : [this.dataset];

    toFetch
      .filter(name => !(name in this.staticData))
      .forEach(name => {
        console.log("Fetching static dataset " + name);
      this.$http.$get(`/api/data/${name}`)
        .then(data => this.setStaticData({name, data}))
    })

  }
}
</script>

<style scoped>

</style>
