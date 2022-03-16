<template>
  <svg>
    <text
      v-if="scrollData.current > 7"
      fill="black"
      :x="width / 2"
      y="2.3"
      font-family="Times New Roman"
      font-size="2.3"
    >
      Time
    </text>
    <text
      v-if="scrollData.current > 7"
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
    <g v-if="scrollData.current >= 6">
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
    <g v-if="scrollData.current === 3">
      <VerticalGrid
        id="minor"
        v-for="x in xMinorTicks"
        v-bind:data="x"
        v-bind:key="x"
        :x-scale="xMinorScale"
        :x="x"
        :offset="(width / 11) * 7 + 3"
      ></VerticalGrid>
    </g>
    <HorizontalGrid
      v-for="y in yTicks"
      v-bind:data="y"
      v-bind:key="y"
      :y-scale="yScale"
      :y="y"
      :innerWidth="innerGridWidth"
    ></HorizontalGrid>
    <g v-if="scrollData.current === 2">
      <ScatterPlot
        v-for="x in scatterImport"
        v-bind:data="x"
        v-bind:key="x.x + x.y"
        :x-scale="xScale"
        :y-scale="yScale"
        :x="x"
        color="#D6BF24"
      ></ScatterPlot>
      <ScatterPlot
        v-for="x in scatterExport"
        v-bind:data="x"
        v-bind:key="x.x + x.y"
        :x-scale="xScale"
        :y-scale="yScale"
        :x="x"
        color="#BB877F"
      ></ScatterPlot>
    </g>
    <OvalTitle v-if="scrollData.current >= 7" color="#FCE2B0"></OvalTitle>
    <g v-if="scrollData.current > 2">
      <path :d="exportLined" stroke-width=".4px" stroke="#BB877F"></path>
      <!-- <path :d="exportLine1801d" stroke-width=".4px" stroke="#BB877F"></path> -->
      <path :d="importLined" stroke-width=".4px" stroke="#D6BF24"></path>
      <!-- <path :d="importLine1801d" stroke-width=".4px" stroke="#D6BF24"></path> -->
      <!-- <path :d="lineUndefined" stroke-width=".5px" stroke="purple"></path> -->
      <!-- <path :d="exportDraftd" stroke-width=".5px" stroke="lime"></path> -->
      <!-- <path :d="importDraftd" stroke-width=".5px" stroke="green"></path> -->
    </g>
  </svg>
</template>
<script>
import * as d3 from "d3";
import ScatterPlot from "@/components/chapters/playfair/recreations/ScatterPlot";
import VerticalGrid from "@/components/chapters/playfair/recreations/VerticalGrid";
import HorizontalGrid from "@/components/chapters/playfair/recreations/HorizontalGrid";
import OvalTitle from "@/components/chapters/playfair/recreations/OvalTitle";

export default {
  components: { VerticalGrid, HorizontalGrid, ScatterPlot, OvalTitle },
  inject: ["scrollData"],
  data() {
    return {
      height: 44,
      width: 94,
      margin: 3,
      innerGridWidth: (94 / 11) * 10 + 3
    };
  },
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
  created() {
    this.maxOn = prop => Math.max(...this.playfairData.map(d => d[prop]));
    this.minOn = prop => Math.min(...this.playfairData.map(d => d[prop]));
    this.maxImport = this.maxOn("Imports");
    this.minImport = this.minOn("Imports");
    this.maxExport = this.maxOn("Exports");
    this.maxY = Math.max(this.maxImport, this.maxExport + 1000000);
    this.interval = 200000;
  },
  computed: {
    transformImportText: function() {
      return (
        "rotate(-11) translate(" + this.width / 9 + "," + this.height + ")"
      );
    },
    transformExportText: function() {
      return "rotate(-65) translate(" + 0 + "," + 60 + ")";
    },
    scatterImport: function() {
      return this.playfairData.map(d => ({
        x: d.Years,
        y: d.Imports
      }));
    },
    scatterExport: function() {
      return this.playfairData.map(d => ({
        x: d.Years,
        y: d.Exports
      }));
    },
    xMinorTicks: function() {
      return this.xMinorScale.ticks();
    },
    xMinorScale() {
      return d3
        .scaleLinear()
        .range([0, (this.width / 100) * 11])
        .domain([1770, 1782]);
    },
    xTicks: function() {
      return this.xScale.ticks();
    },
    yTicks: function() {
      return this.yScale.ticks(20); //20 is the number of horizontal lines/ ticks
    },
    xScale() {
      return d3
        .scaleLinear()
        .range([0, (this.width / 11) * 10])
        .domain(
          // extent is the equivalent of calling min and max simultaneously
          d3.extent(this.playfairData, function(d) {
            return d.Years;
          })
        );
    },
    yScale() {
      return (
        d3
          .scaleLinear()
          .range([this.height, 0])
          // pick y domain based on smallest and largest number of combined import and export numbers + yInterval for more space
          .domain([0, this.maxY + this.interval])
      );
    },
    exportLined() {
      const path = d3
        .area()
        .x(d => this.xScale(d.Years) + 3)
        .y(d => this.yScale(d.Exports) + 3)
        .curve(d3.curveCardinal)
        .defined(function(d) {
          return d.Exports;
        }); //limits this line to defined data
      return path(this.playfairData);
    },
    exportLine1801d() {
      const path = d3
        .area()
        .x(d => this.xScale(d.Years) + 3)
        .y(d => this.yScale(d.Exports1801) + 3)
        .curve(d3.curveCatmullRom)
        .defined(function(d) {
          return d.Exports1801;
        });
      return path(this.playfairData);
    },
    importLined() {
      const path = d3
        .area()
        .x(d => this.xScale(d.Years) + 3)
        .y(d => this.yScale(d.Imports) + 3)
        .curve(d3.curveCardinal)
        .defined(function(d) {
          return d.Imports;
        });
      return path(this.playfairData);
    },
    importLine1801d() {
      const path = d3
        .area()
        .x(d => this.xScale(d.Years) + 3)
        .y(d => this.yScale(d.Imports1801) + 3)
        .curve(d3.curveCatmullRom)
        .defined(function(d) {
          return d.Imports1801;
        });
      return path(this.playfairData);
    },
    importLine1801d() {
      const path = d3
        .area()
        .x(d => this.xScale(d.Years) + 3)
        .y(d => this.yScale(d.Imports1801) + 3)
        .curve(d3.curveCatmullRom)
        .defined(function(d) {
          return d.Imports1801;
        });
      return path(this.playfairData);
    },
    lineUndefined() {
      const path = d3
        .line()
        .x(d => this.xScale(d.Years))
        .y(d => this.yScale(d.Imports))
        .curve(d3.curveCardinal)
        .defined(function(d) {
          return d.critical;
        });
      return path(this.playfairData);
    },
    exportDraftd() {
      const path = d3
        .area()
        .x(d => this.xScale(d.Years) + 3)
        .y(d => this.yScale(d.ExportsDraft) + 3)
        .curve(d3.curveCatmullRom)
        .defined(function(d) {
          return d.ExportsDraft;
        });
      return path(this.playfairData);
    },
    importDraftd() {
      const path = d3
        .area()
        .x(d => this.xScale(d.Years) + 3)
        .y(d => this.yScale(d.ImportsDraft) + 3)
        .curve(d3.curveCatmullRom)
        .defined(function(d) {
          return d.ImportsDraft;
        });
      return path(this.playfairData);
    },
    lineUndefined2() {
      const path = d3
        .line()
        .x(d => this.xScale(d.Years) + 3)
        .y(d => this.yScale(d.Exports) + 3)
        .curve(d3.curveCardinal)
        .defined(d => d.critical);
      return path(this.playfairData);
    },
    areaUndefined() {
      const path = d3
        .area()
        .x(d => this.xScale(d.Years) + 3)
        .y(d => this.yScale(d.Imports) + 3)
        .curve(d3.curveCardinal)
        .defined(d => d.critical);
      return path(this.playfairData);
    }
  },
  methods: {
    yValues(interval, maxY) {
      var yNums = [];
      for (var i = interval; i <= maxY; i += interval) {
        yNums.push(i);
      }
      return yNums;
    }
  }
};
</script>
<style scoped></style>
