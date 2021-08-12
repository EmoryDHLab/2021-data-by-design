<template>
  <div class="w-full overflow-hidden border-2">
    <img :src="require(`~/assets/${asset}`)" @load="imgLoaded" :style="imgStyles" ref="img" alt="" @click="test">
  </div>
</template>

<script>
import * as d3 from "d3";

import gsap from "gsap";

const transform = ({x, y, scale}) => `translate3d(${x}, ${y}, 0px) scale(${scale})`;

const validPoint = obj => {
    if (typeof obj != "object") return false;
    const passedCoords = "x" in obj && "y" in obj;
    if (!passedCoords) return false;
    if (obj.scale) {
      if (typeof obj.scale != "number") {
        return false;
      }
    }
    return true;
  }

export default {
  props: {
    //Relative to assets folder; e.g., images/railroadscaled.jpg
    asset: {
      type: String,
      required: true,
    },
    restingPoint: {
      type: Object,
      validator: validPoint
    },
    points: {
      type: Array, //[{x, y, scale}] coordinates to center around, optional scale parameter
      validator(value) {
        return Array.isArray(value) && value.every(validPoint)
      }
      // required: true,
    },
    //seconds
    animationDuration: {
      type: Number,
      default: 1
    },
    currentPoint: {
      type: Number,
      default: -1
      // required: true
    },
    controlledAnimation: {
      type: Boolean,
      default: false,
    },
    elapsePercent: { // applies only if controlledAnimation is true
      type: Number,
      validator(value) {
        return value >= 0 && value <= 1;
      }
    },
    width: {
      type: String,
    },
  },
  data() {
    return {
      prevView: null,
      loaded: false,
      currentAnimation: null
    }
  },
  methods: {
    imgLoaded() {
      this.loaded = true;
    },
    test() {
      const {x, y, scale} = this.transformPoints[0];
    },
    transformPoint(point) {
      if (!this.loaded) return;
      const natural = {
        x: this.$refs.img.naturalWidth,
        y: this.$refs.img.naturalHeight
      }
      const [x, y] = ["x", "y"].map(dim => {
        const coord = point[dim];
        const units = typeof coord == 'string' ? coord : 100 * (coord / natural[dim]) + '%';
        return `calc(-1 * ${units} + 50%)`
      })
      return {
        x, y,
        scale: point.scale || 1
      }
    }
  },
  watch: {
    currentPoint(newVal) {
      if (!this.loaded) return;
      if (newVal >= 0) {
        const currPoint = this.transformPoints[newVal];
        if (!currPoint) return;
        this.currentAnimation = gsap.to(this.$refs.img, {
          transform: transform(currPoint),
          ease: "power2.inOut",
          duration: this.animationDuration,
          paused: this.controlledAnimation,
        })
      } else if (this.currentAnimation) {
        this.currentAnimation = gsap.to(this.$refs.img, {
          transform: this.restingTransformPoint ? transform(this.restingTransformPoint) : "",
          ease: "power2.inOut",
          duration: this.animationDuration,
          paused: this.controlledAnimation
        })
      }
    },
    elapsePercent(newVal) {
      if (!this.controlledAnimation || !this.currentAnimation) return;
      this.currentAnimation.progress(newVal);
    },
  },
  computed: {
    restingTransformPoint() {
      if (this.restingPoint) {
        return this.transformPoint(this.restingPoint);
      }
    },
    transformPoints() {
      if (this.points.length) {
        return this.points.map(point => this.transformPoint(point))
      }
    },
    imgStyles() {
      if (this.restingTransformPoint) {
        return {
          transform: transform(this.restingTransformPoint)
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
