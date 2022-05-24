<template>
  <div class="col-span-6 2xl:col-span-8 col-start-3 2xl:col-start-4 mt-6 flex">
    <div id="vue-canvas"></div>
    <svg
      class="w-full"
      viewBox="0 0 99 99"
      @mousemove="over($event)"
      v-if="bounds.minX"
    >
      <rect :height="100" :width="100" fill="#FFFFFF"></rect>
      <circle
        v-for="(node, i) in graph.nodes"
        :key="i"
        :cx="coords[i].x"
        :cy="coords[i].y"
        r="2"
        stroke-width="0.2"
        stroke="black"
        fill="red"
        @mousedown="
          currentMove = { x: $event.screenX, y: $event.screenY, node: node }
        "
      ></circle>
    </svg>
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  components: {},
  data() {
    return {
      padding: 20,
      width: 100,
      height: 100,
      graph: {
        nodes: d3.range(100).map(i => ({ index: i, x: null, y: null }))
      }
    };
  },
  created() {
    this.simulation = d3
      .forceSimulation(this.graph.nodes)
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .force("charge", d3.forceManyBody())
      .force(
        "collide",
        d3
          .forceCollide()
          .radius(d => d.r + 1)
          .iterations(3)
      )
      .force("center", d3.forceCenter(this.width / 2, this.height / 2));
  },
  computed: {
    bounds() {
      return {
        minX: Math.min(...this.graph.nodes.map(n => n.x)),
        maxX: Math.max(...this.graph.nodes.map(n => n.x)),
        minY: Math.min(...this.graph.nodes.map(n => n.y)),
        maxY: Math.max(...this.graph.nodes.map(n => n.y))
      };
    },
    coords() {
      return this.graph.nodes.map(node => {
        return {
          x:
            this.padding +
            ((node.x - this.bounds.minX) * (this.width - 2 * this.padding)) /
              (this.bounds.maxX - this.bounds.minX),
          y:
            this.padding +
            ((node.y - this.bounds.minY) * (this.height - 2 * this.padding)) /
              (this.bounds.maxY - this.bounds.minY)
        };
      });
    }
  },
  methods: {
    randomNumber() {
      return Math.random() * 100; //multiply to generate random number between 0, 100
    },
    over(e) {
      const [x, y] = d3.pointer(e);
      console.log(this.graph.nodes[0]);
      // this.graph.nodes[0].fx = x - this.width / 2;
      // this.graph.nodes[0].fy = y - this.height / 2;
    }
  }
};
</script>
