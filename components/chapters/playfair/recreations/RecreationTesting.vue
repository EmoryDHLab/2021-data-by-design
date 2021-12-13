<template>
  <svg id="path" class="w-full h-full" viewBox="0 0 100 100">
    <path stroke="red" stroke-width="2" :d="somePath.toString()"></path>
  </svg>
</template>
<script>
import { path } from "d3";
export default {
  data() {
    return {};
  },

  mounted() {
    console.log(this.somePath);
  },

  computed: {
    somePath() {
      const p = path();
      p.moveTo(1, 2);
      p.lineTo(9, 10);
      p.closePath();
      return p;
    }
  },

  methods: {}
};
</script>
