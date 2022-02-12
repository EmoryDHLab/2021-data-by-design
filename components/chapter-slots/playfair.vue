<template>
  <Slots>
    <template v-slot:[slots.diffVis]>
      <DifferenceVisual></DifferenceVisual>
    </template>
  </Slots>
</template>

<script>
import ChapterSlots from "@/components/mixins/ChapterSlots";
import DifferenceVisual from "@/components/chapters/playfair/DifferenceVisual.vue";

export default {
  components: {
    DifferenceVisual
  },
  mixins: [ChapterSlots],
  data() {
    return {
      slots: {
        diffVis: "Difference Visualization"
      }
    };
  },
  chapterState: {},
  methods: {}
};
</script>

<style scoped></style>
