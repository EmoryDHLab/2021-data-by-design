<template>
  <g>
    <line
      :x1="xValue + 3"
      y1="3"
      :x2="xValue + 3"
      y2="47"
      opacity="0.4"
      stroke="black"
      stroke-width="0.1"
    ></line>
    <text
      fill="black"
      :x="xValue + 2"
      :y="47 + 2"
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
    xScale: Function
  },
  computed: {
    xValue: function() {
      return this.xScale(this.x);
    }
  }
};
</script>
