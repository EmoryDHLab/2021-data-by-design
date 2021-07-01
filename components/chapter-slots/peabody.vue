<template>
  <Slots>
    <template v-for="i in [1,2,3]" v-slot:[slots.hoverText(i)]="{inner}">
      <HoverText v-html="inner" @mouseover.native="mapPos = i" @mouseout.native="mapPos = 0"></HoverText>
    </template>

    <template v-slot:[slots.mapScroller]>
      <MoveBorder>
        <MapScroller class="centered-image" asset="railroadscaled.jpg" width="500px"
                     :current-position="mapPos"
                     :positions="[
                     {left: 0, top: 0, width: 100, height: 100},
                     {left: -170, top: -50, width: 300, height: 300},
                     {left: -90, top: -120, width: 300, height: 300},
                     {left: -140, top: -110, width: 280, height: 280},
                  ]">
        </MapScroller>
      </MoveBorder>
    </template>
  </Slots>
</template>

<script>
import ChapterSlots from "@/components/mixins/ChapterSlots";
export default {
  mixins: [ChapterSlots],
  data () {
    return {
      mapPos: 0,
      slots: {
        hoverText: (n) => `Hover${n}`,
        mapScroller: "Map Scroller",
      }
    }
  }
}
</script>

<style scoped>

</style>
