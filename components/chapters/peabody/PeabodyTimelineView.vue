<template>
  <div class="col-span-full bg-black text-white pt-20">
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

      <div class="w-full mt-12 flex justify-center">
        <div class="flex w-3/4">
          <div
            v-for="(yearBucket, y) in years"
            class="w-6 h-full flex flex-col-reverse border border-transparent"
            :class="{
              'border-white': currentCenturyNum + y == hoveredYear - 1,
            }"
            :key="y"
          >
            <template v-if="yearBucket.events">
              <EventSquare
                v-for="(event, i) in yearBucket.events"
                class="w-full"
                @hoverStart="eventHovered"
                :year="event.year - 1"
                :type="event.type"
                :key="i"
                :colors="event.colors"
              ></EventSquare>
            </template>
          </div>
        </div>
      </div>
      <div class="w-full mt-1 pb-6 flex justify-center">
        <svg class="w-3/4" viewBox="0 0 300 10">
          <line
            x1="0"
            y1="0"
            x2="300"
            y2="0"
            stroke="white"
            stroke-width="0.5"
          ></line>
          <g v-for="i in 100" :key="i">
            <line
              :x1="i * 3 - 1.5"
              :y1="0"
              :x2="i * 3 - 1.5"
              :y2="i % 10 == 0 ? 6 : 4"
              stroke="white"
              :stroke-width="0.5"
            ></line>
            <text
              v-if="i % 10 == 0"
              :x="i * 3 - (i == 100 ? 9 : 6)"
              :y="10"
              :textLength="9"
              fill="white"
              font-size="4"
              border="1"
              font-variant="small-caps"
            >
              {{ currentCenturyNum + i }}
            </text>
          </g>
        </svg>
      </div>
    </StaticData>
  </div>
</template>
<script>
import PeabodyGrid from "./grid/PeabodyGrid";
import StaticData from "@/components/data-access/StaticData";
import EventSquare from "./grid/EventSquare";

import { actorsIn, dataToYears, actorColors } from "./peabodyUtils";
import LocalImage from "../../global/docs-inclusions/LocalImage";

export const docsDefinition = {
  matchName: ["Peabody Timeline View"],
  componentName: "PeabodyTimelineView",
  props: {},
};

export default {
  components: {
    LocalImage,
    PeabodyGrid,
    StaticData,
    EventSquare,
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
          value.forEach((event, i) => {
            if (event?.actors) {
              events.push({
                year: Number(key),
                type: i + 1,
                colors: event.actors.map((a) => actorColors[a]),
              });
            }
          });
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
    },
  },
};
</script>
