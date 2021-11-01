<template>
  <div class="px-40 py-15 text-black">
    <div class="text-3xl mb-2">
      <slot name="title"></slot>
    </div>
    <div class="text-2xl mb-1">
      <slot name="subtitle"></slot>
    </div>
    <slot name="caption"></slot>
  </div>
</template>

<script>
export default {
  name: "ChapterCard"
}
</script>

<style scoped>

</style>