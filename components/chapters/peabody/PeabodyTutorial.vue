<template>
  <div class="w-full h-full flex flex-col gap-3 justify-center">

    <StaticData :dataset="['peabody1600s']" v-slot="{peabody1600s}">
      <PeabodyGrid
        :show-labels="scrollData.current > 0"
        :show-squares="scrollData.current > 1"
        :yearsData="yearsData(peabody1600s)"
        v-slot="{hoveredYear, methods: {getYearXFromIndex, getYearYFromIndex}}">
        >
        <EventKeyBox
          v-if="showKey"
          v-show="Number.isInteger(hoveredYear) && hoveredYear >= 0"
          v-model="keyValue"
          :width="9.5"
          :height="9.5"
          :x="getYearXFromIndex(hoveredYear)"
          :y="getYearYFromIndex(hoveredYear) + 0.1"
          :drop-shadow="false"
        />
      </PeabodyGrid>
    </StaticData>
    <EventLegend v-if="showKey" v-model="keyValue"></EventLegend>

  </div>
</template>
<script>

import PeabodyGrid from "./grid/PeabodyGrid";
import EventKeyBox from "./key/EventKeyBox";
import EventLegend from "./key/EventLegend";
import StaticData from "@/components/data-access/StaticData";

export const docsDefinition = {
  matchName: ["PeabodyTutorial"],
  componentName: "PeabodyTutorial",
  props: {}
}

export default {
  components: {EventLegend, EventKeyBox, PeabodyGrid, StaticData},
  inject: ['scrollData'],
  data() {
    return {
      keyValue: 1
    }
  },
  computed: {
    showKey() {
      return this.scrollData.current > 2;
    }
  },
  methods: {
    yearsData(staticData) {
      if (this.scrollData.current == 4) {
        return staticData.filter(event => event.squares === "full");
      }
      return 1600;
    }
  }
}
</script>
