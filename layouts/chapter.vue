<template>
  <div>
    This "header" goes on every chapter. It knows about the current route: {{$nuxt.$route.name}}
    <Nuxt>Slot test</Nuxt>
  </div>
</template>

<script>
export default {
}
</script>

<style>
</style>
