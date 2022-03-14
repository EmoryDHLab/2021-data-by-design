<template>
  <line
    :x1="xValue + 3"
    y1="3"
    :x2="xValue + 3"
    y2="47"
    opacity="0.4"
    stroke="black"
    stroke-width="0.1"
  ></line>
</template>
<script>
export default {
  props: {
    x: Date,
    xScale: Function,
    yScale: Function
  },
  computed: {
    xValue: function() {
      return this.xScale(this.x);
    }
  }
};
</script>
