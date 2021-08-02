<template>
  <div class="root" ref="root" :style="localVars">
    <div class="scrolly">
      <div v-for="i in groups" ref="groups">
        <slot :name="'group:' + i"></slot>
      </div>
    </div>
    <GridLayout class="grid" ref="grid">
      <div class="sticky">
        <slot name="sticky"></slot>
      </div>
    </GridLayout>
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
    groups: Number
  },
  provide () {
    return {
      scrollData: this.scrollData
    }
  },
  data: () => ({
    scrollData: {
      progress: -1,
      current: undefined
    }
  }),
  computed: {
    localVars() {
      const gap = "600px";
      return {
        "--numGroups": this.groups,
        "--gap": gap
      }
    }
  },
  mounted() {
    setTimeout(() => {
      const lastGroup = this.$refs.groups[this.groups - 1];
      ScrollTrigger.create({
        anticipatePin: 1,
        trigger: this.$refs.grid.$el,
        endTrigger: lastGroup,
        start: "top 100px",
        // onToggle: ({progress, direction, isActive}) => console.log(progress, direction, isActive),
        pin: this.$refs.grid.$el,
        end: "top 100px"
      })

      for (let i = 0; i < this.groups; i++) {
        ScrollTrigger.create({
          trigger: this.$refs.groups[i],
          start: "top 750px",
          end: "bottom 100px",
          onUpdate: ({progress}) => this.scrollData.progress = progress,
          onEnter: (instance) => this.scrollData.current = i,
          onLeaveBack: (instance) => this.scrollData.current = i - 1,
        })
      }
    }, 2100)
  }
}
</script>

<style scoped>
.root {
  grid-column: 1 / -1;
}

.grid {
  background-color: var(--primaryColor);
  margin: var(--vertical-gap-large) 0;
  height: 650px;
}

.scrolly {
  z-index: 10;
  position: absolute;
  margin-left: 100px;
  margin-top: 100px;
}

.scrolly > div {
  margin-top: 650px;
}

.sticky {
  grid-column: var(--halfway-line) / var(--num-col)
}

</style>
