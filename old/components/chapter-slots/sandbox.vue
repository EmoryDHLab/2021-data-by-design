<template>
  <Slots> </Slots>
</template>

<script>
import ChapterSlots from "@/components/mixins/ChapterSlots";
import PeabodyTutorial from "@/components/chapters/peabody/PeabodyTutorialOld.vue";
import MoveBorder from "../global/MoveBorder";
import MapScroller from "../../../src/components/global/MapScroller.vue";
import Captioned from "../../../src/components/docs/Captioned.vue";
import HoverText from "../global/HoverText";
import StaticData from "@/components/data-access/StaticData";

export default {
  components: { StaticData, MapScroller, MoveBorder, Captioned, HoverText },
  mixins: [ChapterSlots],
  data() {
    return {
      slots: {},
    };
  },
  chapterState: {},
  methods: {},
};
</script>

<style scoped>
</style>
