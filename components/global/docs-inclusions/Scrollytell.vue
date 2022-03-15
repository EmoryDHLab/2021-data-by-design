<template>
  <div class="col-span-full" :style="totalHeightStyle" ref="root">
    <!--We want this background to match the height of all the scrolly groups.
    But we can't actually make it the background of that container
    (or have it be part of the child containers - I've tried a lot of stuff) because it needs to be full
    width, which these non-absolute containers can't be thanks to our grid layout.
    -->
    <div
      ref="background"
      class="bg-theme absolute z-0 left-0 w-screen"
      :style="totalHeightStyle"
    ></div>

    <div class="relative">
      <div
        ref="above"
        class="opacity-0 pointer-events-none absolute left-0 -top-screen w-screen h-screen"
        :class="{ 'scroll-snap-child': snapRange }"
      ></div>
      <div
        ref="below"
        class="opacity-0 pointer-events-none absolute left-0 w-screen h-screen"
        :class="{ 'scroll-snap-child': snapRange }"
        :style="{ top: totalHeightUnits }"
      ></div>
    </div>

    <div v-if="!$isMobile" class="flex flex-row mx-3 lg:mx-12">
      <div class="flex-1 z-10 relative" ref="scrolly">
        <div class="h-screen" ref="buffer"></div>
        <div
          v-for="(i, zeroIndexed) in groups"
          class="flex items-center"
          :class="{ 'h-screen': !collect, 'scroll-snap-child': snapRange }"
          :style="collectStyle(zeroIndexed)"
          ref="groups"
        >
          <div>
            <slot :name="'group:' + i"></slot>
          </div>
        </div>
        <div class="h-screen" ref="endBuffer"></div>
      </div>

      <div class="flex-1 h-screen sticky top-0 z-10" ref="sticky">
        <slot name="sticky"></slot>
      </div>
    </div>

    <div
      v-else
      ref="mobile"
      class="flex relative flex-col w-full items-center"
      :class="{ 'scroll-snap-child': snapRange }"
    >
      <div>
        <slot name="sticky"></slot>
      </div>
      <div
        class="flex-grow relative z-10 w-full flex flex-row justify-between items-center"
      >
        <div
          v-show="scrollData.current > 0"
          class="font-icons cursor-pointer text-xl"
          @click="mobilePrevClick"
        >
          u
        </div>
        <div>
          <slot :name="`group:${scrollData.current + 1}`"></slot>
        </div>
        <div
          v-show="scrollData.current < groups - 1"
          class="font-icons cursor-pointer text-xl"
          @click="mobileNextClick"
        >
          s
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GridLayout from "@/components/page/chapter/layout/GridLayout.vue";
import Vue from "vue";

if (process.client) gsap.registerPlugin(ScrollTrigger);

export const docsDefinition = {
  matchName: ["Scrollytell", "ScrollyTell"],
  componentName: "Scrollytell",
  props: {
    groups: {
      type: "number"
    }
  },
  slots: ["sticky", /^group:(\d+)/]
};

export default {
  head() {
    return {
      htmlAttrs: {
        // style: "scroll-snap-type:y mandatory"
      }
    };
  },
  components: { GridLayout },
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
    };
  },
  data: () => ({
    totalHeight: -1,
    cumulativeHeights: [],
    scrollytellActive: false,
    leaveOffset: 0,
    direction: undefined,
    sections: {
      above: {
        enter: false,
        leave: false
      },
      below: {
        enter: false,
        leave: false
      }
    },
    scrollData: {
      direction: undefined,
      progress: -1,
      leaveProgress: 0,
      current: undefined
    }
  }),
  computed: {
    snapRange() {
      return this.scrollytellActive;
      // if (this.sections.above.enter && !this.sections.above.leave) {
      //   if (this.scrollytellActive) {
      //     return true;
      //   }
      //   return this.direction > 0;
      // }
      // return this.sections.above.enter && !this.sections.below.leave
    },
    totalHeightUnits() {
      if (this.$isMobile) {
        return "100vh";
      }
      if (this.totalHeight > 0) {
        return this.totalHeight + "px";
      }
    },
    totalHeightStyle() {
      return {
        height: this.totalHeightUnits
      };
    }
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
        return {};
      }
      return {
        position: "sticky",
        top: `${this.cumulativeHeights[i] + this.leaveOffset}px`,
        marginBottom: `100rem`
      };
    },
    mobileNextClick() {
      this.scrollData.current++;
    },
    mobilePrevClick() {
      this.scrollData.current--;
    },
    transitionStyle(i) {}
  },
  mounted() {
    ScrollTrigger.create({
      trigger: this.$refs.background,
      // endTrigger: this.$refs.screenBelow,
      start: "+20px bottom",
      end: "bottom top",
      onToggle: instance => {
        const { isActive } = instance;
        this.scrollytellActive = isActive;
        if (isActive) {
          this.scrollData.current = 0;
        }
      },
      onUpdate: ({ direction }) => {
        this.direction = direction;
      }
    });

    ["above", "below"].map(side => {
      const section = this.sections[side];
      ScrollTrigger.create({
        trigger: this.$refs[side],
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
          section.enter = true;
        },
        onLeaveBack: () => {
          section.enter = false;
        },
        onEnterBack: () => {
          section.leave = false;
        },
        onLeave: () => {
          section.leave = true;
        }
      });
    });

    if (this.$isMobile) {
      this.scrollData.current = 0;
      return;
    }
    this.totalHeight = this.$refs.scrolly.clientHeight;
    setTimeout(() => {
      const groups = [this.$refs.buffer, ...this.$refs.groups];

      if (this.collect) {
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
            onUpdate: ({ progress }) => (this.scrollData.progress = progress),
            onEnter: instance => (this.scrollData.current = i),
            onLeaveBack: instance => (this.scrollData.current = i - 1)
          });
        });
        ScrollTrigger.create({
          trigger: this.$refs.groups[this.groups - 1],
          start: `bottom ${cumulative}px`,
          end: "bottom top",
          onUpdate: ({ progress, direction, start, end }) => {
            this.scrollData.leaveProgress = progress;
            this.leaveOffset = (start - end) * progress;
          }
        });
        this.cumulativeHeights = cumulativeHeights;
      } else {
        groups.forEach((el, i) => {
          ScrollTrigger.create({
            trigger: el,
            start: "bottom bottom",
            end: "bottom top",
            onUpdate: ({ progress, direction }) => {
              this.scrollData.progress = progress;
              this.scrollData.direction = direction;
            },
            onEnter: instance => (this.scrollData.current = i),
            onLeaveBack: instance => (this.scrollData.current = i - 1)
          });
        });
      }
    }, 2100);
  }
};
</script>
<style scoped>
.scroll-snap-child {
  scroll-snap-align: start;
}
</style>
