<template>
  <grid-layout ref="grid" :style="{marginBottom: pinSpacing + 'px'}">
    <Component ref="leftCol" class="left-col" :is="docsRenderer" :docContent="leftContent" @mounted="leftMounted"></Component>
    <Component ref="rightCol" class="right-col" :is="docsRenderer" :docContent="rightContent" @mounted="rightMounted"></Component>
    <!--    <DocsRenderer class="left-col" :content="leftContent"></DocsRenderer>-->
<!--    <DocsRenderer class="right-col" :content="rightContent"></DocsRenderer>-->
  </grid-layout>
</template>

<script>
import GridLayout from "./GridLayout"
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger";

if (process.client)
  gsap.registerPlugin(ScrollTrigger);

export default {
  name: "LeaderFollowPair",
  components: {GridLayout},
  inject: ["docsRenderer"],
  props: {
    leftContent: {
      type: Array,
      required: true
    },
    rightContent: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    leftHeight: undefined,
    rightHeight: undefined,
    scrollTriggerInstance: undefined,
  }),
  methods: {
    leftMounted ({height}) {
      this.leftHeight = height;
    },
    rightMounted ({height}) {
      this.rightHeight = height;
    }
  },
  computed: {
    ordered () {
      if (this.leftHeight && this.rightHeight) {
        const leftEl = this.$refs.leftCol.$el;
        const rightEl = this.$refs.rightCol.$el;
        if (this.leftHeight > this.rightHeight) {
          return [leftEl, rightEl];
        }
        return [rightEl, leftEl];
      }
    },
    pinSpacing () {
      //Manual pinSpacing applied to the grid, because we're automatically centering grid items
      //and applying more space to one side will throw off the other
      if (this.scrollTriggerInstance) {
        return this.scrollTriggerInstance.end - this.scrollTriggerInstance.start;
      }
      return 0;
    }
  },
  watch: {
    ordered (newVal, oldVal) {
      if (!this.scrollTriggerInstance) {
        this.scrollTriggerInstance =
          ScrollTrigger.create({
            trigger: this.ordered[0],
            start: "top top",
            endTrigger: this.ordered[1],
            end: "top top",
            pin: this.ordered[0],
            pinSpacing: false,
            markers: true
        });
      }
    }
  },
}
</script>

<style>
  .left-col {
    grid-column-start: 1;
    grid-column-end: var(--halfway-line);

    align-self: center;

    display: grid;
    grid-template-columns: repeat(7, 1fr);
    /*grid-column: 1 / calc(var(--num-col) / 2)*/
  }

  .right-col {
    grid-column-start: calc(1 + var(--halfway-line));
    grid-column-end: -1;

    align-self: center;

    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .left-col > *, .right-col > * {
    grid-column-start: 1;
    grid-column-end: 8;
  }

  .right-col .doc-table-root {
    justify-content: center;
  }

  .left-col > p {
    grid-column-start: 3;
    grid-column-end: 8;
  }

</style>
