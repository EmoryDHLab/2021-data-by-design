<template>
  <g>
    <line
      :x1="innerWidth"
      :y1="yValue + 3"
      x2="3"
      :y2="yValue + 3"
      stroke="black"
      :opacity="opacityFormatterY(this.y)"
      :stroke-width="strokeFormatterY(this.y)"
    ></line>
    <text
      fill="black"
      :x="innerWidth + 0.5"
      :y="yValue + 3.4"
      font-family="Arial"
      font-size="1.5"
      >{{ tickFormatterY(this.y) }}</text
    >
  </g>
</template>
<script>
export default {
  props: {
    innerWidth: Number,
    y: Number,
    yScale: Function,
    maxY: Number
  },
  computed: {
    yValue: function() {
      return this.yScale(this.y);
    }
  },
  methods: {
    tickFormatterY(tickVal) {
      if (tickVal / 1000000 === 1) {
        //if the value is 1, omit s
        return "1 Million";
      } else if (tickVal === 0 || tickVal === 6000000) {
        //don't show if min / max values
        return "";
      } else if ((tickVal / 1000000) % 1 === 0) {
        //if the value is not 1, add an s
        return tickVal / 1000000 + " Millions";
      } else if (tickVal === 200000) {
        //first number on y-axis...might need to change to adapt for other data
        return tickVal.toLocaleString(); //adds the comma back into the number, for some reason comes in with comma but returns without
      } else if (tickVal < 1000000) {
        //less than 1 million but not the first y-value
        return tickVal / 100000;
      } else {
        //return the decimal numbers
        return tickVal / 1000000;
      }
    },
    opacityFormatterY(tickVal) {
      if ((tickVal / 1000000) % 1 === 0) return 0.4;
      else return 0.2;
    },
    strokeFormatterY(tickVal) {
      if ((tickVal / 1000000) % 1 === 0) return 0.2;
      else return 0.1;
    }
  }
};
</script>
