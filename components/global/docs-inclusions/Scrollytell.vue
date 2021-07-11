<template>
  <GridLayout class="root">
    <div class="scrolly">
      <div v-for="i in groups">
        <slot :name="'group:' + i"></slot>
      </div>
    </div>
    <div class="sticky">
      <slot name="sticky"></slot>
    </div>
  </GridLayout>
</template>

<script>

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
  .sticky {
    grid-column: var(--halfway-line) / var(--num-col)
  }
</style>
