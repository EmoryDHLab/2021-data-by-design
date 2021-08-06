<template>
  <div class="col-span-full" :style="totalHeightStyle" ref="root">

    <!--We want this background to match the height of all the scrolly groups.
    But we can't actually make it the background of that container
    (or have it be part of the child containers - I've tried a lot of stuff) because it needs to be full
    width, which these non-absolute containers can't be thanks to our grid layout.
    -->
    <div ref="background" class="bg-theme absolute z-0 left-0 w-screen" :style="totalHeightStyle">
    </div>

    <div class="relative">
      <div ref="screenAbove" class="bg-gray-200 absolute left-0 -top-screen w-screen h-0"
      :class="{'scroll-snap-child': doSnap}">
      </div>
      <div ref="screenBelow" class="bg-gray-200 absolute left-0 w-screen h-0"
           :class="{'scroll-snap-child': doSnap}"
           :style="{top: totalHeightUnits}">
      </div>
    </div>


    <template v-if="!$isMobile">
      <div class="float-right mr-4 lg:mr-12 h-screen flex items-center sticky top-0 z-10" ref="sticky">
        <slot name="sticky"></slot>
      </div>

      <div class="w-full ml-3 lg:ml-12 mb-96 z-10 relative" ref="scrolly">
        <div class="w-1/2 h-screen" ref="buffer"></div>
        <div v-for="(i, zeroIndexed) in groups" class="w-1/2 text-theme flex items-center"
             :class="{'h-screen': !collect, 'scroll-snap-child': doSnap}"
             :style="collectStyle(zeroIndexed)"
             ref="groups">
          <div>
            <slot :name="'group:' + i"></slot>
          </div>
        </div>
        <div class="w-1/2 h-36" ref="endBuffer"></div>
      </div>
    </template>

    <div v-else ref="mobile" class="flex relative flex-col w-full items-center" :class="{'scroll-snap-child': doSnap}">
      <div>
        <slot name="sticky"></slot>
      </div>
      <div class="flex-grow relative z-10 w-full flex flex-row justify-between items-center">
        <div v-show="scrollData.current > 0" class="font-icons cursor-pointer text-xl" @click="mobilePrevClick">
          u
        </div>
        <div>
          <slot :name="`group:${scrollData.current + 1}`"></slot>
        </div>
        <div v-show="scrollData.current < groups - 1" class="font-icons cursor-pointer text-xl"
             @click="mobileNextClick">
          s
        </div>
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
  head() {
    return {
      htmlAttrs: {
        style: "scroll-snap-type:y mandatory"
      }
    }
  },
  components: {GridLayout},
  props: {
    groups: Number,
    collect: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return {
      scrollData: this.scrollData
    }
  },
  data: () => ({
    totalHeight: -1,
    cumulativeHeights: [],
    scrollytellActive: false,
    leaveOffset: 0,
    backgroundVisible: false,
    direction: undefined,
    doSnap: false,
    scrollData: {
      direction: undefined,
      progress: -1,
      leaveProgress: 0,
      current: undefined
    }
  }),
  computed: {
    totalHeightUnits() {
      if (this.$isMobile) {
        return '100vh';
      }
      if (this.totalHeight > 0) {
        return this.totalHeight + "px"
      }
    },
    totalHeightStyle() {
      return {
        height: this.totalHeightUnits
      }
    },
    // localVars() {
    //   const gap = "600px";
    //   return {
    //     "--numGroups": this.groups,
    //     "--gap": gap
    //   }
    // }
  },
  methods: {
    collectStyle(i) {
      if (!this.collect) {
        return {}
      }
      return {
        position: "sticky",
        top: `${this.cumulativeHeights[i] + this.leaveOffset}px`,
        marginBottom: `100rem`,
      }
    },
    mobileNextClick() {
      this.scrollData.current++;
    },
    mobilePrevClick() {
      this.scrollData.current--;
    },
    transitionStyle(i) {

    }
  },
  mounted() {
    ScrollTrigger.create({
      trigger: this.$refs.background,
      // endTrigger: this.$refs.screenBelow,
      start: "top bottom",
      end: "bottom -65px",
      onToggle: ({isActive}) => {
        this.doSnap = isActive;
        console.log("bg visible", isActive)
      },
      onUpdate: ({direction}) => {
        this.direction = direction;
        console.log(direction);
      }
    })
    if (this.$isMobile) {
      this.scrollData.current = 0;
      return;
    }
    this.totalHeight = this.$refs.scrolly.clientHeight;
    setTimeout(() => {

      console.log(this.$refs);
      ScrollTrigger.create({
        anticipatePin: 1,
        trigger: this.$refs.sticky,
        endTrigger: this.$refs.endBuffer,
        start: "top bottom",
        onToggle: ({progress, direction, isActive}) => {
          this.scrollytellActive = isActive;
          if (isActive) {
            this.scrollData.current = 0;
          }
          // console.log(progress, direction, isActive),
        },
        // pin: this.$refs.sticky,
        end: "top 100px",
      })

      const groups = [this.$refs.buffer, ...this.$refs.groups];

      if (this.collect) {
        // let totalHeight = 0;
        // this.$refs.groups.forEach( (el, i) => {
        //   ScrollTrigger.create({
        //     trigger: el,
        //     start: `top ${totalHeight}`,
        //     anticipatePin: 1,
        //     pin: el,
        //     pinSpacing: false,
        //     onEnter: (instance) => this.scrollData.current = i + 1,
        //     onLeaveBack: (instance) => this.scrollData.current = i,
        //     endTrigger: lastGroup,
        //     end: "top 100px"
        //   })
        //   console.log(el.clientHeight, el.scrollHeight, el.offsetHeight)
        //   totalHeight += el.scrollHeight;
        // })
        let cumulative = 100;
        const cumulativeHeights = [];
        cumulativeHeights.push(cumulative);
        this.$refs.groups.forEach((el, i) => {
          cumulative += el.scrollHeight;
          cumulativeHeights.push(cumulative);
          ScrollTrigger.create({
            trigger: el,
            start: "bottom bottom",
            end: `top ${cumulative}px`,
            onUpdate: ({progress}) => this.scrollData.progress = progress,
            onEnter: (instance) => this.scrollData.current = i,
            onLeaveBack: (instance) => this.scrollData.current = i - 1,
          })
        })
        ScrollTrigger.create({
          trigger: this.$refs.groups[this.groups - 1],
          start: `bottom ${cumulative}px`,
          end: "bottom top",
          onUpdate: ({progress, direction, start, end}) => {
            this.scrollData.leaveProgress = progress;
            this.leaveOffset = (start - end) * progress;
          }
        });
        // gsap.to(this.$refs.groups.slice(0, -1), {
        //   top: "-=200",
        //   scrollTrigger: {
        //     trigger: this.$refs.groups[this.groups - 1],
        //     start: `top ${cumulative}px`,
        //     end: "bottom top",
        //     scrub: true
        //   },
        // });
        this.cumulativeHeights = cumulativeHeights;
      } else {
        groups.forEach((el, i) => {
          ScrollTrigger.create({
            trigger: el,
            start: "bottom bottom",
            end: "bottom top",
            onUpdate: ({progress, direction}) => {
              this.scrollData.progress = progress;
              this.scrollData.direction = direction;
            },
            onEnter: (instance) => this.scrollData.current = i,
            onLeaveBack: (instance) => this.scrollData.current = i - 1,
          })
        })
      }
    }, 2100)
  }
}
</script>
<style scoped>
.scroll-snap-child {
  scroll-snap-align: start;
}
</style>
