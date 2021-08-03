<template>
  <div>
    <SiteNav v-if="!$isMobile || !chapterStateInitialized"></SiteNav>
    <Nuxt/>
  </div>
</template>

<script>

import SiteNav from "../components/page-layout/SiteNav";
import {mapState} from "vuex"

export default {
  components: {SiteNav},
  name: "default",
  computed: {
    ...mapState("currentChapter", ["chapterStateInitialized"])
  }

}
</script>

<style scoped>

</style>
