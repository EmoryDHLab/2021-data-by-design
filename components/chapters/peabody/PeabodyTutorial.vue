<template>
  <div class="w-full h-full flex flex-col justify-center">
    <PeabodyGrid
      :show-labels="scrollData.current > 0"
      :show-squares="scrollData.current > 1" :years-data="1500"
      :tutorialKey="scrollData.current == 2"
      v-slot="{hoveredYear, methods: {getYearXFromIndex, getYearYFromIndex}}">
    >
        <EventKeyBox
          v-show="scrollData.current >= 2 && hoveredYear >= 0"
          v-model="keyValue"
          :width="9.5"
          :height="9.5"
          :x="getYearXFromIndex(hoveredYear)"
          :y="getYearYFromIndex(hoveredYear) + 0.1"
          :drop-shadow="false"
        />
    </PeabodyGrid>
    <EventLegend v-if="scrollData.current == 2" v-model="keyValue"></EventLegend>

  </div>
</template>
<script>

import PeabodyGrid from "./grid/PeabodyGrid";
import EventKeyBox from "./key/EventKeyBox";
import EventLegend from "./key/EventLegend";

export const docsDefinition = {
  matchName: ["PeabodyTutorial"],
  componentName: "PeabodyTutorial",
  props: {}
}

export default {
  components: {EventLegend, EventKeyBox, PeabodyGrid},
  inject: ['scrollData'],
  data () {
    return {
      keyValue: 1
    }
  }
}
</script>
