<template>
  <Slots>
    <template v-slot:[slots.pieChart]>
      <StudentCharts />
    </template>
    <template v-slot:[slots.chart63]>
      <Chart63></Chart63>
    </template>
  </Slots>
</template>

<script>
import ChapterSlots from "~/components/mixins/ChapterSlots";
import PieChart from "~/components/chapters/dubois/studentCharts/PieChart";
import USAMap from "~/components/chapters/dubois/studentCharts/USAMap";
import Chart63 from "~/components/chapters/dubois/63charts/Chart63";
import StudentCharts from "../chapters/dubois/studentCharts/StudentCharts";
import studentData from "~/api/static/data/chartOneGrouped.json";

export default {
  components: {
    PieChart,
    USAMap,
    Chart63,
    StudentCharts,
  },
  mixins: [ChapterSlots],
  data() {
    return {
      studentData,
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
