<template>
  <svg>
    <rect
      fill="transparent"
      height="100"
      width="120"
      stroke="black"
      strokeWidth="2"
    ></rect>
    <rect fill="white" height="100" width="100" opacity="0.2"></rect>
    <!-- <g v-for="line in this.playfairData" :key="line.Years">
      <path :d="getYearData(line.Years).toString()" stroke="red" />
    </g> -->
  </svg>
</template>
<script>
import * as d3 from "d3";

export default {
  data() {
    return {};
  },
  mounted() {},
  props: {
    playfairData: {
      type: Array,
      validator(arr) {
        return arr?.every(data => {
          const requiredKeys = [
            "Years",
            "Imports",
            "Exports",
            "Balance",
            "Imports1801",
            "Exports1801",
            "ImportsDraft",
            "ExportsDraft"
          ];
          return requiredKeys.every(key => key in data);
        });
      }
    }
  },
  computed: {
    somePath() {
      const p = d3.path();
      p.moveTo(1, 2);
      p.lineTo(97, 98);
      p.closePath();
      return p;
    },
    years() {
      const p = d3.path();
      p.moveTo(1, 2);
      p.lineTo(year - 1699, 98);
      p.closePath();
      return p;
    }
  },
  methods: {
    getYearData(year) {
      // console.log(this.playfairData);
      const p = d3.path();
      p.moveTo(1, 2);
      p.lineTo(year - 1699, 98);
      p.closePath();
      return p;
    }
  }
};
</script>
