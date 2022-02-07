<template>
  <div class="w-full h-full flex flex-col gap-3 justify-center">
    Quiz Goes Here
    <BaseButton text="1600s"></BaseButton>
    <StaticData :dataset="['peabody1600s']" v-slot="{peabody1600s}">

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
export const docsDefinition = {
  matchName: ["PeabodyQuiz"],
  componentName: "PeabodyQuiz",
  props: {}
}

export default {
  components: {EventLegend, EventKeyBox, PeabodyGrid, BaseButton, StaticData, EventSquare},
  data() {
    return {
      centuries: ["1500s", "1600s", "1700s", "1800s"],
      keyValue: 1,
      currentEvent: {},
      currentYear: null,
    }
  },
  computed: {
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
