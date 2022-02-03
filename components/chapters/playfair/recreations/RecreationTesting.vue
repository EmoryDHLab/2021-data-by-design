<template>
  <svg id="pf_chart" ref="pf_chart">
    <text
      fill="black"
      x="3"
      y="2.3"
      font-family="Times New Roman"
      font-size="2.3"
      transform="translate(40)"
    >
      Time
    </text>
    <rect
      fill="white"
      x="3"
      y="3"
      height="44"
      :width="(94 / 11) * 10"
      opacity="0.2"
    ></rect>
    <rect
      fill="transparent"
      x="3"
      y="3"
      height="44"
      width="94"
      stroke="black"
      stroke-width="0.25"
    ></rect>
    <!-- <g v-for="line in this.playfairData" :key="line.Years">
      <path :d="getYearData(line.Years).toString()" stroke="red" />
    </g> -->
  </svg>
</template>
<script>
const width = 100;
const height = 50;

import * as d3 from "d3";

export default {
  data() {
    return {
      gridLineOptions: { count: 5 }
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
  computed: {},
  created: function() {
    this.grid();
  },
  mounted() {
    this.grid();
  },
  methods: {
    getYearData(year) {
      // console.log(this.playfairData);
      const p = d3.path();
      p.moveTo(1, 2);
      p.lineTo(year - 1699, 98);
      p.closePath();

      return p;
    },
    grid() {
      var x = d3.scaleTime().range([0, (94 / 11) * 10]);
      var y = d3.scaleLinear().range([height - 6, 0]);

      const maxOn = prop => Math.max(...this.playfairData.map(d => d[prop]));
      const minOn = prop => Math.min(...this.playfairData.map(d => d[prop]));
      const maxImport = maxOn("Imports");
      const maxExport = maxOn("Exports");
      const minImport = minOn("Imports");
      const minExport = minOn("Exports");
      const firstYr = minOn("Years");
      const lastYr = maxOn("Years");
      const maxY = Math.max(maxImport, maxExport + 1000000);
      var interval = 200000;

      //extent is the equivalent of calling min and max simultaneously
      x.domain(
        d3.extent(this.playfairData, function(d) {
          return d.Years;
        })
      );

      //pick y domain based on smallest and largest number of combined import and export numbers + yInterval for more space
      y.domain([0, maxY + interval]);

      var yValues = function() {
        var yNums = [];
        for (var i = interval; i <= maxY; i += interval) {
          yNums.push(i);
        }
        return yNums;
      };

      var tickFormatterY = function(tickVal) {
        if (tickVal / 1000000 === 1) {
          //if the value is 1, omit s
          return "1 Million";
        } else if ((tickVal / 1000000) % 1 === 0) {
          //if the value is not 1, add an s
          return tickVal / 1000000 + " Millions";
        } else if (tickVal === 200000) {
          //first number on y-axis...might need to change to adapt for other data
          return tickVal.toLocaleString(); //adds the comma back into the number, for some reason comes in with comma but returns without
        } else if (tickVal < 1000000) {
          //less than 1 million but not the first y-value
          return tickVal / 100000;
        } else {
          //return the decimal numbers
          return tickVal / 1000000;
        }
      };

      var xAxis = d3
        .axisBottom(x)
        .tickSizeInner(-44) //background grid, vertical lines
        .tickSizeOuter([0])
        .tickFormat(d3.format("d")); //removes comma from year

      var yAxis = d3
        .axisRight(y)
        .tickValues(yValues()) //override default values created by d3
        .tickSizeInner(-((94 / 11) * 10)) //background grid, horizontal lines
        .tickSizeOuter([0])
        .tickFormat(tickFormatterY); //calls custom format function

      //adjusts y-values to be in intervals of 200,000

      d3.select(this.$refs.pf_chart)
        .append("g")
        .attr("transform", "translate(3," + 47 + ")") //orients x-axis to bottom of chart (default is top)
        .attr("class", "y_axis")
        .attr("stroke-width", 0)
        .style("font-size", "3px")
        .style("font-family", "Chancery Cursive")
        .call(xAxis);

      const innerGridWidth = (94 / 11) * 10 + 3;
      d3.select(this.$refs.pf_chart)
        .append("g")
        .attr("transform", "translate(" + innerGridWidth + ",3)") //orients y-axis to right of chart (default is left)
        .attr("width", 94)
        .attr("height", 44)
        .attr("class", "x_axis")
        .attr("stroke-width", 0)
        .style("font-size", "1.5px")
        .call(yAxis);

      d3.select(this.$refs.pf_chart)
        .selectAll(".y_axis .tick text")
        .attr("y", 0)
        .attr("x", 0);

      d3.select(this.$refs.pf_chart)
        .selectAll(".x_axis .tick text")
        .attr("y", 0)
        .attr("x", 1);

      //styles the grid lines based on y-axis values - integer million lines are bolded
      d3.select(this.$refs.pf_chart)
        .selectAll("g.tick line")
        .attr("y", 1)
        .style("stroke-width", function(d) {
          if ((d / 1000000) % 1 === 0) {
            return 0.2;
          } else {
            return 0.1;
          }
        })
        .style("opacity", function(d) {
          if ((d / 1000000) % 1 === 0) return 0.4;
          else return 0.2;
        });
    }
  }
};
</script>
<style scoped></style>
