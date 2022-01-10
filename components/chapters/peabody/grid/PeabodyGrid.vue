<template>
  <svg class="w-full" viewBox="0 0 99 99" @click="$emit('click')">
    <image v-if="overlayPath" :href="imgSrc" x="-3.5" y="-3.5" width="105.5" height="106"/>
    <g :opacity="overlayPath && 1">
      <rect v-if="!overlayPath" class="text-peabodyorange fill-current" x="0" width="100" height="99" @mouseout="hoveredYear = false"/>
      <g
        v-for="(n, i) in 100"
        @mouseover="hoveredYear = i"
      >
        <YearSquare
          :width="yearWidth - yearWidth / 48"
          :height="yearWidth - yearWidth / 48"
          :x="getYearXFromIndex(i)"
          :y="getYearYFromIndex(i)"
          :class="`year-square-${n}`"
          :ghost="!!overlayPath"
          :showSquares="true"
          :highlightYear="n == highlightedYear && !highlightedSquare"
          :highlightedSquare="n == highlightedYear ? highlightedSquare : null"
          :key="i"
          :actorColors="actorColors"
          :yearData="getYearData(n)"
          :year="getYear(i)"
          :label="showLabels && startYear + n"
          v-on="$listeners"
        >
        </YearSquare>
      </g>
    </g>
    <slot v-bind:hoveredYear="hoveredYear" v-bind:methods="{ getYearXFromIndex, getYearYFromIndex }"></slot>
  </svg>
</template>

<script>
import Visualization from "~/components/mixins/Visualization";
import {actorColors, dataToYears} from "../peabody-utils";
import YearSquare from './YearSquare.vue';
import EventKeyBox from "../key/EventKeyBox";

export const docsDefinition = {
  matchName: ["PeabodyGrid"],
  componentName: "PeabodyGrid",
  props: {},
};

export default {
  props: {
    overlayPath: String,
    highlighted: {
      type: [Number, Boolean],
      validator(number) {
        if (number === false) return true;
        if (isNaN(number)) return false;
        const str = String(number);
        const hasDecimal = str.includes(".");
        const oneDigitDecimal =
          str.slice(str.indexOf(".") + 1).length == 1;
        return (!hasDecimal || oneDigitDecimal) && number >= 1 && number < 101;
      },
    },
    yearsData: {
      type: [Array, Number],
      validator(arr) {
        if (Array.isArray(arr)) {
          return arr?.every(yearObj => {
            const requiredKeys = ["event", "year", "squares", "actors"];
            return requiredKeys.every(key => key in yearObj);
          })
        }
        const num = arr;
        return num >= 0;
      }
    },
    showSquares: {
      type: Boolean,
      default: true,
    },
    showLabels: {
      type: Boolean,
      default: false,
    },
    actorColors: {
      type: Object,
      default() {
        return actorColors;
      },
    },
  },
  components: {
    EventKeyBox,
    YearSquare,
  },
  data() {
    return {
      yearWidth: 9,
      hoveredYear: false,
    }
  },
  computed: {
    years() {
      try {
        if (Array.isArray(this.yearsData) && this.yearsData.length > 0) {
          return dataToYears(this.yearsData);
        }
      } catch (error) {
        console.error("Error in processing Peabody data", error);
      }
    },
    isEmpty() {
      if (this.years && typeof this.years === "object") {
        return Object.keys(this.years).length === 0;
      }
      return true;
    },
    startYear() {
      if (typeof this.yearsData === "number") {
        return this.yearsData;
      }
      if (this.isEmpty) return 0;
      return Math.round(Math.min(...Object.keys(this.years)) / 100) * 100;
    },

    highlightedYear() {
      return this.highlighted && Math.floor(this.highlighted);
    },
    highlightedSquare() {
      return this.highlighted && Math.round((this.highlighted - this.highlightedYear) * 10);
    },
    imgSrc () {
      if (this.overlayPath) {
        return require(`~/assets/images/${this.overlayPath}`);
      }
    }
  },
  methods: {
    hoverStart (data) {
      this.$emit('hoverStart', data);
    },
    getYear(n) {
      return this.startYear + n;
    },
    getYearData(n) {
      if (this.years) {
        return this.years[this.getYear(n)] || Array(9).fill(undefined);
      }
      return Array(9).fill(undefined);
    },
    getYearXFromIndex(ind) {
      let j = ind % 10;
      return 3 + j * this.yearWidth + (j > 4 ? 3 : 0);
    },
    getYearYFromIndex(ind) {
      let i = Math.floor(ind / 10);
      return 3 + i * this.yearWidth + (i > 4 ? 3 : 0);
    },
  },
};
</script>
