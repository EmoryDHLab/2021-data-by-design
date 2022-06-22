<template>
  <g>
    <path
      v-for="(n, index) in importArcs.length"
      fill="#E4AE95"
      v-bind:data="importArcs[index](1)"
      :key="index + 'importArcs'"
      :d="importArcs[index](1)"
      transform=" translate(82, 32)"
    ></path>
    <path
      v-for="(n, index) in exportArcs.length"
      fill="#ABAF7B"
      v-bind:data="exportArcs[index](1)"
      :key="index + 'exportArcs'"
      :d="exportArcs[index](1)"
      transform=" translate(82, 32)"
    ></path>
    <path
      v-for="(n, index) in outlineArcs.length"
      fill="transparent"
      stroke="#7e7e7e"
      stroke-width="0.15"
      v-bind:data="outlineArcs[index](1)"
      :key="index + 'outlineArcs'"
      :d="outlineArcs[index](1)"
      transform=" translate(82, 32)"
    ></path>
    <text
      v-for="(n, index) in 11"
      fill="black"
      font-size="2.5"
      font-family="Chancery Cursive"
      v-bind:data="outlineArcs[index](1)"
      :key="index + '_yearText'"
      dy="2.3em"
      :transform="
        'translate(' +
          (offset +
            width / 2 +
            Math.sin(((2 * Math.PI) / 11) * (index + 0.4)) * (maxOuterR + 6)) +
          ',' +
          (32 -
            Math.cos(((2 * Math.PI) / 11) * (index + 0.4)) * (maxOuterR + 6)) +
          ') rotate(' +
          ((index + 0.4) * 360) / 11 +
          ')'
      "
      >{{ 1700 + index * 10 }}</text
    >
    <circle
      v-for="index in 8"
      fill="transparent"
      stroke="#9c9c9c"
      :stroke-width="strokeFormatterY(index)"
      :opacity="opacityFormatterY(index)"
      v-bind:data="index + 'circle'"
      :key="index + 'circle'"
      :cx="offset + width / 2"
      :cy="32"
      :r="index * radiusScale"
    ></circle>
    <text
      fill="black"
      font-size="3"
      font-family="Chancery Cursive"
      :x="78"
      :y="12"
    >
      Exports
    </text>

    <text
      fill="black"
      font-size="3"
      font-family="Chancery Cursive"
      :x="81"
      :y="height / 2"
    >
      Imports
    </text>
  </g>
</template>
<script>
import * as d3 from "d3";

export default {
  components: {},
  data() {
    return {
      height: 50,
      width: 34,
      offset: 65
    };
  },
  props: {
    playfairData: {
      type: Array
    }
  },
  created() {
    this.interval = 500000;
  },
  methods: {
    opacityFormatterY(tickVal) {
      if (tickVal % 2 === 0) return 0.4;
      else return 0.2;
    },
    strokeFormatterY(tickVal) {
      if (tickVal % 2 === 0) return 0.2;
      else return 0.1;
    }
  },
  computed: {
    maxImport: function() {
      var maxOn = prop => Math.max(...this.playfairData.map(d => d[prop]));
      return maxOn("Imports");
    },
    minImport: function() {
      var minOn = prop => Math.min(...this.playfairData.map(d => d[prop]));
      return minOn("Imports");
    },
    maxExport: function() {
      var maxOn = prop => Math.max(...this.playfairData.map(d => d[prop]));
      return maxOn("Exports");
    },
    maxY: function() {
      return d3.max(this.playfairData, function(d) {
        return Number(d.Exports) + Number(d.Imports);
      });
    },
    maxOuterR: function() {
      return ((this.maxY / this.interval + 1) * this.radiusScale) / 2;
    },
    minYear: function() {
      return Number(
        d3.min(this.playfairData, function(d) {
          return d.Years;
        })
      );
    },
    maxYear: function() {
      return Number(
        d3.max(this.playfairData, function(d) {
          return d.Years;
        })
      );
    },
    xValues: function() {
      var xNums = [];
      for (var i = this.minYear; i <= this.maxYear; i += 10) {
        xNums.push(i);
      }
      return xNums;
    },
    yValues: function() {
      var yNums = [];
      for (var i = this.interval; i <= this.maxY; i += this.interval) {
        yNums.push(i);
      }
      return yNums;
    },
    xScale() {
      return d3
        .scaleLinear()
        .range([0, this.innerGridWidth - 5])
        .domain([this.minYear - 5, this.maxYear + 5]);
    },
    yScale() {
      return d3
        .scaleLinear()
        .range([this.height, 0])
        .domain([0, this.maxY + this.interval]);
    },
    yearAngle() {
      return 3.27;
    },
    radiusScale() {
      return 1.6;
    },
    importArcs() {
      let importArcs = [];
      for (let idx = 0; idx < this.playfairData.length; idx++) {
        let endAng;
        let startAng =
          ((this.playfairData[idx].Years - 1700) * this.yearAngle * Math.PI) /
          180;
        if (idx != this.playfairData.length - 1) {
          endAng =
            ((this.playfairData[(idx + 1) % this.playfairData.length].Years -
              1700) *
              this.yearAngle *
              Math.PI) /
            180;
        } else endAng = 2 * Math.PI;
        let ia = d3
          .arc()
          .innerRadius(0)
          .outerRadius(
            ((Number(this.playfairData[idx].Imports) +
              Number(this.playfairData[idx].Exports)) /
              this.interval) *
              this.radiusScale
          )
          .startAngle(startAng)
          .endAngle(endAng);
        importArcs.push(ia);
      }
      return importArcs;
    },
    exportArcs() {
      let exportArcs = [];
      for (let idx = 0; idx < this.playfairData.length; idx++) {
        let endAng;
        let startAng =
          ((this.playfairData[idx].Years - 1700) * this.yearAngle * Math.PI) /
          180;
        if (idx != this.playfairData.length - 1) {
          endAng =
            ((this.playfairData[(idx + 1) % this.playfairData.length].Years -
              1700) *
              this.yearAngle *
              Math.PI) /
            180;
        } else endAng = 2 * Math.PI;
        let ea = d3
          .arc()
          .innerRadius(0)
          .outerRadius(
            (this.playfairData[idx].Imports / this.interval) * this.radiusScale
          )
          .startAngle(startAng)
          .endAngle(endAng);
        exportArcs.push(ea);
      }
      return exportArcs;
    },
    outlineArcs() {
      let outlineArcs = [];
      let maxOuterR = ((this.maxY / this.interval + 1) * this.radiusScale) / 2;
      for (let i = 0; i < 11; i++) {
        let startAng = ((2 * Math.PI) / 11) * i;
        let endAng = ((2 * Math.PI) / 11) * (i + 1);
        let oa = d3
          .arc()
          .innerRadius(0)
          .outerRadius(maxOuterR)
          .startAngle(startAng)
          .endAngle(endAng);
        outlineArcs.push(oa);
      }
      return outlineArcs;
    }
  }
};
</script>
<style scoped></style>
