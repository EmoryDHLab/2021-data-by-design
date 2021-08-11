<template>
  <!--Set the width and height of the viewport by adding CSS to this component's container - it will fill it!-->
  <div class="w-full h-full overflow-hidden border-2">
    <img :src="require(`~/assets/${asset}`)" @load="imgLoaded" :style="imgStyles" ref="img" alt="">
  </div>
</template>

<script>
  import * as d3 from "d3";

  export default {
    props: {
      //Relative to assets folder; e.g., images/railroadscaled.jpg
      asset: {
        type: String,
        required: true,
      },
      points: {
        type: Array, //[{x, y, scale}] coordinates to center around, optional scale parameter
        // required: true,
      },
      animationTime: {
        type: Number,
        default: 1000
      },
      currentPosition: {
        type: Number,
        default: 0
        // required: true
      },
      elapsePercent: { //Number between zero and 1. Overrides default animation behavior!!
        type: Number,
      },
      easing: {
        type: Function,
        default: d3.easePolyInOut
      },
      width: {
        type: String,
      },
    },
    data () {
      return {
        elapsed: 0,
        prevView: null,
        loaded: false
      }
    },
    methods: {
      imgLoaded () {
        console.log("img loaded");
        this.loaded = true;
      }
    },
    computed: {
      currentPoint() {
        return this.points[this.currentPosition];
      },
      imgStyles () {
        if (this.loaded && this.currentPoint) {
          const natural = {
            x: this.$refs.img.naturalWidth,
            y: this.$refs.img.naturalHeight
          }
          const [xShift, yShift] = ["x", "y"].map(dim => {
            const coord = this.currentPoint[dim];
            const units = typeof coord == 'string' ? coord : 100 * (coord / natural[dim]) + '%';
            return `calc(-1 * ${units} / 2)`
          })
          return {
            transform: `translate3d(${xShift}, ${yShift}, 0px) scale3d(${this.currentPoint.scale}, ${this.currentPoint.scale}, ${this.currentPoint.scale})`,
          }
        }
      }
    }
  }
</script>

<style scoped>
  #image img {
    visibility: hidden;
  }
</style>
