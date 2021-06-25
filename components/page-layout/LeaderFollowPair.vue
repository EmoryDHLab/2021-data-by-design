<template>
  <grid-layout>
    <DocsRenderer class="left-col" :content="leftContent"></DocsRenderer>
    <DocsRenderer class="right-col" :content="rightContent"></DocsRenderer>
  </grid-layout>
</template>

<script>
import GridLayout from "./GridLayout"
import DocsRenderer from "docs-renderer-vue2";
export default {
  name: "LeaderFollowPair",
  components: {GridLayout, DocsRenderer},
  props: {
    leftContent: {
      type: Array,
      required: true
    },
    rightContent: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
  .left-col, .right-col {
    display: contents
  }

  .left-col > * {
    grid-column-end: 7;
  }

  .left-col > p {
    grid-column-start: 2;
  }

  .right-col > * {
    grid-column-start: 7;
    grid-column-end: 12;
  }

</style>
