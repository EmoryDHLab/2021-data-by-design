<template>
  <Slots>
    <template v-slot:Hover1="{inner}">
      This is a
    </template>
  </Slots>
</template>

<script>
import ChapterSlots from "@/components/mixins/ChapterSlots";
export default {
  mixins: [ChapterSlots],
  data () {
    return {
      counter: 0
    }
  }
}
</script>

<style scoped>

</style>
