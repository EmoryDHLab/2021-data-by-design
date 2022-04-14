<template>
  <Slots>
    <template v-for="i in hover" v-slot:[slots.hoverText(i)]="{ inner }">
      <HoverText
        :key="slots.hoverText(i)"
        v-html="inner"
        @mouseover.native="overlayHoverOver(i)"
        @mouseout.native="overlayHoverOut"
      ></HoverText>
    </template>
    <template v-slot:[slots.diffVis]>
      <DifferenceVisual></DifferenceVisual>
    </template>
    <template v-slot:[slots.pCharts]>
      <PChart :chartName="chosenHover"></PChart>
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
import HoverText from "../global/HoverText";

export default {
  components: {
    DifferenceVisual,
    PChart,
    BySide,
    HoverText
  },
  mixins: [ChapterSlots],
  data() {
    return {
      slots: {
        hoverText: n => `Hover${n}`,
        diffVis: "Difference Visualization",
        pCharts: "Playfair-style Charts",
        bySide: "Side-by-side"
      },
      hover: ["Covid", "Income", "Women"],
      chosenHover: "Covid"
    };
  },
  chapterState: {},
  methods: {
    mapHoverOver(n) {
      this.chapterState.mapPos = n - 1;
    },
    mapHoverOut() {
      this.chapterState.mapPos = -1;
    },
    overlayHoverOver(n) {
      const positions = [7, 20, 20.6];
      this.chapterState.overlayHighlight = positions[n - 4];
      this.chosenHover = n;
      console.log(n);
    },
    overlayHoverOut() {}
  }
};
</script>

<style scoped></style>
