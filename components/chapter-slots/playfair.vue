<template>
  <Slots>
    <template v-slot:[slots.diffVis]>
      <DifferenceVisual></DifferenceVisual>
    </template>
    <template v-slot:[slots.pCharts]>
      <PChart></PChart>
    </template>
    <template v-slot:[slots.bySide]>
      <BySide></BySide>
    </template>
  </Slots>
</template>

<script>
import ChapterSlots from "@/components/mixins/ChapterSlots";
import DifferenceVisual from "@/components/chapters/playfair/DifferenceVisual.vue";
import PChart from "@/components/chapters/playfair/PChart.vue";
import BySide from "@/components/chapters/playfair/BySide.vue";

export default {
  components: {
    DifferenceVisual,
    PChart,
    BySide
  },
  mixins: [ChapterSlots],
  data() {
    return {
      slots: {
        diffVis: "Difference Visualization",
        pCharts: "Playfair-style Charts",
        bySide: "Side-by-side"
      }
    };
  },
  chapterState: {},
  methods: {}
};
</script>

<style scoped></style>
