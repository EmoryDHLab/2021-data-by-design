<template>
  <g>
    <line
      :x1="innerWidth"
      :y1="yValue + 3"
      x2="3"
      :y2="yValue + 3"
      stroke="black"
      :opacity="$parent.opacityFormatterY(this.y)"
      :stroke-width="$parent.strokeFormatterY(this.y)"
    ></line>
    <text
      fill="black"
      :x="innerWidth + 0.5"
      :y="yValue + 3.4"
      font-family="Arial"
      font-size="1.5"
      >{{ $parent.tickFormatterY(this.y) }}</text
    >
  </g>
</template>
<script>
export default {
  props: {
    innerWidth: Number,
    y: Number,
    yScale: Function,
    maxY: Number,
  },
  computed: {
    yValue: function () {
      return this.yScale(this.y);
    },
  },
};
</script>
