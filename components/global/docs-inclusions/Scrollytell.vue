<template>
  <GridLayout class="root">
    <div class="scrolly">
      <div v-for="i in groups" ref="groups">
        <slot :name="'group:' + i"></slot>
      </div>
    </div>
    <div class="sticky">
      <slot name="sticky"></slot>
    </div>
  </GridLayout>
</template>

<script>
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  props: {
    groups: Number
  },
  mounted() {
    console.log(this.$refs);
  }
}
</script>

<style scoped>
  .root {
    grid-column: 1 / -1;
    background-color: var(--primaryColor);
    margin: var(--vertical-gap-large) 0;
    height: 650px;
  }
  .scrolly {
    grid-column: 1 / var(--halfway-line);
    justify-items: center
  }
  .sticky {
    grid-column: var(--halfway-line) / var(--num-col)
  }
</style>
