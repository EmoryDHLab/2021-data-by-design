<template>
  <Slots>
    <template v-slot:[slots.studentCharts]>
      <StudentCharts />
    </template>
    <template v-slot:[slots.chart63]>
      <Chart63></Chart63>
    </template>
  </Slots>
</template>

<script>
import ChapterSlots from "~/components/mixins/ChapterSlots";
import Chart63 from "~/components/chapters/dubois/63charts/Chart63";
import StudentCharts from "../chapters/dubois/studentCharts/StudentCharts";
import studentData from "~/api/static/data/chartOne.json";

export default {
  components: {
    Chart63,
    StudentCharts,
  },
  mixins: [ChapterSlots],
  data() {
    return {
      studentData,
      slots: {
        studentCharts: "StudentCharts",
        chart63: "63 Charts",
      },
    };
  },
  chapterState: {},
  methods: {},
};
</script>

<style scoped></style>
