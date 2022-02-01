<template>
  <Slots>
    <template v-slot:[slots.diffVis]>
      <StaticData :dataset="['playfair_nums_def']" v-slot="data">
        <DifferenceVisual
          :playfairData="data.playfair_nums_def"
        ></DifferenceVisual>
      </StaticData>
    </template>
  </Slots>
</template>

<script>
import ChapterSlots from "@/components/mixins/ChapterSlots";
import MoveBorder from "../global/MoveBorder";
import MapScroller from "../global/MapScroller.vue";
import Captioned from "../global/docs-inclusions/Captioned.vue";
import HoverText from "../global/HoverText";
import StaticData from "@/components/data-access/StaticData";
import DifferenceVisual from "@/components/chapters/playfair/DifferenceVisual.vue";
import RecreationTesting from "@/components/chapters/playfair/recreations/RecreationTesting";

export default {
  components: {
    DifferenceVisual,
    StaticData,
    MapScroller,
    MoveBorder,
    Captioned,
    HoverText,
    RecreationTesting
  },
  mixins: [ChapterSlots],
  data() {
    return {
      slots: {
        testSlot: "Testing",
        diffVis: "Difference Visualization"
      }
    };
  },
  chapterState: {},
  methods: {}
};
</script>

<style scoped></style>
