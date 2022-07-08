<template>
  <Slots>
    <template v-slot:[slots.test]>
      <PiechartP5></PiechartP5>
    </template>
    <template v-slot:[slots.testUSA]>
      <USAsvg></USAsvg>
    </template>
    <template v-slot:[slots.chart63]>
      <Chart63></Chart63>
    </template>
  </Slots>
</template>

<script>
import ChapterSlots from "@/components/mixins/ChapterSlots";
import PiechartP5 from "@/components/chapters/dubois/piechart/PiechartP5";
import USAsvg from "@/components/chapters/dubois/usmap/USAsvg";
import Chart63 from "@/components/chapters/dubois/63charts/Chart63";

export default {
  components: {
    PiechartP5,
    USAsvg,
    Chart63
  },
  mixins: [ChapterSlots],
  data() {
    return {
      slots: { test: "TestComponent", testUSA: "TestUSA", chart63: "63 Charts" }
    };
  },
  chapterState: {},
  methods: {}
};
</script>

<style scoped></style>
