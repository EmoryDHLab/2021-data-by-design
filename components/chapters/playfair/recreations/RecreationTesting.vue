<template>
  <svg id="pf_chart" ref="pf_chart">
    <text
      v-if="scrollData.current > 3"
      fill="black"
      :x="width / 2"
      y="2.3"
      font-family="Times New Roman"
      font-size="2.3"
    >
      Time
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
    <g v-if="scrollData.current > 3">
      <text
        fill="black"
        :x="(width + 3) * 0.25"
        :y="(height + 3) * 0.87"
        font-size="3"
        font-family="Chancery Cursive"
        transform="rotate(-11)"
      >
        Line of Imports
      </text>
      <text
        fill="black"
        :x="0"
        :y="60"
        font-size="3"
        font-family="Chancery Cursive"
        transform="rotate(-65)"
      >
        Line of Exports
      </text>
    </g>
    <g v-if="scrollData.current > 3">
      <path :d="exportLined" stroke-width=".3px" stroke="#BB877F"></path>
      <path :d="exportLine1801d" stroke-width=".3px" stroke="red"></path>
      <path :d="importLined" stroke-width=".3px" stroke="#D6BF24"></path>
      <path :d="importLine1801d" stroke-width=".3px" stroke="blue"></path>
      <path :d="lineUndefined" stroke-width=".5px" stroke="purple"></path>
      <path :d="exportDraftd" stroke-width=".5px" stroke="lime"></path>
      <path :d="importDraftd" stroke-width=".5px" stroke="green"></path>
    </g>
    <g></g>
  </svg>
</template>
<script>
import * as d3 from "d3";

export default {
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
    this.maxExport = this.maxOn("Exports");
    this.minImport = this.minOn("Imports");
    this.minExport = this.minOn("Exports");
    this.firstYr = this.minOn("Years");
    this.lastYr = this.maxOn("Years");
    this.maxY = Math.max(this.maxImport, this.maxExport + 1000000);
    this.interval = 200000;

    // extent is the equivalent of calling min and max simultaneously
    this.x.domain(
      d3.extent(this.playfairData, function(d) {
        return d.Years;
      })
    );
    // pick y domain based on smallest and largest number of combined import and export numbers + yInterval for more space
    this.y.domain([0, this.maxY + this.interval]);

    this.xAxis = d3
      .axisBottom(this.x)
      .tickSizeInner(-44) //background grid, vertical lines
      .tickSizeOuter([0])
      .tickFormat(d3.format("d")); //removes comma from year

    this.yAxis = d3
      .axisRight(this.y)
      .tickValues(this.yValues(this.interval, this.maxY)) //override default values created by d3
      .tickSizeInner(-((94 / 11) * 10)) //background grid, horizontal lines
      .tickSizeOuter([0])
      .tickFormat(this.tickFormatterY()); //calls custom format function

    this.area = d3
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
  },
  computed: {
    current() {
      return this.scrollData.current;
    },
    x() {
      return d3.scaleTime().range([0, (this.width / 11) * 10]);
    },
    y() {
      return d3.scaleLinear().range([this.height, 0]);
    },
    exportLined() {
      const path = d3
        .area()
        .x(d => this.x(d.Years) + 3)
        .y(d => this.y(d.Exports) + 3)
        .curve(d3.curveCardinal)
        .defined(function(d) {
          return d.Exports;
        }); //limits this line to defined data
      return path(this.playfairData);
    },
    exportLine1801d() {
      const path = d3
        .area()
        .x(d => this.x(d.Years) + 3)
        .y(d => this.y(d.Exports1801) + 3)
        .curve(d3.curveCatmullRom)
        .defined(function(d) {
          return d.Exports1801;
        });
      return path(this.playfairData);
    },
    importLined() {
      const path = d3
        .area()
        .x(d => this.x(d.Years) + 3)
        .y(d => this.y(d.Imports) + 3)
        .curve(d3.curveCardinal)
        .defined(function(d) {
          return d.Imports;
        });
      return path(this.playfairData);
    },
    importLine1801d() {
      const path = d3
        .area()
        .x(d => this.x(d.Years) + 3)
        .y(d => this.y(d.Imports1801) + 3)
        .curve(d3.curveCatmullRom)
        .defined(function(d) {
          return d.Imports1801;
        });
      return path(this.playfairData);
    },
    importLine1801d() {
      const path = d3
        .area()
        .x(d => this.x(d.Years) + 3)
        .y(d => this.y(d.Imports1801) + 3)
        .curve(d3.curveCatmullRom)
        .defined(function(d) {
          return d.Imports1801;
        });
      return path(this.playfairData);
    },
    lineUndefined() {
      const path = d3
        .line()
        .x(d => this.x(d.Years))
        .y(d => this.y(d.Imports))
        .curve(d3.curveCardinal)
        .defined(function(d) {
          return d.critical;
        });
      return path(this.playfairData);
    },
    exportDraftd() {
      const path = d3
        .area()
        .x(d => this.x(d.Years) + 3)
        .y(d => this.y(d.ExportsDraft) + 3)
        .curve(d3.curveCatmullRom)
        .defined(function(d) {
          return d.ExportsDraft;
        });
      return path(this.playfairData);
    },
    importDraftd() {
      const path = d3
        .area()
        .x(d => this.x(d.Years) + 3)
        .y(d => this.y(d.ImportsDraft) + 3)
        .curve(d3.curveCatmullRom)
        .defined(function(d) {
          return d.ImportsDraft;
        });
      return path(this.playfairData);
    },
    lineUndefined2() {
      const path = d3
        .line()
        .x(d => this.x(d.Years) + 3)
        .y(d => this.y(d.Exports) + 3)
        .curve(d3.curveCardinal)
        .defined(d => d.critical);
      return path(this.playfairData);
    },
    areaUndefined() {
      const path = d3
        .area()
        .x(d => this.x(d.Years) + 3)
        .y(d => this.y(d.Imports) + 3)
        .curve(d3.curveCardinal)
        .defined(d => d.critical);
      return path(this.playfairData);
    },
    ticks() {
      const ticks = d3
        .area()
        .x(d => this.x(d.Years) + 3)
        .y(d => this.y(d.Imports1801) + 3)
        .curve(d3.curveCatmullRom)
        .defined(function(d) {
          return d.Imports1801;
        });
      return ticks(this.playfairData);
    }
  },
  methods: {
    yValues(interval, maxY) {
      var yNums = [];
      for (var i = interval; i <= maxY; i += interval) {
        yNums.push(i);
      }
      return yNums;
    },
    tickFormatterY(tickVal) {
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
    },
    grid() {
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
    }
  }
};
</script>
<style scoped></style>
