<template>
  <div class="nav-bar transition" ref="bar"
       :style="barStyle"
       @mouseout="hovering=false" @mouseover="hovering=true">
    <div v-if="$isMobile" class="flex flex-row justify-between px-2">
      <a href="javascript:;" class="hover:underline" @click="prevClick"> << </a>
<!--      <div> {{ currentSection }}</div>-->
      <a href="javascript:;" class="hover:underline" @click="nextClick"> >> </a>
    </div>
    <div v-else>
      breakpoint {{$breakpoint}}
    </div>
  </div>
</template>

<script>
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {mapMutations, mapState} from "vuex";

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
    ...mapState("currentChapter", ["currentSection"])
  },
  mounted () {
      ScrollTrigger.create({
        trigger: this.$refs.bar,
        start: "bottom top",
        onEnter: () => this.fixed = true,
        onEnterBack: () => this.fixed = false
      })
  },
  methods: {
    ...mapMutations("currentChapter", ["nextSection", "prevSection"]),
    prevClick() {
      this.prevSection();
    },
    nextClick() {
      this.nextSection();
    }
  },

}
</script>

<style scoped>
.nav-bar {
  margin: 0 auto;
  position: sticky;
  top: 0px;
  max-width: 1400px;
  background-color: lavenderblush;
  text-align: center;
  font-family: "VTC William";
  font-size: 30px;
  z-index: 100;
  border: 1px solid lightgray;
}

.transition {
  transition: opacity 0.5s;
}

</style>
