<template>
  <div class="text-black font-william">
    <div class="text-3xl mt-10 mb-2 px-20">
      <slot name="title"></slot>
    </div>
    <div class="text-2xl mb-1 px-20">
      <slot name="subtitle"></slot>
    </div>
    <div class="px-20 mb-10">
      <slot name="caption"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChapterCard"
}
</script>

<style scoped>

</style>