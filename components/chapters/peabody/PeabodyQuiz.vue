<template>
  <div class="col-span-full bg-black">
    <StaticData :dataset="datasets" v-slot="staticData">
      Quiz here {{currentCentury}}

      <div class="w-1/2">
        <div class="flex gap-2">
          <BaseButton v-for="century in centuries"
                      :key="century"
                      :selected="currentCentury == century"
                      :text="century"
                      @click="currentCentury = century"
          />
        </div>

        <EventBox v-model="quizEventIndex" :years-data="currentDataset(staticData)"></EventBox>
      </div>

      <div class="flex flex-row justify-evenly">
        <LocalImage class="w-2/5":path="'PeabodyImg/' + currentCentury + '.jpg'"></LocalImage>
        <div class="w-2/5">
          <PeabodyGrid :years-data="currentDataset(staticData)"></PeabodyGrid>
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
  components: {LocalImage, EventLegend, EventBox, EventKeyBox, PeabodyGrid, BaseButton, StaticData, EventSquare},
  data() {
    return {
      centuries: ["1500s", "1600s", "1700s", "1800s"],
      currentCentury: "1500s",
      quizEventIndex: 1,
      keyValue: 1,
      currentEvent: {},
      currentYear: null,
    }
  },
  computed: {
    datasets () {
      return this.centuries.map(c => "peabody" + c);
    },
    highlightedActors () {
      return this.currentEvent.actors || [];
    },
  },
  methods: {
    currentDataset(staticData) {
      const data = staticData["peabody" + this.currentCentury];
      return data;
    },
    allEvents(staticData) {
      // this.currentDataset(staticData).map
    },
    actorsIn,
    eventHovered({type, year, event}) {
      // console.log(data);
      this.keyValue = type == "full" ? null : type;
      this.currentEvent = event || {};
      this.currentYear = year;
    },
  }
}
</script>
