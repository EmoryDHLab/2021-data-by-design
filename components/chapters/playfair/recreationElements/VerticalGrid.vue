<template>
  <g>
    <line
      :x1="xValue + offset"
      y1="3"
      :x2="xValue + offset"
      y2="47"
      opacity="0.4"
      stroke="black"
      stroke-width="0.1"
    ></line>
    <text
      v-if="ticks === true && $parent.tickFormatterX"
      fill="black"
      :x="xValue + offset - 2"
      :y="47 + offset - 1"
      font-family="Chancery Cursive"
      font-size="3"
      >{{ $parent.tickFormatterX(x) }}</text
    >
    <text
      v-else
      fill="black"
      :x="xValue + offset - 1"
      :y="47 + offset - 1"
      font-family="Chancery Cursive"
      font-size="3"
      >{{ x }}</text
    >
  </g>
</template>
<script>
export default {
  props: {
    x: Number,
    xScale: Function,
    ticks: Boolean,
    offset: Number,
  },
  computed: {
    xValue: function () {
      return this.xScale(this.x);
    },
  },
};
</script>
