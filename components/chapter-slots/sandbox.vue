<template>
  <Slots>
    <template v-slot:[slots.test]>
      <Testcomp></Testcomp>
    </template>
    <template v-slot:[slots.testUSA]>
      <TestUSA></TestUSA>
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
import Testcomp from "@/components/chapters/dubois/Testcomp";
import TestUSA from "@/components/chapters/dubois/TestUSA";

export default {
  components: {
    StaticData,
    MapScroller,
    MoveBorder,
    Captioned,
    HoverText,
    Testcomp,
    TestUSA
  },
  mixins: [ChapterSlots],
  data() {
    return {
      slots: { test: "TestComponent", testUSA: "TestUSA" }
    };
  },
  chapterState: {},
  methods: {}
};
</script>

<style scoped></style>
