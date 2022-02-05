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
  </svg>
</template>
<script>

const width = 94;
const height = 44;
import * as d3 from "d3";

export default {
  data() {
    return {
      maxSlideNumber: 8,
      svg: null,
      importLined: null,
      exportLined: null,
      exportText: null,
      importText: null,
      yLabel: null,
      xLabel: null,
      moneyLabel: null,
      timeLabel: null,
      importLine: null,
      exportLine: null,
      importLine1801d: null,
      exportLine1801d: null,
      importLineFirstDraft: null,
      exportLineFirstDraft: null,
      areaGreen: null,
      areaPink: null,
      importDots: null,
      exportDots: null,
      title1: null,
      title2: null,
      title3: null,
      title4: null,
      title5: null
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
  mounted() {
    this.grid();
  },
  watch: {
    data(newValue) {
      this.grid();
    }
  },
  methods: {
    grid() {
      //the inner rectangle height and width
      var x = d3.scaleTime().range([0, (width / 11) * 10]);
      var y = d3.scaleLinear().range([height, 0]);

      //margins
      let margin = { top: 3, right: 3, bottom: 3, left: 3 };

      const innerGridWidth = (width / 11) * 10 + margin.top;

      let playfairChart = this.$refs.pf_chart;


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

      //adjusts y-values to be in intervals of 200,000
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

      d3.select(playfairChart)
        .append("g")
        .attr("transform", "translate(" + margin.top + "," + 47 + ")") //orients x-axis to bottom of chart (default is top)
        .attr("class", "y_axis")
        .attr("stroke-width", 0)
        .style("font-size", "3px")
        .style("font-family", "Chancery Cursive")
        .call(xAxis);

      d3.select(playfairChart)
        .append("g")
        .attr(
          "transform",
          "translate(" + innerGridWidth + "," + margin.right + ")"
        ) //orients y-axis to right of chart (default is left)
        .attr("width", 94)
        .attr("height", 44)
        .attr("class", "x_axis")
        .attr("stroke-width", 0)
        .style("font-size", "1.5px")
        .call(yAxis);

      d3.select(playfairChart)
        .selectAll(".y_axis .tick text")
        .attr("y", 0)
        .attr("x", 0);

      d3.select(playfairChart)
        .selectAll(".x_axis .tick text")
        .attr("y", 0)
        .attr("x", 1);

      d3.select(playfairChart)
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

      /****LINE AND AREA FOR DEFINED DATA****/

      this.exportLined = d3
        .area()
        .curve(d3.curveCardinal) //makes the line curvy
        .defined(function(d) {
          return d.Exports;
        }) //limits this line to defined data
        .x(d => x(d.Years) + 3)
        .y(d => y(d.Exports) + 3);

      this.exportLine1801d = d3
        .area()
        .curve(d3.curveCatmullRom) //makes the line curvy
        .defined(function(d) {
          return d.Exports1801;
        }) //limits this line to defined data
        .x(d => x(d.Years))
        .y(d => y(d.Exports1801));

      var exportDraftd = d3
        .area()
        .curve(d3.curveCatmullRom) //makes the line curvy
        .defined(function(d) {
          return d.ExportsDraft;
        }) //limits this line to defined data
        .x(d => x(d.Years))
        .y(d => y(d.ExportsDraft));

      this.importLined = d3
        .area()
        .curve(d3.curveCardinal) //makes the line curvy
        .defined(function(d) {
          return d.Imports;
        }) //limits this line to defined data
        .x(d => x(d.Years) + 3)
        .y(d => y(d.Imports) + 3);

      this.importLine1801d = d3
        .area()
        .curve(d3.curveCatmullRom) //makes the line curvy
        .defined(function(d) {
          return d.Imports1801;
        }) //limits this line to defined data
        .x(d => x(d.Years))
        .y(d => y(d.Imports1801));

      var importDraftd = d3
        .area()
        .curve(d3.curveCatmullRom) //makes the line curvy
        .defined(function(d) {
          return d.ImportsDraft;
        }) //limits this line to defined data
        .x(d => x(d.Years))
        .y(d => y(d.ImportsDraft));

      var area = d3
        .area()
        .curve(d3.curveCardinal) //makes the line curvy
        .defined(function(d) {
          return d.Imports;
        }) //limits this area to defined area
        .x(function(d) {
          return x(d.Years);
        })
        .y1(function(d) {
          return y(d.Imports);
        }); //y1 makes the Imports line the baseline

      /****END LINE AND AREA FOR DEFINED DATA****/

      /****LINE AND AREA FOR UNDEFINED DATA****/

      //imports line - dashed yellow
      var lineUndefined = d3
        .line()
        .curve(d3.curveCardinal) //makes the line curvy
        .defined(function(d) {
          console.log(d.critical);
          return d.critical;
        }) //returns the data to make the undefined, dashed line
        .x(d => x(d.Years))
        .y(d => y(d.Imports));

      //exports line - dashed pink
      var lineUndefined2 = d3
        .line()
        .curve(d3.curveCardinal) //makes the line curvy
        .defined(d => d.critical)
        .x(d => x(d.Years))
        .y(d => y(d.Exports));

      var areaUndefined = d3
        .area()
        .curve(d3.curveCardinal) //makes the line curvy
        .defined(d => d.critical) //returns the critical data to limit to undefined area
        .x(d => x(d.Years)) //years are only the critical years
        .y1(d => y(d.Imports)); //y1 makes the Imports line the baseline, these imports are only the critical point imports

      /****END LINE AND AREA FOR UNDEFINED DATA****/

      /*************************append all of the graphics to the canvas**************************************/

      //connect data to the chart
      d3.select(playfairChart).datum(this.playfairData);

      //clip path area above imports line
      d3.select(playfairChart)
        .append("clipPath")
        .attr("id", "clip-above")
        .append("path")
        .attr("d", area.y0(0));

      // area below the imports line
      d3.select(playfairChart)
        .append("clipPath")
        .attr("id", "clip-below")
        .append("path")
        .attr("d", area.y0(height));

      //line exports
      this.exportLine = d3
        .select(playfairChart)
        .append("path")
        .attr("class", "line exports")
        .attr("d", this.exportLined)
        .attr("opacity", 1)
        .style("stroke", "#BB877F")
        .style("stroke-width", "0.5px");

      //line imports
      this.importLine = d3
        .select(playfairChart)
        .append("path")
        .attr("class", "line")
        .attr("d", this.importLined)
        .attr("opacity", 1)
        .style("stroke", "#D6BF24")
        .style("stroke-width", "0.5px");

      this.importLine1801 = d3
        .select(playfairChart)
        .append("path")
        .attr("opacity", 1)
        .attr("fill", "none")
        .attr("d", self.importLine1801d)
        .style("stroke", "#D6BF24")
        .style("stroke-width", "3px");

      this.exportLine1801 = d3
        .select(playfairChart)
        .append("path")
        .attr("opacity", 1)
        .attr("fill", "none")
        .attr("d", self.exportLine1801d)
        .style("stroke", "#BB877F")
        .style("stroke-width", "3px");

      this.exportText = d3
        .select(playfairChart)
        .append("text")
        .attr(
          "transform",
          "translate(" +
            innerGridWidth * 0.6 +
            "," +
            height * 0.6 +
            ") rotate(" +
            -65 +
            ")"
        )
        .style("font-size", "3px")
        .style("font-family", "Chancery Cursive")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .attr("opacity", 1)
        .style("fill", "black")
        .text("Line of Exports");
      this.importText = d3
        .select(playfairChart)
        .append("text")
        .attr(
          "transform",
          "translate(" +
            (width + margin.left) * 0.25 +
            "," +
            (height + margin.top) * 0.87 +
            ") rotate(" +
            -11 +
            ")"
        )
        .style("font-size", "3px")
        .style("font-family", "Chancery Cursive")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .attr("opacity", 1)
        .style("fill", "black")
        .text("Line of Imports");
    }
  }
};
</script>
<style scoped></style>
