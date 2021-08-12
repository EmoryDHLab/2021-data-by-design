<template>
  <div class="w-full overflow-hidden border-2">
    <img :src="require(`~/assets/${asset}`)" @load="imgLoaded" :style="imgStyles" ref="img" alt="" @click="test">
  </div>
</template>

<script>
  import * as d3 from "d3";

  import gsap from "gsap";

  const transform = ({x, y, scale}) => `translate3d(${x}, ${y}, 0px) scale(${scale})`;

  //No need to be reactive
  let currentAnimation = null;

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
      //seconds
      animationDuration: {
        type: Number,
        default: 1
      },
      currentPosition: {
        type: Number,
        default: -1
        // required: true
      },
      elapsePercent: { //Number between zero and 1. Overrides default animation behavior!!
        type: Number,
      },
      width: {
        type: String,
      },
    },
    data () {
      return {
        prevView: null,
        loaded: false
      }
    },
    methods: {
      imgLoaded () {
        this.loaded = true;
      },
      test() {
        const {x, y, scale} = this.transformPoints[0];
      }
    },
    watch: {
      currentPosition(newVal) {
        if (!this.loaded) return;
        if (newVal >= 0) {
          const currPoint = this.transformPoints[newVal];
          if (!currPoint) return;
          currentAnimation = gsap.to(this.$refs.img, {
            transform: transform(currPoint),
            ease: "power2.inOut",
            duration: this.animationDuration
          })
        } else if (currentAnimation) {
          currentAnimation = gsap.to(this.$refs.img, {
            transform: "",
            ease: "power2.inOut",
            duration: this.animationDuration
          })
        }
      }
    },
    computed: {
      // currentPoint() {
      //   return this.points[this.currentPosition];
      // },
      transformPoints() {
        if (this.loaded && this.points.length) {
          const natural = {
            x: this.$refs.img.naturalWidth,
            y: this.$refs.img.naturalHeight
          }
          return this.points.map( point => {
            const [x, y] = ["x", "y"].map(dim => {
              const coord = point[dim];
              const units = typeof coord == 'string' ? coord : 100 * (coord / natural[dim]) + '%';
              return `calc(-1 * ${units} + 50%)`
            })
            return {
              x, y,
              scale: point.scale || 1
            }
          })
        }
      },
      imgStyles () {
        // const curr = this.transformPoints?.[this.currentPosition];

      }
    }
  }
</script>

<style scoped>
  #image img {
    visibility: hidden;
  }
</style>
