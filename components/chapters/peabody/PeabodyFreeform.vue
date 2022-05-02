<template>
  <div class="middle-center bg-offblack text-white mt-12 pt-8">
    <div
      class="
        w-full
        flex flex-row
        xl:flex-col
        gap-8
        justify-center
        xl:items-center
      "
    >
      <ActorSelect
        :vertical="!$breakpoints.includes('xl')"
        :editNames="true"
        :actorColors="actorColors"
        :shownActors="Object.keys(actorColors)"
        :selectedActors="[selectedActor]"
        @selected="selected"
      ></ActorSelect>
      <div class="w-8/12">
        <PeabodyGrid
          :actorColors="actorColors"
          :years-data="yearsData"
          @hoverStart="eventHovered"
          @click="gridClicked"
        ></PeabodyGrid>
      </div>
    </div>
  </div>
</template>
<script>
import PeabodyGrid from "./grid/PeabodyGrid";
import ActorSelect from "./quiz/ActorSelect";

export const docsDefinition = {
  matchName: ["PeabodyFreeform"],
  componentName: "PeabodyFreeform",
  props: {},
};

export default {
  components: {
    PeabodyGrid,
    ActorSelect,
  },
  data() {
    return {
      yearsData: [],
      actorColors: {
        orange: "rgb(222,145,49)",
        France: "rgb(60,100,100)",
        Holland: "rgb(68,108,73)",
        Sweden: "rgb(217,182,17)",
        Spain: "rgb(209,42,5)",
      },
      hoveredType: 1,
      hoveredYear: null,
      // hoveredEvent: {},
      selectedActor: "blue",
    };
  },
  computed: {},
  methods: {
    selected(actor) {
      this.selectedActor = actor;
    },
    eventHovered({ type, year, event }) {
      this.hoveredType = type == "full" ? null : type;
      // this.hoveredEvent = event || {};
      // if (year < this.currentCenturyNum) {
      //   year += this.currentCenturyNum;
      // }
      this.hoveredYear = year + 1;
      console.log(this.hoveredYear);
    },
    gridClicked() {
      const existingIndex = this.yearsData.findIndex(
        (yearData) =>
          yearData.year == this.hoveredYear &&
          yearData.squares.includes(this.hoveredType)
      );
      if (existingIndex !== -1) {
        const existing = this.yearsData[existingIndex];
        if (existing.actors.includes(this.selectedActor)) {
          if (existing.actors.length == 1) {
            this.yearsData.splice(existingIndex, 1);
            return;
          }
          existing.actors.splice(
            existing.actors.indexOf(this.selectedActor),
            1
          );
          return;
        }
        existing.actors.push(this.selectedActor);
        return;
      }
      this.yearsData.push({
        actors: [this.selectedActor],
        event: "user created",
        squares: [this.hoveredType],
        year: this.hoveredYear,
      });
    },
  },
};
</script>
