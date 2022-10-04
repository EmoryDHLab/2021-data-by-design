<template>
  <Slots>
    <template v-for="i in [1, 2, 3]" v-slot:[slots.hoverText(i)]="{ inner }">
      <HoverText
        :key="slots.hoverText(i)"
        v-html="inner"
        @mouseover.native="mapHoverOver(i)"
        @mouseout.native="mapHoverOut"
      ></HoverText>
    </template>

    <template v-for="i in [4, 5, 6]" v-slot:[slots.hoverText(i)]="{ inner }">
      <HoverText
        :key="slots.hoverText(i)"
        v-html="inner"
        @mouseover.native="overlayHoverOver(i)"
        @mouseout.native="overlayHoverOut"
      ></HoverText>
    </template>

    <template v-slot:[slots.mapScroller]>
      <Captioned>
        <MoveBorder>
          <MapScroller
            class="centered-image"
            asset="images/railroadscaled.webp"
            :currentPoint="chapterState.mapPos"
            :points="[
              { x: 3700, y: -200, scale: 3 },
              { x: 1300, y: 1500, scale: 3 },
              { x: 2750, y: 1350, scale: 3 },
            ]"
          >
          </MapScroller>
        </MoveBorder>
        <template v-slot:caption>
          The range of Peabody's promotional tour, as plotted on an 1850 rail
          map of the United States. Image courtesy of the Library of Congress,
          Geography and Map Division.
        </template>
      </Captioned>
    </template>

    <template v-slot:SeventeenthCenturyOverlay>
      <MoveBorder class="relative">
        <PeabodyGrid
          class="w-full"
          overlay-path="PeabodyImg/1600s.jpg"
          :highlighted="chapterState.overlayHighlight"
          @click="chapterState.overlayHighlight = false"
        >
        </PeabodyGrid>
      </MoveBorder>
    </template>

    <!--    <template v-slot:PeabodyTutorialSlot>-->
    <!--      <PeabodyTutorial :width="$isMobile ? '25rem' : '30rem'" :id="'whatever'"-->
    <!--                       :style="{marginTop: '40px'}"-->
    <!--      ></PeabodyTutorial>-->
    <!--    </template>-->

    <template v-slot:[slots.testSlot]>
      <div class="w-full border-2">
        <!--        <StaticData :dataset="['peabody1600s']" v-slot="data">-->
        <!--          <PeabodyGrid :yearsData="data.peabody1600s" ></PeabodyGrid>-->
        <!--        </StaticData>-->
      </div>
      <!--      <div class="w-full flex flex-row">-->
      <!--        <EventKey class="w-56 h-56" v-model="selected"></EventKey>-->
      <!--        <EventLegend class="absolute" v-model="selected"></EventLegend>-->
      <!--      </div>-->
    </template>
  </Slots>
</template>

<script>
import PeabodyTutorial from "@/components/chapters/peabody/PeabodyTutorialOld.vue";
import MoveBorder from "../global/MoveBorder";
import MapScroller from "../global/MapScroller.vue";
import Captioned from "../global/docs-inclusions/Captioned.vue";
import HoverText from "../global/HoverText";
import PeabodyGrid from "../chapters/peabody/grid/PeabodyGrid.vue";
import EventKey from "../chapters/peabody/key/EventKeyBox";
import EventLegend from "../chapters/peabody/key/EventLegend";
import LocalImage from "../global/docs-inclusions/LocalImage";
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
    LocalImage,
    EventLegend,
    EventKey,
    PeabodyTutorial,
    MapScroller,
    MoveBorder,
    Captioned,
    HoverText,
    PeabodyGrid,
  },
  data() {
    return {
      selected: 1,
      slots: {
        hoverText: (n) => `Hover${n}`,
        mapScroller: "Map Scroller",
        testSlot: "Test Slot",
      },
    };
  },
  chapterState: {
    mapPos: -1,
    overlayHighlight: false,
  },
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
    },
    overlayHoverOut() {},
  },
};
</script>

<style scoped>
.overlay {
  width: 50%;
  opacity: 90%;
  top: -50%;
}
</style>
