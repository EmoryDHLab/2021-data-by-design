<template>
  <g>
    <text
      fill="black"
      :x="height / 2"
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
      transform="rotate(-90) translate(-37, 0)"
    >
      U.S. Dollar
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
      v-for="(bar, index) in exportBars"
      fill="#E4AE95"
      v-bind:data="x"
      :key="index + 'export'"
      :height="bar.height"
      :width="bar.width"
      :x="bar.x + 1.5"
      :y="bar.y + 3"
    ></rect>
    <rect
      v-for="(bar, index) in importBars"
      fill="#ABAF7B"
      v-bind:data="x"
      :key="index + 'import'"
      :height="bar.height"
      :width="bar.width"
      :x="bar.x + 1.5"
      :y="bar.y + 3"
    ></rect>
    <VerticalGrid
      v-for="x in xValues"
      v-bind:data="x"
      v-bind:key="x"
      :x-scale="xScale"
      :x="x"
      ticks
      :offset="3"
    ></VerticalGrid>
    <HorizontalGrid
      v-for="y in yValues"
      v-bind:data="y"
      v-bind:key="y + 'h'"
      :y-scale="yScale"
      :y="y"
      :innerWidth="innerGridWidth"
    ></HorizontalGrid>
    <OvalTitle
      color="#FCE2B0"
      :ellipse="ellipse"
      :topText="topText"
      :midText="midText"
      :botText="botText"
    ></OvalTitle>
    <rect
      fill="transparent"
      x="3"
      y="3"
      :height="height"
      :width="width"
      stroke="black"
      stroke-width="0.25"
    ></rect>
    <line
      :x1="innerGridWidth"
      y1="3"
      :x2="innerGridWidth"
      y2="47"
      stroke="black"
      stroke-width="0.1"
    ></line>
    <g>
      <text
        fill="black"
        font-size="3"
        font-family="Chancery Cursive"
        x="36"
        y="30"
      >
        Exports
      </text>
      <text
        fill="black"
        font-size="3"
        font-family="Chancery Cursive"
        x="32"
        y="45"
      >
        Imports
      </text>
    </g>
  </g>
</template>
<script>
import * as d3 from "d3";
import VerticalGrid from "@/components/chapters/playfair/recreationElements/VerticalGrid";
import HorizontalGrid from "@/components/chapters/playfair/recreationElements/HorizontalGrid";
import OvalTitle from "@/components/chapters/playfair/recreationElements/OvalTitle";

export default {
  components: { VerticalGrid, HorizontalGrid, OvalTitle },
  data() {
    return {
      height: 44,
      width: 58,
      margin: 3,
      innerGridWidth: (58 / 11) * 10 + 3
    };
  },
  props: {
    playfairData: {
      type: Array
    }
  },
  created() {
    this.interval = 500000;

    this.ellipse = { cx: 20, cy: 17, rx: (94 / 11) * 1.9, ry: 10 };
    this.topText = { text: "EXPORTS & IMPORTS", x: 6, y: 15 };
    this.midText = { text: "to and from all", x: 14, y: 18.5 };
    this.botText = { text: "NORTH AMERICA", x: 7, y: 22 };
  },
  methods: {
    tickFormatterY(tickVal) {
      if (tickVal / 1000000 === 1) {
        return "1 Million";
      } else if ((tickVal / 1000000) % 1 === 0) {
        return tickVal / 1000000 + " Millions";
      } else if (tickVal === 200000) {
        return tickVal.toLocaleString();
      } else if (tickVal < 1000000) {
        return tickVal / 100000;
      } else {
        return tickVal / 1000000;
      }
    },
    opacityFormatterY(tickVal) {
      if ((tickVal / 1000000) % 1 === 0) return 0.4;
      else return 0.2;
    },
    strokeFormatterY(tickVal) {
      if ((tickVal / 1000000) % 1 === 0) return 0.2;
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
        .range([0, (this.width / 11) * 10])
        .domain([this.minYear - 5, this.maxYear + 5]);
    },
    yScale() {
      return d3
        .scaleLinear()
        .range([this.height, 0])
        .domain([0, this.maxY + this.interval]);
    },
    stackedData() {
      return d3.stack().keys(["Imports", "Exports"])(this.playfairData);
    },
    importBars() {
      let importBars = this.stackedData[0].map(d => {
        return {
          xLabel: "Imports",
          x: this.xScale(d.data.Years),
          y: this.yScale(d[1]),
          width: 3,
          height: this.height - this.yScale(d[1])
        };
      });
      console.log(importBars);
      return importBars;
    },
    exportBars() {
      let exportBars = this.stackedData[1].map(d => {
        return {
          xLabel: "Exports",
          x: this.xScale(d.data.Years),
          y: this.yScale(d[1]),
          width: 3,
          height: this.height - this.yScale(d[1])
        };
      });
      console.log(exportBars);
      return exportBars;
    }
  }
};
</script>
<style scoped></style>
