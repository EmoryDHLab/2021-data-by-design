<template>
  <div class="nav-bar" ref="bar"
       :style="barStyle"
       @mouseout="hovering=false" @mouseover="hovering=true">
    This is gonna be the chapter navbar
  </div>
</template>

<script>
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger";
if (process.client)
  gsap.registerPlugin(ScrollTrigger);

export default {
  data: () => ({
    hovering: false,
    fixed: false
  }),
  computed: {
    barStyle () {
      const show = !this.fixed || this.hovering;
      return {
        opacity: show ? "100%" : "0%"
      }
    },
  },
  mounted () {
      ScrollTrigger.create({
        trigger: this.$refs.bar,
        start: "bottom top",
        onEnter: () => this.fixed = true,
        onEnterBack: () => this.fixed = false
      })
  },

}
</script>

<style scoped>
.nav-bar {
  margin: 0 auto;
  position: sticky;
  top: 0px;
  width: 1400px;
  background-color: lavenderblush;
  grid-column: 2 / -2;
  text-align: center;
  font-family: "VTC William";
  font-size: 30px;
}
</style>
