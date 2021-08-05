<template>
  <Slots>

    <template v-for="i in [1,2,3]" v-slot:[slots.hoverText(i)]="{inner}">
      <HoverText v-html="inner" @mouseover.native="hoverTextOver(i)" @mouseout.native="hoverTextOut"></HoverText>
    </template>

    <template v-slot:[slots.mapScroller]>
      <Captioned>
        <MoveBorder>
          <MapScroller class="centered-image" asset="railroadscaled.jpg"
                       :width="`${$breakpoints.length <= 1 ? 400 : $breakpoints.length * 100}px`"
                       :current-position="chapterState.mapPos"
                       :positions="[
                     {left: 0, top: 0, width: 100, height: 100},
                     {left: -170, top: -50, width: 300, height: 300},
                     {left: -90, top: -120, width: 300, height: 300},
                     {left: -140, top: -110, width: 280, height: 280},
                  ]">
          </MapScroller>
        </MoveBorder>
        <template v-slot:caption>
          The range of Peabody's promotional tour, as plotted on an 1850 rail map of the United States. Image courtesy of the Library of Congress, Geography and Map Division.
        </template>
      </Captioned>
    </template>

    <template v-slot:PeabodyTutorial>
      <PeabodyTutorial :width="$isMobile ? '25rem' : '30rem'" :id="'whatever'"
                       :style="{marginTop: '40px'}"
      ></PeabodyTutorial>
    </template>
  </Slots>
</template>

<script>
import ChapterSlots from "@/components/mixins/ChapterSlots";
import PeabodyTutorial from "@/components/chapters/peabody/PeabodyTutorial.vue"
import MoveBorder from "../global/MoveBorder";
import MapScroller from "../global/MapScroller.vue";
import Captioned from "../global/Captioned.vue";
import HoverText from "../global/HoverText";
export default {
  components: {PeabodyTutorial, MapScroller, MoveBorder, Captioned, HoverText},
  mixins: [ChapterSlots],
  data () {
    return {
      slots: {
        hoverText: (n) => `Hover${n}`,
        mapScroller: "Map Scroller",
      }
    }
  },
  chapterState: {
    mapPos: 0
  },
  methods: {
    hoverTextOver(n) {
      this.chapterState.mapPos = n;
    },
    hoverTextOut() {
      this.chapterState.mapPos = 0;
    }
  }
}
</script>

<style scoped>

</style>
