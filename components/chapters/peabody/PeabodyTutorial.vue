<template>
  <div class="w-full h-full flex flex-col gap-3 justify-center py-6">
    <PeabodyGrid
      :show-labels="scrollData.current >= 0"
      :show-squares="scrollData.current >= 0"
      :yearsData="yearsData(peabody1600s)"
      @hoverStart="eventHovered"
      v-slot="{
        hoveredYear,
        methods: { getYearXFromIndex, getYearYFromIndex },
      }"
    >
      >
      <EventKeyBox
        v-if="scrollData.current == 2"
        v-show="Number.isInteger(hoveredYear) && hoveredYear >= 0"
        v-model="keyValue"
        :width="9.5"
        :height="9.5"
        :x="getYearXFromIndex(hoveredYear)"
        :y="getYearYFromIndex(hoveredYear) + 0.1"
        :drop-shadow="false"
      />
    </PeabodyGrid>
    <div class="text-sm" :class="scrollData.current <= 1 ? 'hidden opacity-0 height-0' : ''">
      <span v-if="currentEvent.event"
        >{{ currentYear }}: {{ currentEvent.event }}</span
      >
      <span v-else class="italic">Hover over an event</span>
    </div>
    <div
      class="flex flex-row w-full justify-between"
      :class="scrollData.current <= 1 ? 'hidden opacity-0' : ''"
    >
      <div
        v-for="{ actor, color } in actorsIn(peabody1600s)"
        class="flex flex-row text-sm gap-2"
        :class="{ 'font-bold': highlightedActors.includes(actor), 'height-0': scrollData.current <= 1 }"
        :key="color"
      >
        <EventSquare :colors="[color]" class="w-4"></EventSquare>
        {{ actor }}
      </div>
    </div>
    <EventLegend :showing="showKey" v-model="keyValue"></EventLegend>
  </div>
</template>

<script>
import PeabodyGrid from "./grid/PeabodyGrid";
import EventKeyBox from "./key/EventKeyBox";
import EventLegend from "./key/EventLegend";
import EventSquare from "./grid/EventSquare";
import peabody1600s from "~/api/static/data/peabody1600s.json";
import { actorsIn } from "./peabodyUtils";

export const docsDefinition = {
  matchName: ["PeabodyTutorial"],
  componentName: "PeabodyTutorial",
  props: {},
};

export default {
  components: {
    EventLegend,
    EventKeyBox,
    PeabodyGrid,
    EventSquare,
  },
  inject: ["scrollData"],
  data() {
    return {
      keyValue: 1,
      currentEvent: {},
      currentYear: null,
      peabody1600s
    };
  },
  computed: {
    showKey() {
      return this.scrollData.current > 1;
    },
    highlightedActors() {
      return this.currentEvent.actors || [];
    },
  },
  methods: {
    actorsIn,
    eventHovered({ type, year, event }) {
      this.keyValue = type === "full" ? null : type;
      this.currentEvent = event || {};
      this.currentYear = year;
    },
    yearsData(staticData) {
      if (this.scrollData.current == 3) {
        return staticData.filter((event) => event.squares === "full");
      }
      if (this.scrollData.current > 3) {
        return staticData;
      }
      return 1600;
    },
  },
};
</script>

<style scoped>
  div {
    transition: height 1s ease, opacity 500ms ease;
  }
</style>
