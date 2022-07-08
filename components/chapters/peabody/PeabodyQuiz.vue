<template>
  <div class="col-span-full bg-offblack text-white mt-12 pt-20">
    <StaticData :dataset="datasets" v-slot="staticData" @loaded="loadedData">
      <div class="w-full flex flex-row">
        <div class="w-1/2 flex items-center justify-center">
          <div class="w-8/12">
            <PeabodyGrid
              :overlay-path="'PeabodyImg/' + currentCentury + '.jpg'"
              :years-data="centuries[currentCentury].events"
              @hoverStart="eventHovered"
            ></PeabodyGrid>
          </div>
        </div>

        <div class="w-1/2 flex items-center justify-center">
          <div class="w-8/12">
            <PeabodyGrid
              :years-data="centuries[currentCentury].solvedEvents"
              :highlighted="highlightedSquare"
              @hoverStart="eventHovered"
              @click="gridClicked"
            ></PeabodyGrid>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-row py-12 xl:py-8">
        <div class="w-1/2 flex flex-col gap-4 items-center">
          <div
            class="flex flex-col gap-12 xl:flex-row w-4/5 justify-between items-center"
          >
            <div class="w-full xl:w-4/5">
              <EventLegend class="text-white ml-4" :value="hoveredType" />
            </div>
            <ActorSelect
              :vertical="$breakpoints.includes('xl')"
              :shown-actors="shownActors(staticData)"
              :selected-actors="highlightedActors"
            ></ActorSelect>
          </div>
        </div>

        <div class="w-1/2 flex flex-col gap-4 items-center">
          <div class="h-72r xl:h-56 flex flex-col justify-evenly items-center">
            <div class="flex w-full justify-evenly">
              <BaseButton
                v-for="century in Object.keys(centuries)"
                :key="century"
                :selected="currentCentury == century"
                :text="century"
                @click="currentCentury = century"
              />
            </div>
            <EventBox
              v-if="centuries[currentCentury].events"
              v-model="centuries[currentCentury].eventIndex"
              :solvedEvents="centuries[currentCentury].solvedEvents"
              :eventData="centuries[currentCentury].events"
              @solveClicked="solveClicked"
            />
            <div class="-ml-16 flex uppercase divide-x">
              <button
                @click="solveCentury"
                class="hover:underline pr-2 flex items-center gap-2"
              >
                Complete
              </button>
              <button @click="resetCentury" class="hover:underline pl-2">
                Reset
              </button>
            </div>
          </div>
        </div>
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

import { actorsIn } from "./peabody-utils";
import BaseButton from "../../base/BaseButton";
import LocalImage from "../../global/docs-inclusions/LocalImage";

import EventBox from "./quiz/EventBox";
import EventCheckbox from "./quiz/EventCheckbox";

export const docsDefinition = {
  matchName: ["PeabodyQuiz"],
  componentName: "PeabodyQuiz",
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
      centuries: {
        "1500s": {
          events: [],
          solvedEvents: [],
          eventIndex: 0,
        },
        "1600s": {
          events: [],
          solvedEvents: [],
          eventIndex: 0,
        },
        "1700s": {
          events: [],
          solvedEvents: [],
          eventIndex: 0,
        },
        "1800s": {
          events: [],
          solvedEvents: [],
          eventIndex: 0,
        },
      },
      currentCentury: "1500s",
      hoveredType: 1,
      hoveredEvent: {},
      hoveredYear: null,
    };
  },
  computed: {
    currentCenturyNum() {
      return parseInt(this.currentCentury);
    },
    currentCenturyData() {
      return this.centuries[this.currentCentury];
    },
    datasets() {
      return Object.keys(this.centuries).map((c) => "peabody" + c);
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
  },
  methods: {
    currentDataset(staticData) {
      const data = staticData["peabody" + this.currentCentury];
      return data;
    },
    shownActors(staticData) {
      const dataset = this.currentDataset(staticData);
      if (!dataset) return [];
      const actorObjects = actorsIn(dataset);
      if (!actorObjects?.length) return [];
      return actorObjects.map(({ actor }) => actor);
    },
    allEvents(staticData) {
      // this.currentDataset(staticData).map
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
      const century = name.split("peabody")[1];
      this.centuries[century].events = data;
    },
    solveCentury() {
      for (const ev of this.currentCenturyData.events) {
        if (!this.currentCenturyData.solvedEvents.includes(ev)) {
          this.currentCenturyData.solvedEvents.push(ev);
        }
      }
    },
    resetCentury() {
      // this.currentCenturyData.solvedEvents.splice(0, this.currentCenturyData.solvedEvents.length);
      this.currentCenturyData.solvedEvents = [];
    },
    solveClicked(solved) {
      const { events, eventIndex, solvedEvents } = this.currentCenturyData;
      const currentEvent = events[eventIndex];
      if (solved) {
        const index = solvedEvents.findIndex((ev) => ev == currentEvent);
        this.currentCenturyData.solvedEvents.splice(index, 1);
        return;
      }
      this.currentCenturyData.solvedEvents.push(events[eventIndex]);
    },
    gridClicked() {
      const { events, eventIndex } = this.currentCenturyData;
      const guessing = events[eventIndex];
      if (
        guessing?.year == this.hoveredYear &&
        guessing.squares.includes(this.hoveredType)
      ) {
        this.currentCenturyData.solvedEvents.push(guessing);
        this.currentCenturyData.eventIndex++;
        return;
      }
      const matchingEventIndex = events.findIndex(
        (event) => event.year === this.hoveredYear
      );
      if (matchingEventIndex >= 0) {
        this.currentCenturyData.solvedEvents.push(events[matchingEventIndex]);
        this.currentCenturyData.eventIndex = matchingEventIndex;
      }
    },
  },
};
</script>
