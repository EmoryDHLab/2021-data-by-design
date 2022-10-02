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
import Chart63 from "~/components/chapters/dubois/63charts/Chart63";
import StudentCharts from "../chapters/dubois/studentCharts/StudentCharts";
import studentData from "~/api/static/data/chartOne.json";
import DocsRenderer from "../docs-renderer/DocsRenderer";

export default {
  props: {
    docContent: Array,
  },
  created() {
    this.$store.commit("currentChapter/initializeChapterState", {
      initialState: this.$options.chapterState,
    });
  },
  mounted() {},
  computed: {
    chapterState() {
      const obj = {};
      Object.keys(this.$options.chapterState).forEach((key) =>
        Object.defineProperty(obj, key, {
          get: () => this.$store.state.currentChapter.chapterState[key],
          set: (value) => {
            this.$store.commit("currentChapter/updateChapterState", {
              key,
              value,
            });
          },
          enumerable: true,
        })
      );
      return obj;
    },
  },
  components: {
    Slots: {
      render(createElement) {
        return createElement(DocsRenderer, {
          props: {
            docContent: this.$parent.docContent,
          },
          scopedSlots: this.$scopedSlots,
          on: this.$parent.$listeners,
        });
      },
    },
    Chart63,
    StudentCharts,
  },
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
