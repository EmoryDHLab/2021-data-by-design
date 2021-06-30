<template>
  <grid-layout>
    <Component class="left-col" :is="docsRenderer" :docContent="leftContent"></Component>
    <Component class="right-col" :is="docsRenderer" :docContent="rightContent"></Component>
    <!--    <DocsRenderer class="left-col" :content="leftContent"></DocsRenderer>-->
<!--    <DocsRenderer class="right-col" :content="rightContent"></DocsRenderer>-->
  </grid-layout>
</template>

<script>
import GridLayout from "./GridLayout"
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
  }
}
</script>

<style>
  .left-col, .right-col {
    display: contents
  }

  .left-col > * {
    grid-column-end: 8;
  }

  .left-col > p {
    grid-column-start: 2;
  }

  .right-col > * {
    grid-column-start: 9;
    grid-column-end: 14;
  }

</style>
