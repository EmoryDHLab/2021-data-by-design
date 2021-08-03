<template>
  <div class="col-span-full" :style="totalHeightStyle" ref="root">


    <!--We want this background to match the height of all the scrolly groups.
    But we can't actually make it the background of that container
    (or have it be part of the child containers - I've tried a lot of stuff) because it needs to be full
    width, which these non-absolute containers can't be thanks to our grid layout.
    -->
    <div ref="background" class="bg-theme absolute z-0 left-0 w-screen" :style="totalHeightStyle">

    </div>

    <div class="float-right mr-4 pt-8 sticky top-0 z-10" ref="sticky">
      <slot name="sticky"></slot>
    </div>

    <div class="w-full ml-3 mb-96 z-10 relative" ref="scrolly">
      <div class="w-1/2 h-screen"  ref="buffer"></div>
      <div v-for="(i, zeroIndexed) in groups" class="w-1/2 h-screen text-theme"
           :class="{'sticky bottom-0': collect && zeroIndexed == 0}"
           ref="groups">
        <slot :name="'group:' + i"></slot>
      </div>
    </div>


  </div>
</template>

<script>
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger";
import GridLayout from "@/components/page-layout/GridLayout.vue";
import Vue from "vue";

if (process.client)
  gsap.registerPlugin(ScrollTrigger);

export const docsDefinition = {
  matchName: ["Scrollytell", "ScrollyTell"],
  componentName: "Scrollytell",
  props: {
    groups: {
      type: "number"
    }
  },
  slots: ["sticky", /^group:(\d+)/]
}

export default {
  components: {GridLayout},
  props: {
    groups: Number,
    collect: {
      type: Boolean,
      default: false
    }
  },
  provide () {
    return {
      scrollData: this.scrollData
    }
  },
  data: () => ({
    totalHeight: -1,
    scrollytellActive: false,
    scrollData: {
      progress: -1,
      current: undefined
    }
  }),
  computed: {
    totalHeightStyle () {
      if (this.totalHeight > 0) {
        return {
          height: this.totalHeight + "px"
        }
      }
    }
    // localVars() {
    //   const gap = "600px";
    //   return {
    //     "--numGroups": this.groups,
    //     "--gap": gap
    //   }
    // }
  },
  mounted() {
    this.totalHeight = this.$refs.scrolly.clientHeight;
    setTimeout(() => {

      // ScrollTrigger.create({
      //   trigger: this.$refs.grid.$el,
      //   start: "bottom bottom",
      //   onToggle: ({progress, direction, isActive}) => console.log(progress, direction, isActive),
      // })


      const lastGroup = this.$refs.groups[this.groups - 1];
      console.log(this.$refs);
      ScrollTrigger.create({
        anticipatePin: 1,
        trigger: this.$refs.sticky,
        endTrigger: lastGroup,
        start: "top top",
        onToggle: ({progress, direction, isActive}) => {
          this.scrollytellActive = isActive;
          // console.log(progress, direction, isActive),
        },
        // pin: this.$refs.sticky,
        end: "top 100px",
      })

      const groups = [this.$refs.buffer, ...this.$refs.groups];

      groups.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "bottom bottom",
          end: "bottom top",
          onUpdate: ({progress}) => this.scrollData.progress = progress,
          onEnter: (instance) => this.scrollData.current = i,
          onLeaveBack: (instance) => this.scrollData.current = i - 1,
        })
      })
    }, 2100)
  }
}
</script>

