<template>
  <div>
    <SiteNav></SiteNav>
    <Nuxt/>
  </div>
</template>

<script>

import SiteNav from "../components/page-layout/SiteNav";
export default {
  components: {SiteNav},
  name: "default"
}
</script>

<style scoped>

</style>
