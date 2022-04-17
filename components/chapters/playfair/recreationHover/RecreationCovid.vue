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
      transform="rotate(-90) translate(-37, 0)"
    >
      Cases per 1 Million People
    </text>
    <rect
      fill="white"
      x="3"
      y="3"
      :height="height"
      :width="(width / 11) * 10"
      opacity="0.2"
    ></rect>
    <g>
      <text
        fill="black"
        font-size="3"
        font-family="Chancery Cursive"
        :transform="transformUSText"
      >
        U.S. Deaths
      </text>
      <text
        fill="black"
        font-size="3"
        font-family="Chancery Cursive"
        :transform="transformUKText"
      >
        U.K. Deaths
      </text>
    </g>
    <VerticalGrid
      v-for="x in xValues"
      v-bind:data="x"
      v-bind:key="x + 'v'"
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
  </g>
</template>
<script>
import * as d3 from "d3";
import VerticalGrid from "@/components/chapters/playfair/recreations/VerticalGrid";
import HorizontalGrid from "@/components/chapters/playfair/recreations/HorizontalGrid";
import OvalTitle from "@/components/chapters/playfair/recreations/OvalTitle";

export default {
  components: { VerticalGrid, HorizontalGrid, OvalTitle },
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
    this.interval = 500;
    this.dateInterval = 30;

    this.ellipse = { cx: 23, cy: 17, rx: (94 / 11) * 1.9, ry: 10 };
    this.topText = { text: "COVID-19 DEATHS", x: 11, y: 15 };
    this.midText = { text: "a comparison between the", x: 13, y: 18.5 };
    this.botText = { text: "U.S. AND U.K.", x: 13, y: 22 };
  },
  methods: {
    tickFormatterX: function(tickVal) {
      return this.dataFile[this.dataFile.length - tickVal].date.substring(
        5,
        10
      );
    },
    tickFormatterY: function(tickVal) {
      if (tickVal < 1000) return tickVal;
      return tickVal / 1000 + "k";
    },
    opacityFormatterY: function(tickVal) {
      if ((tickVal / 250) % 1 === 0) return 0.4;
      else return 0.2;
    },
    strokeFormatterY: function(tickVal) {
      if ((tickVal / 250) % 1 === 0) return 0.2;
      else return 0.1;
    }
  },
  computed: {
    transformedData: function() {
      function perCapita(capita, population, count) {
        return ((capita * count) / population).toFixed(2);
      }
      var capita = 1000000; //1M
      var ukPopulation = 66650000; //66.65 million
      var usaPopulation = 328200000; //328.2 million
      var maxX = this.dataFile.length;

      const newData = [];
      var idx = 0;
      this.dataFile.forEach(function(d) {
        var newObj = { ukDeaths: 0, usDeaths: 0, date: 0 };
        newObj.ukDeaths = perCapita(
          capita,
          ukPopulation,
          d.cumDeaths28DaysByDeathDate
        );
        newObj.usDeaths = perCapita(capita, usaPopulation, d.usDeath);
        newObj.date = maxX - idx;
        newData.push(newObj);
        idx++;
      });
      return newData;
    },
    maxUK: function() {
      var maxOn = prop => Math.max(...this.transformedData.map(d => d[prop]));
      return maxOn("ukDeaths");
    },
    minUK: function() {
      var minOn = prop => Math.min(...this.transformedData.map(d => d[prop]));
      return minOn("ukDeaths");
    },
    maxUS: function() {
      var maxOn = prop => Math.max(...this.transformedData.map(d => d[prop]));
      return maxOn("usDeaths");
    },
    transformUSText: function() {
      return "rotate(-14) translate(" + 33 + "," + 41 + ")";
    },
    transformUKText: function() {
      return "rotate(-10) translate(" + 36 + "," + 29 + ")";
    },
    xValues: function() {
      var xNums = [];
      for (
        var i = this.dateInterval;
        i <= this.dataFile.length;
        i += this.dateInterval
      ) {
        xNums.push(i);
      }
      return xNums.reverse();
    },
    yValues: function() {
      var yNums = [];
      for (
        var i = 50;
        i <= Math.max(this.maxUK, this.maxUS);
        i += this.interval / 10
      ) {
        yNums.push(i);
      }
      return yNums;
    },
    ukLine() {
      const path = d3
        .area()
        .x(d => this.xScale(d.date) + 3)
        .y(d => this.yScale(d.ukDeaths) + 3)
        .curve(d3.curveCatmullRom)
        .defined(function(d) {
          return d.ukDeaths;
        });
      return path(this.transformedData);
    },
    usLine() {
      const path = d3
        .area()
        .x(d => this.xScale(d.date) + 3)
        .y(d => this.yScale(d.usDeaths) + 3)
        .curve(d3.curveCatmullRom)
        .defined(function(d) {
          return d.usDeaths;
        });
      return path(this.transformedData);
    },
    xScale() {
      return d3
        .scaleLinear()
        .range([0, (this.width / 11) * 10])
        .domain([0, this.dataFile.length]);
    },
    yScale() {
      return d3
        .scaleLinear()
        .range([this.height, 0])
        .domain([0, Math.max(this.maxUK, this.maxUS) + 100]);
    }
  }
};
</script>
<style scoped></style>
