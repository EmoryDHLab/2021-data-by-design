<template>
  <grid-layout>
    <div class="left-col">
      <slot name="left"></slot>
    </div>
    <div class="right-col">
      <slot name="right"></slot>
    </div>
  </grid-layout>
</template>

<script>
import GridLayout from "./GridLayout"
export default {
  name: "LeaderFollowPair",
  components: {GridLayout}
}
</script>

<style>
  .span-left {
    grid-column-start: 2;
    grid-column-end: 7;
  }
  .span-right {
    grid-column-start: 7;
    grid-column-end: 12;
  }

  .left-col, .right-col, .left-col > div, .right-col > div {
    display: contents
  }

  .left-col p {
    grid-column-start: 2;
    grid-column-end: 7;
  }

  .right-col p {
    grid-column-start: 7;
    grid-column-end: 12;
  }

</style>
