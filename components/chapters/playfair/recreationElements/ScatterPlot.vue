<template>
  <circle :cx="xValue + 3" :cy="yValue + 3" r="0.5" :fill="color"></circle>
</template>
<script>
export default {
  props: {
    x: Object,
    xScale: Function,
    yScale: Function,
    color: String,
  },
  computed: {
    xValue: function () {
      return this.xScale(this.x.x);
    },
    yValue: function () {
      return this.yScale(this.x.y);
    },
  },
};
</script>
