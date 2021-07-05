<template>
  <grid-layout>
    <Component ref="leftCol" class="left-col" :is="docsRenderer" :docContent="leftContent" @mounted="leftMounted"></Component>
    <Component ref="rightCol" class="right-col" :is="docsRenderer" :docContent="rightContent" @mounted="rightMounted"></Component>
    <!--    <DocsRenderer class="left-col" :content="leftContent"></DocsRenderer>-->
<!--    <DocsRenderer class="right-col" :content="rightContent"></DocsRenderer>-->
    {{leader}}
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
  },
  methods: {
    leftMounted ({height}) {
    },
    rightMounted ({height}) {
    }
  },
  computed: {
    leader () {
    }
  }
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

  .left-col > p {
    grid-column-start: 3;
    grid-column-end: 8;
  }


</style>
