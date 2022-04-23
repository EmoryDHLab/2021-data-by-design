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
      transform="rotate(-90) translate(-30, 0)"
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
      v-bind:key="y"
      :y-scale="yScale"
      :y="y"
      :innerWidth="innerGridWidth"
    ></HorizontalGrid>
    <ColorAreaIncome :area="fillColorArea"></ColorAreaIncome>
    <path :d="ukLine" stroke-width=".4px" stroke="#D6BF24"></path>
    <path :d="usLine" stroke-width=".4px" stroke="#BB877F"></path>
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
        :transform="transformUSText"
      >
        US
      </text>
      <text
        fill="black"
        font-size="3"
        font-family="Chancery Cursive"
        :transform="transformUKText"
      >
        UK
      </text>
    </g>
  </g>
</template>
<script>
import * as d3 from "d3";
import VerticalGrid from "@/components/chapters/playfair/recreationElements/VerticalGrid";
import HorizontalGrid from "@/components/chapters/playfair/recreationElements/HorizontalGrid";
import OvalTitle from "@/components/chapters/playfair/recreationElements/OvalTitle";
import ColorAreaIncome from "@/components/chapters/playfair/recreationHover/ColorAreaIncome";

export default {
  components: { VerticalGrid, HorizontalGrid, OvalTitle, ColorAreaIncome },
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
    this.maxOn = prop => Math.max(...this.dataFile.map(d => d[prop]));
    this.minOn = prop => Math.min(...this.dataFile.map(d => d[prop]));
    this.maxUK = this.maxOn("ukMeanDollar");
    this.minUK = this.minOn("ukMeanDollar");
    this.maxUS = this.maxOn("usMeanDollar");
    this.maxY = Math.max(this.maxUK, this.maxUS);
    this.interval = 5000;
    this.dateInterval = 5;

    this.ellipse = { cx: 64, cy: 33, rx: (94 / 11) * 1.9, ry: 10 };
    this.topText = { text: "Average Income", x: 53, y: 30 };
    this.midText = { text: "a comparison between the", x: 53, y: 33.5 };
    this.botText = { text: "U.S. AND U.K.", x: 54, y: 37 };
  },
  methods: {
    tickFormatterY: function(tickVal) {
      return tickVal / 1000 + "K";
    },
    opacityFormatterY(tickVal) {
      if ((tickVal / 10000) % 1 === 0) return 0.4;
      else return 0.2;
    },
    strokeFormatterY(tickVal) {
      if ((tickVal / 10000) % 1 === 0) return 0.2;
      else return 0.1;
    }
  },
  computed: {
    fillColorArea() {
      const path = d3
        .area()
        .curve(d3.curveCatmullRom)
        .x0(d => this.xScale(d.Year) + 3)
        .x1(d => this.xScale(d.Year) + 3)
        .y0(d => this.yScale(d.ukMeanDollar) + 3)
        .y1(d => this.yScale(d.usMeanDollar) + 3);
      return path(this.dataFile);
    },
    transformUSText: function() {
      return "rotate(-15) translate(" + 35 + "," + 25 + ")";
    },
    transformUKText: function() {
      return "rotate(-20) translate(" + 34 + "," + 36 + ")";
    },
    yTicks: function() {
      return this.yScale.ticks(20);
    },
    xValues: function() {
      var xNums = [];
      var startYear = parseInt(this.dataFile[0].Year);
      var endYear = parseInt(this.dataFile[this.dataFile.length - 1].Year);
      for (var i = startYear; i <= endYear; i += this.dateInterval) {
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
    ukLine() {
      const path = d3
        .area()
        .x(d => this.xScale(d.Year) + 3)
        .y(d => this.yScale(d.ukMeanDollar) + 3)
        .curve(d3.curveCatmullRom)
        .defined(function(d) {
          return d.ukMeanDollar;
        });
      return path(this.dataFile);
    },
    usLine() {
      const path = d3
        .area()
        .x(d => this.xScale(d.Year) + 3)
        .y(d => this.yScale(d.usMeanDollar) + 3)
        .curve(d3.curveCatmullRom)
        .defined(function(d) {
          return d.usMeanDollar;
        });
      return path(this.dataFile);
    },
    xScale() {
      return d3
        .scaleLinear()
        .range([0, (this.width / 11) * 10])
        .domain(
          d3.extent(this.dataFile, function(d) {
            return d.Year;
          })
        );
    },
    yScale() {
      return d3
        .scaleLinear()
        .range([this.height, 0])
        .domain([0, this.maxY + this.interval]);
    }
  }
};
</script>
<style scoped></style>
