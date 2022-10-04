<template>
  <grid-layout ref="grid" :style="{ marginBottom: pinSpacing + 'px' }">
    <Component
      ref="leftCol"
      class="left-col col-start-1 col-end-6 2xl:col-end-8 self-center grid grid-cols-7"
      :is="chapterSlot"
      :docContent="leftContent"
      @mounted="leftMounted"
    ></Component>
    <Component
      ref="rightCol"
      class="right-col col-span-full col-start-7 2xl:col-start-8 self-center grid grid-cols-7"
      :is="chapterSlot"
      :docContent="rightContent"
      @mounted="rightMounted"
    ></Component>
    <!--    <DocsRenderer class="left-col" :content="leftContent"></DocsRenderer>-->
    <!--    <DocsRenderer class="right-col" :content="rightContent"></DocsRenderer>-->
  </grid-layout>
</template>

<script>
import GridLayout from "./GridLayout";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (process.client) gsap.registerPlugin(ScrollTrigger);

export default {
  name: "LeaderFollowPair",
  components: { GridLayout },
  inject: ["chapterSlot"],
  props: {
    leftContent: {
      type: Array,
      required: true,
    },
    rightContent: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    leftHeight: undefined,
    rightHeight: undefined,
    scrollTriggerInstance: undefined,
  }),
  methods: {
    leftMounted({ height }) {
      this.leftHeight = height;
    },
    rightMounted({ height }) {
      this.rightHeight = height;
    },
  },
  computed: {
    ordered() {
      if (this.leftHeight && this.rightHeight) {
        const leftEl = this.$refs.leftCol.$el;
        const rightEl = this.$refs.rightCol.$el;
        if (this.leftHeight > this.rightHeight) {
          return [leftEl, rightEl];
        }
        return [rightEl, leftEl];
      }
    },
    pinSpacing() {
      //Manual pinSpacing applied to the grid, because we're automatically centering grid items
      //and applying more space to one side will throw off the other
      if (this.scrollTriggerInstance) {
        return (
          this.scrollTriggerInstance.end - this.scrollTriggerInstance.start + 24
        );
      }
      return 0;
    },
  },
  watch: {
    ordered(newVal, oldVal) {
      if (!this.scrollTriggerInstance) {
        this.scrollTriggerInstance = ScrollTrigger.create({
          trigger: this.ordered[0],
          start: "top top",
          endTrigger: this.ordered[1],
          end: "top top",
          pin: this.ordered[0],
          pinSpacing: false,
        });
      }
    },
  },
};
</script>

<style>
.right-col .doc-table-root {
  justify-content: center;
}

.left-col > *,
.right-col > * {
  @apply col-span-full;
}

.right-col > div {
  grid-column: 2 / -2;
}

.left-col > p {
  grid-column-start: 2;
}

@media (min-width: 1536px) {
  .left-col > p {
    grid-column-start: 3;
  }
}
</style>
