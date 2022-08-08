<template>
  <Slots>
    <template v-slot:[slots.pieChart]>
      <PieChart></PieChart>
    </template>
    <template v-slot:[slots.usaChart]>
      <USAsvg></USAsvg>
    </template>
    <template v-slot:[slots.chart63]>
      <Chart63></Chart63>
    </template>
  </Slots>
</template>

<script>
import ChapterSlots from "~/components/mixins/ChapterSlots";
import PieChart from "~/components/chapters/dubois/piechart/PieChart";
import USAsvg from "~/components/chapters/dubois/usmap/USAsvg";
import Chart63 from "~/components/chapters/dubois/63charts/Chart63";

export default {
  components: {
    PieChart,
    USAsvg,
    Chart63,
  },
  mixins: [ChapterSlots],
  data() {
    return {
      slots: {
        pieChart: "PieChart",
        usaChart: "TestUSA",
        chart63: "63 Charts",
      },
    };
  },
  chapterState: {},
  methods: {},
};
</script>

<style scoped></style>
