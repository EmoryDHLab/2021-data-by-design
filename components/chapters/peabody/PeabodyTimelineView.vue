<template>
  <div class="col-span-full bg-black text-white">
    Timeline View {{ hoveredYear }}
    <StaticData
      :dataset="['peabody1600s']"
      v-slot="staticData"
      @loaded="loadedData"
    >
      <div class="flex mt-4">
        <div class="w-1/2 flex justify-center">
          <div class="w-3/4">
            <PeabodyGrid
              :overlay-path="'PeabodyImg/' + currentCentury + '.jpg'"
              :years-data="events"
              @hoverStart="eventHovered"
            ></PeabodyGrid>
          </div>
        </div>

        <div class="w-1/2 flex justify-center">
          <div class="w-3/4">
            <PeabodyGrid
              :years-data="events"
              :highlighted="highlightedSquare"
              @hoverStart="eventHovered"
            ></PeabodyGrid>
          </div>
        </div>
      </div>

      <div class="w-full mt-4 flex justify-center">
        <div class="flex w-3/4">
          <div
            v-for="(yearBucket, y) in years"
            class="w-6 h-full flex flex-col-reverse"
            :class="{
              'border border-white': currentCenturyNum + y == hoveredYear - 1,
            }"
            :key="y"
          >
            <template v-if="yearBucket.events">
              <EventSquare
                class="w-full"
                v-for="(event, i) in yearBucket.events"
                :key="i"
                :colors="event"
              ></EventSquare>
            </template>
          </div>
        </div>
      </div>
      <div class="w-full mt-1 flex justify-center">
        <svg class="w-3/4" viewBox="0 0 300 10">
          <line
            x1="0"
            y1="0"
            x2="300"
            y2="0"
            stroke="white"
            stroke-width="0.5"
          ></line>
          <line
            v-for="i in 100"
            :key="i"
            :x1="i * 3 - 1.5"
            :y1="0"
            :x2="i * 3 - 1.5"
            :y2="i % 10 == 0 ? 6 : 4"
            stroke="white"
            :stroke-width="0.5"
          ></line>
        </svg>
      </div>
    </StaticData>
  </div>
</template>
<script>
import PeabodyGrid from "./grid/PeabodyGrid";
import EventKeyBox from "./key/EventKeyBox";
import EventLegend from "./key/EventLegend";
import StaticData from "@/components/data-access/StaticData";
import EventSquare from "./grid/EventSquare";
import ActorSelect from "./quiz/ActorSelect";

import { actorsIn, dataToYears, actorColors } from "./peabody-utils";
import BaseButton from "../../base/BaseButton";
import LocalImage from "../../global/docs-inclusions/LocalImage";

import EventBox from "./quiz/EventBox";
import EventCheckbox from "./quiz/EventCheckbox";

export const docsDefinition = {
  matchName: ["Peabody Timeline View"],
  componentName: "PeabodyTimelineView",
  props: {},
};

export default {
  components: {
    EventCheckbox,
    LocalImage,
    EventLegend,
    EventBox,
    EventKeyBox,
    PeabodyGrid,
    BaseButton,
    StaticData,
    EventSquare,
    ActorSelect,
  },
  data() {
    return {
      currentCentury: "1600s",
      events: [],
      hoveredType: 1,
      hoveredEvent: {},
      hoveredYear: null,
    };
  },
  computed: {
    currentCenturyNum() {
      return parseInt(this.currentCentury);
    },
    highlightedActors() {
      return this.hoveredEvent.actors || [];
    },
    highlightedSquare() {
      if (this.hoveredYear && this.hoveredType) {
        const res = Number(
          this.hoveredYear - this.currentCenturyNum + "." + this.hoveredType
        );
        return res;
      }
      return false;
    },
    years() {
      const years = Array.from({ length: 100 }, (_, i) => ({
        year: this.currentCenturyNum + i + 1,
      }));
      if (this.events?.length) {
        for (const [key, value] of Object.entries(dataToYears(this.events))) {
          const insertAt = key - this.currentCenturyNum - 1;
          const events = [];
          for (const { actors } of value.filter((e) => e?.actors)) {
            events.push(actors.map((a) => actorColors[a]));
          }

          // value.map(obj => obj.actors?.length ? obj.actors.map(a => actorColors[a]))
          // { colors: value?.actors?.length ? value.actors.map(a => actorColors[a]) : []};

          years[insertAt].events = events;
        }
      }
      return years;
    },
  },
  methods: {
    shownActors(staticData) {
      const dataset = this.currentDataset(staticData);
      if (!dataset) return [];
      const actorObjects = actorsIn(dataset);
      if (!actorObjects?.length) return [];
      return actorObjects.map(({ actor }) => actor);
    },
    actorsIn,
    eventHovered({ type, year, event }) {
      this.hoveredType = type == "full" ? null : type;
      this.hoveredEvent = event || {};
      if (year < this.currentCenturyNum) {
        year += this.currentCenturyNum;
      }
      this.hoveredYear = year + 1;
    },
    loadedData({ name, data }) {
      this.events = data;
      this.currentCentury = name.split("peabody")[1];
      console.log("loaded", this.years);
    },
  },
};
</script>
