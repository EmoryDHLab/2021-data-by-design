<template>
  <Slots>
    <template v-for="i in [1,2,3]" v-slot:[slots.hoverText(i)]="{inner}">
      <HoverText :key="slots.hoverText(i)" v-html="inner" @mouseover.native="hoverTextOver(i)" @mouseout.native="hoverTextOut"></HoverText>
    </template>

    <template v-slot:[slots.mapScroller]>
        <Captioned>
          <MoveBorder>
            <MapScroller class="centered-image" asset="images/railroadscaled.jpg"
                         :currentPoint="chapterState.mapPos"
                         :points="[{x: 3700, y:-200, scale:3},
                   {x: 1300, y: 1500, scale:3},
                   {x: 2750, y: 1350, scale:3}
                 ]"
            >
            </MapScroller>
          </MoveBorder>
          <template v-slot:caption>
            The range of Peabody's promotional tour, as plotted on an 1850 rail map of the United States. Image courtesy
            of the Library of Congress, Geography and Map Division.
          </template>
        </Captioned>
    </template>

    <template v-slot:SeventeenthCenturyOverlay>
      <MoveBorder class="relative">
<!--        <LocalImage class="w-full" path="PeabodyImg/1600s.jpg"></LocalImage>-->
<!--        <div class="relative w-full overlay">-->
          <PeabodyGrid class="w-full" overlay-path="PeabodyImg/1600s.jpg">
          </PeabodyGrid>
<!--        </div>-->
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
import ChapterSlots from "@/components/mixins/ChapterSlots";
import PeabodyTutorial from "@/components/chapters/peabody/PeabodyTutorialOld.vue"
import MoveBorder from "../global/MoveBorder";
import MapScroller from "../global/MapScroller.vue";
import Captioned from "../global/docs-inclusions/Captioned.vue";
import HoverText from "../global/HoverText";
import StaticData from "@/components/data-access/StaticData";
import PeabodyGrid from "../chapters/peabody/grid/PeabodyGrid.vue";
import EventKey from "../chapters/peabody/key/EventKeyBox";
import EventLegend from "../chapters/peabody/key/EventLegend";
import LocalImage from "../global/docs-inclusions/LocalImage";

export default {
  components: {
    LocalImage,
    EventLegend,
    EventKey, StaticData, PeabodyTutorial, MapScroller, MoveBorder, Captioned, HoverText, PeabodyGrid },
  mixins: [ChapterSlots],
  data() {
    return {
      selected: 1,
      slots: {
        hoverText: (n) => `Hover${n}`,
        mapScroller: "Map Scroller",
        testSlot: "Test Slot"
      }
    }
  },
  chapterState: {
    mapPos: -1,
  },
  methods: {
    hoverTextOver(n) {
      this.chapterState.mapPos = n - 1;
    },
    hoverTextOut() {
      this.chapterState.mapPos = -1;
    }
  }
}
</script>

<style scoped>
  .overlay {
    width: 50%;
    opacity: 90%;
    top: -50%;
  }
</style>
