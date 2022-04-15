<template>
  <g>
    <text
      fill="black"
      :x="width / 2"
      y="2.3"
      font-family="Times New Roman"
      font-size="2.3"
    >
      Time
    </text>
    <text
      fill="black"
      :y="2"
      font-family="Times New Roman"
      font-size="2.3"
      transform="rotate(-90) translate(-28, 0)"
    >
      Money
    </text>
    <rect
      fill="white"
      x="3"
      y="3"
      :height="height"
      :width="(width / 11) * 10"
      opacity="0.2"
    ></rect>
    <rect
      fill="transparent"
      x="3"
      y="3"
      :height="height"
      :width="width"
      stroke="black"
      stroke-width="0.25"
    ></rect>
    <g>
      <text
        fill="black"
        font-size="3"
        font-family="Chancery Cursive"
        :transform="transformImportText"
      >
        Line of Imports
      </text>
      <text
        fill="black"
        font-size="3"
        font-family="Chancery Cursive"
        :transform="transformExportText"
      >
        Line of Exports
      </text>
    </g>
    <VerticalGrid
      v-for="x in xTicks"
      v-bind:data="x"
      v-bind:key="x"
      :x-scale="xScale"
      :x="x"
      ticks
      :offset="3"
    ></VerticalGrid>
    <HorizontalGrid
      v-for="y in yTicks"
      v-bind:data="y"
      v-bind:key="y"
      :y-scale="yScale"
      :y="y"
      :innerWidth="innerGridWidth"
    ></HorizontalGrid>
    <OvalTitle
      color="#FCE2B0"
      :topText="topText"
      :midText="midText"
      :botText="botText"
    ></OvalTitle>
  </g>
</template>
<script>
import * as d3 from "d3";
import ScatterPlot from "@/components/chapters/playfair/recreations/ScatterPlot";
import VerticalGrid from "@/components/chapters/playfair/recreations/VerticalGrid";
import HorizontalGrid from "@/components/chapters/playfair/recreations/HorizontalGrid";
import OvalTitle from "@/components/chapters/playfair/recreations/OvalTitle";

export default {
  components: { VerticalGrid, HorizontalGrid, ScatterPlot, OvalTitle },
  data() {
    return {
      height: 44,
      width: 94,
      margin: 3,
      innerGridWidth: (94 / 11) * 10 + 3
    };
  },
  props: {
    dataFile: {
      type: Array
    }
  },
  created() {
    // this.maxOn = prop => Math.max(...this.dataFile.map(d => d[prop]));
    // this.minOn = prop => Math.min(...this.dataFile.map(d => d[prop]));
    // this.maxImport = this.maxOn("Imports");
    // this.minImport = this.minOn("Imports");
    // this.maxExport = this.maxOn("Exports");
    // this.maxY = Math.max(this.maxImport, this.maxExport + 1000000);
    // this.interval = 200000;

    this.topText = { text: "Average Income", offset: 12 };
    this.midText = { text: "a comparison between the", offset: 12 };
    this.botText = { text: "U.S. AND U.K.", offset: 12 };
  },
  computed: {
    transformImportText: function() {
      return (
        "rotate(-11) translate(" + this.width / 9 + "," + this.height + ")"
      );
    },
    transformExportText: function() {
      return "rotate(-65) translate(" + -5 + "," + 61 + ")";
    }
    // xMinorTicks: function() {
    //   return this.xMinorScale.ticks();
    // },
    // xMinorScale() {
    //   return d3
    //     .scaleLinear()
    //     .range([0, (this.width / 100) * 11])
    //     .domain([1770, 1782]);
    // },
    // xTicks: function() {
    //   return this.xScale.ticks();
    // },
    // yTicks: function() {
    //   return this.yScale.ticks(20);
    // },
    // xScale() {
    //   return d3
    //     .scaleLinear()
    //     .range([0, (this.width / 11) * 10])
    //     .domain(
    //       d3.extent(this.dataFile, function(d) {
    //         return d.Years;
    //       })
    //     );
    // },
    // yScale() {
    //   return d3
    //     .scaleLinear()
    //     .range([this.height, 0])
    //     .domain([0, this.maxY + this.interval]);
    // }
  }
};
</script>
<style scoped></style>
