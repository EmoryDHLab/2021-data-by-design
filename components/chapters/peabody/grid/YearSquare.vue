<template>
  <svg viewBox="0 0 90 90">
    <rect :class="showSquares ? 'text-gray-200' : 'text-white'" class="fill-current" :width="90" :height="90"/>
    <EventSquare
      v-show="showSquares"
      v-for='n in 9'
      :width="30"
      :height="30"
      :highlighted="highlightedSquare == n"
      :key='n'
      :type="n"
      :year="year"
      :x = "getEventXFromIndex(n - 1)"
      :y = "getEventYFromIndex(n - 1)"
      :colors="getEventData(n)"
      />
    <!--      v-on="eventListeners"-->
    <text x="50%" y="50%" class="font-william text-2xl opacity-40 pointer-events-none" text-anchor="middle"
          dominant-baseline="central"
          v-if="showLabel && label">{{label}}</text>
  </svg>
</template>

<script>
import EventSquare, { events } from './EventSquare'
import {actorColors} from "../peabody-utils";

// const EventSquareInjected = Object.assign({ injects: [injects.registerEvents, injects.calcWidth, injects.data]}, EventSquare);

export default {
  props: {
    yearData: {
      type: Array,
      required: true
    },
    highlightedSquare: {
      type: Number
    },
    showLabel: {
      type: Boolean
    },
    label: {
      type: [String, Number],
    },
    year: {
      type: Number,
      required: true
    },
    actorColors: {
      type: Object,
      default () {
        return actorColors;
      }
    },
    showSquares: {
      type: Boolean,
      default: true
    },
  },
  components: {EventSquare},
  created() {
    // if (this.registerEvents) {
    //   this.registerEvents(this, Object.values(events))
    // }
  },
  mounted() {
    // if (this.yearData) {
    //   console.log(this.yearData);
    // }
  },
  computed: {
    colorData () {
      return this.yearData.map( squareObj =>
        squareObj ? squareObj.actors.map(actor => this.actorColors[actor]) : [false])
    },
    eventListeners () {
      const listenerFor = eventName => eventArgs => this.$emit(eventName, eventArgs )
      return Object.fromEntries(Object.values(events).map(event => [event, listenerFor(event)]))
    }
  },
  methods: {
    getEventXFromIndex (i) {
      return (i % 3) * (30)
    },
    getEventYFromIndex (i) {
      return Math.floor(i / 3) * (30)
    },
    // styles (n) {
    //   return {
    //     // width: this.sizes.rect / 3 + 'px',
    //     // height: this.sizes.rect / 3 + 'px',
    //     'transform': 'translate('
    //       + this.getEventXFromIndex(n-1) + 'px,'
    //       + this.getEventYFromIndex(n-1) + 'px)'
    //   }
    // },
    getEventData (n) {
      return this.colorData[n - 1] || []
    }
  }
}
</script>
