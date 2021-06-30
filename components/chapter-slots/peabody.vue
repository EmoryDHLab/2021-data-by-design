<template>
  <Slots>
    <template v-slot:Hover1="{inner}">
      This is hover 1 {{inner}}
    </template>
  </Slots>
</template>

<script>
import ChapterSlots from "@/components/chapter-slots/mixin/ChapterSlots";
export default {
  mixins: [ChapterSlots]
}
</script>

<style scoped>

</style>
