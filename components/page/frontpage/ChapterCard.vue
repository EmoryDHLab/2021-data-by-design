<template>
      <NuxtLink :to="'/chapters/' + chapter">
<div class="text-black font-william">
    <div class="text-3xl mt-16 mb-3 px-28 font-bold">
      <slot name="title"></slot>
    </div>
    <div class="text-2xl mb-2 px-28">
      <slot name="subtitle"></slot>
    </div>
    <div class="px-28 mb-10">
      <slot name="caption"></slot>
    </div>
  </div>
  </NuxtLink>
</template>

<script>
export default {
  name: "ChapterCard",
  props: {
    chapter: String
  }
};
</script>

<style scoped></style>
