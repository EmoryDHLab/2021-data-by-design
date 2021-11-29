<template>
  <svg class="event-key" viewBox="0 0 100 100" :id="`event-key-${_uid}`"
    :aria-labelledby="`event-key-${_uid}-title event-key-${_uid}-desc`">

    <title :id="`event-key-${_uid}-title`">Event Key</title>
    <desc :id="`event-key-${_uid}-desc`"></desc>

    <filter id="shadow">
      <feDropShadow dx="0" dy="0" stdDeviation="3"/>
    </filter>

    <g :style="{filter: dropShadow ? 'url(#shadow)' : 'none'}">
      <g v-for="(color, index) in fixedColors" :key="index" @mouseover="setHovered(index)">
        <EventSquare
          :x="1 + (index % 3) * 30"
          :y="1 + (Math.floor(index / 3)) * 30"
          :colors="color"
          :width="30"
          :height="30"
        ></EventSquare>

        <text v-if="showNumbers"
          class="number"
          :x="10 + (index % 3) * 30"
          :y="22 + (Math.floor(index / 3)) * 30"
          :fill="textColor(color)"
        >{{index + 1}}</text>
      </g>
      <rect width="92" height="92" stroke="orange" stroke-width="3" fill="none" />
    </g>
  </svg>
</template>

<script>
import EventSquare from "../grid/EventSquare"
import EventLegend from "./EventLegend";
export default {
  components: {EventLegend, EventSquare},
  props: {
    value: {
      type: Number,
      validator(num) {
        return num >= 1 && num <= 9;
      }
    },
    hoverable: {
      type: Boolean,
      default: true,
    },
    colors: {
      //Pass an array of colors, which are either String CSS-valid colors
      //or a falsy value for white
      type: Array,
      validator(array) {
        return array.length === 9;
      },
      default() {
        return [false, false, false,
                false, false, false,
                false, false, false];
      }
    },
    showNumbers: {
      type: Boolean,
      default: true
    },
    dropShadow: {
      type: Boolean,
      default: true
    },

  },
  computed: {
    fixedColors() {
      return this.colors.map(color => Array.isArray(color) ? color : [color]);
    }
  },
  methods: {
    textColor(squareColor) {
      return (!squareColor || !squareColor[0] || squareColor == [] || squareColor === 'none') ? 'black' : 'white'
    },
    setHovered(index) {
      if (this.hoverable) {
        this.hoveredNumber = index;
      }
    }
  },
  data() {
    return {
      hoveredNumber: null
    }
  },
  watch: {
    value (newVal, oldVal) {
      this.hoveredNumber = newVal - 1;
    },
    hoveredNumber (newVal, oldVal) {
      if (!this.hoverable || (oldVal && newVal === oldVal)) return;
      this.$emit('input', newVal + 1);
    }
  },
};

</script>

<style scoped>
.event-key {
  user-select: none;
  overflow: visible;
}

.number {
  font-family: monospace;
  font-size: 14pt;
  /* font-size: 100%; */
}

.label {
  font-family: monospace;
  font-size: 12pt;
}

</style>
