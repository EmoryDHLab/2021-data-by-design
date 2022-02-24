<template>
  <div class="col-span-full bg-black text-white">
    <StaticData :dataset="datasets" v-slot="staticData">
      Quiz here {{currentCentury}}
      {{highlightedActors}}

      <div class="flex">
        <div class="w-1/2 flex">
          <div class="w-3/4">
            <EventLegend class="text-white ml-4" :value="hoveredType" />
          </div>
          <ActorSelect :vertical="true" :shown-actors="shownActors(staticData)" :selected-actors="highlightedActors"></ActorSelect>
        </div>
        <div class="w-1/2">
          <div class="flex gap-2">
            <BaseButton v-for="century in Object.keys(centuries)"
                        :key="century"
                        :selected="currentCentury == century"
                        :text="century"
                        @click="currentCentury = century"
            />
          </div>
          <EventBox v-model="centuries[currentCentury].eventIndex"
                    :years-data="currentDataset(staticData)"></EventBox>
        </div>
      </div>

      <div class="m-8 flex flex-row justify-evenly">
        <div class="w-2/5">
          <PeabodyGrid :overlay-path="'PeabodyImg/' + currentCentury + '.jpg'"
                       :years-data="currentDataset(staticData)"
                       @hoverStart="eventHovered"
          ></PeabodyGrid>
        </div>
        <div class="w-2/5">
          <PeabodyGrid :years-data="currentDataset(staticData)"
                       :highlighted="highlightedSquare"
                       @hoverStart="eventHovered"
                       @click="gridClicked"
          ></PeabodyGrid>
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
import EventSquare from "./grid/EventSquare"
import ActorSelect from "./quiz/ActorSelect";

import {actorsIn} from "./peabody-utils";
import BaseButton from "../../base/BaseButton";
import LocalImage from "../../global/docs-inclusions/LocalImage";

import EventBox from "./quiz/EventBox";
export const docsDefinition = {
  matchName: ["PeabodyQuiz"],
  componentName: "PeabodyQuiz",
  props: {}
}

export default {
  components: {LocalImage, EventLegend, EventBox, EventKeyBox, PeabodyGrid, BaseButton, StaticData, EventSquare, ActorSelect},
  data() {
    return {
      centuries: {
        "1500s": {
          eventProgress: [],
          eventIndex: 1
        },
        "1600s": {
          eventProgress: [],
          eventIndex: 1
        },
        "1700s": {
          eventProgress: [],
          eventIndex: 1
        },
        "1800s": {
          eventProgress: [],
          eventIndex: 1
        },
      },
      currentCentury: "1500s",
      hoveredType: 1,
      hoveredEvent: {},
      hoveredYear: null,
    }
  },
  computed: {
    datasets () {
      return Object.keys(this.centuries).map(c => "peabody" + c);
    },
    highlightedActors () {
      return this.hoveredEvent.actors || [];
    },
    highlightedSquare() {
      if (this.hoveredYear) {
        const res = Number(this.hoveredYear - parseInt(this.currentCentury) + 1 +  '.' + this.hoveredType)
        return res;
      }
    }
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
      return actorObjects.map( ({actor}) => actor);
    },
    allEvents(staticData) {
      // this.currentDataset(staticData).map
    },
    actorsIn,
    eventHovered({type, year, event}) {
      this.hoveredType = type == "full" ? null : type;
      this.hoveredEvent = event || {};
      this.hoveredYear = year;

    },
    gridClicked() {
      // const guessing = this.currentDataset
    }
  }
}
</script>
