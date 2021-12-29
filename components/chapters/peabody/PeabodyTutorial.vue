<template>
  <div class="w-full h-full flex flex-col gap-3 justify-center">
    <StaticData :dataset="['peabody1600s']" v-slot="{peabody1600s}">
      <PeabodyGrid
        :show-labels="scrollData.current > 0"
        :show-squares="scrollData.current > 1"
        :yearsData="yearsData(peabody1600s)"
        @hoverStart="eventHovered"
        v-slot="{hoveredYear, methods: {getYearXFromIndex, getYearYFromIndex}}">
        >
        <EventKeyBox
          v-if="scrollData.current == 3"
          v-show="Number.isInteger(hoveredYear) && hoveredYear >= 0"
          v-model="keyValue"
          :width="9.5"
          :height="9.5"
          :x="getYearXFromIndex(hoveredYear)"
          :y="getYearYFromIndex(hoveredYear) + 0.1"
          :drop-shadow="false"
        />
      </PeabodyGrid>
      <div class="text-sm" :class="{'invisible': scrollData.current <= 2}">
        <span v-if="currentEvent.event">{{currentYear}}: {{currentEvent.event}}</span>
        <span v-else class="italic">Hover over an event</span>
      </div>
      <div class="flex flex-row w-full justify-between"
           :class="{'invisible': scrollData.current <= 3}">
        <div v-for="{actor, color} in actorsIn(peabody1600s)"
            class="flex flex-row text-sm gap-2"
            :class="{'font-bold': highlightedActors.includes(actor)}">
          <EventSquare :colors="[color]" class="w-4"></EventSquare>
          {{actor}}
        </div>
      </div>
      <EventLegend v-if="showKey" v-model="keyValue"></EventLegend>
    </StaticData>

  </div>
</template>
<script>

import PeabodyGrid from "./grid/PeabodyGrid";
import EventKeyBox from "./key/EventKeyBox";
import EventLegend from "./key/EventLegend";
import StaticData from "@/components/data-access/StaticData";
import EventSquare from "./grid/EventSquare"

import {actorsIn} from "./peabody-utils";
export const docsDefinition = {
  matchName: ["PeabodyTutorial"],
  componentName: "PeabodyTutorial",
  props: {}
}

export default {
  components: {EventLegend, EventKeyBox, PeabodyGrid, StaticData, EventSquare},
  inject: ['scrollData'],
  data() {
    return {
      keyValue: 1,
      currentEvent: {},
      currentYear: null,
    }
  },
  computed: {
    showKey() {
      return this.scrollData.current > 2;
    },
    highlightedActors () {
      return this.currentEvent.actors || [];
    },
  },
  methods: {
    actorsIn,
    eventHovered({type, year, event}) {
      // console.log(data);
      this.keyValue = type == "full" ? null : type;
      this.currentEvent = event || {};
      this.currentYear = year;
    },
    yearsData(staticData) {
      if (this.scrollData.current == 4) {
        return staticData.filter(event => event.squares === "full");
      }
      if (this.scrollData.current > 4) {
        return staticData;
      }
      return 1600;
    }
  }
}
</script>
