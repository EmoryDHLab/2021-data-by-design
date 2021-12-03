<template>
  <div class="w-full h-full flex flex-col justify-center">
      <PeabodyGrid
        :show-labels="scrollData.current > 0"
        :show-squares="scrollData.current > 1" :years-data="1500"
        :tutorialKey="scrollData.current == 2"
      >
      </PeabodyGrid>
      <EventLegend v-if="scrollData.current == 2"></EventLegend>
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
}
</script>
