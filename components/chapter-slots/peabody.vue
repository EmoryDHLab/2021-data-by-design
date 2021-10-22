<template>
  <Slots>

    <template v-for="i in [1,2,3]" v-slot:[slots.hoverText(i)]="{inner}">
      <HoverText v-html="inner" @mouseover.native="hoverTextOver(i)" @mouseout.native="hoverTextOut"></HoverText>
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

    <template v-slot:PeabodyTutorialSlot>
      <PeabodyTutorial :width="$isMobile ? '25rem' : '30rem'" :id="'whatever'"
                       :style="{marginTop: '40px'}"
      ></PeabodyTutorial>
    </template>

    <template v-slot:[slots.peabodyTimeline]>
      <StaticData :dataset="['peabody1600s']" v-slot="data">
      </StaticData>
    </template>
  </Slots>
</template>

<script>
import ChapterSlots from "@/components/mixins/ChapterSlots";
import PeabodyTutorial from "@/components/chapters/peabody/PeabodyTutorial.vue"
import MoveBorder from "../global/MoveBorder";
import MapScroller from "../global/MapScroller.vue";
import Captioned from "../global/docs-inclusions/Captioned.vue";
import HoverText from "../global/HoverText";
import StaticData from "@/components/data-access/StaticData";

export default {
  components: {StaticData, PeabodyTutorial, MapScroller, MoveBorder, Captioned, HoverText},
  mixins: [ChapterSlots],
  data() {
    return {
      slots: {
        hoverText: (n) => `Hover${n}`,
        mapScroller: "Map Scroller",
        peabodyTimeline: "Peabody With Timeline",
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

</style>
