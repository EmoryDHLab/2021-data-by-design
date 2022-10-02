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
      <PChart></PChart>
    </template>
    <template v-slot:[slots.bySide]>
      <BySide></BySide>
    </template>
  </Slots>
</template>

<script>
import DifferenceVisual from "@/components/chapters/playfair/DifferenceVisual.vue";
import PChart from "@/components/chapters/playfair/PChart.vue";
import BySide from "@/components/chapters/playfair/BySide.vue";
import HoverText from "../global/HoverText";
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
    DifferenceVisual,
    PChart,
    BySide,
    HoverText,
  },
  data() {
    return {
      slots: {
        hoverText: (n) => `Hover${n}`,
        diffVis: "Difference Visualization",
        pCharts: "Playfair-style Charts",
        bySide: "Side-by-side",
      },
      hover: ["Covid", "Income", "Women"],
      chosenHover: "Covid",
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
    },
    overlayHoverOut() {},
  },
};
</script>

<style scoped></style>
