<template>
  <GridLayout>
    <Component
      :is="docsRenderer"
      :docContent="docContent"
      class="contents middle-subgrid"
    ></Component>
  </GridLayout>
</template>

<script>
import GridLayout from "./GridLayout";

export default {
  components: { GridLayout },
  inject: ["docsRenderer"],
  props: {
    docContent: Array,
  },
};
</script>

<style>
.middle-subgrid > p,
.middle-subgrid > .middle-text,
.middle-subgrid > div.middle-center {
  @apply col-span-6 2xl:col-span-8 col-start-3 2xl:col-start-4;
}
.middle-subgrid > div.middle-full {
  @apply col-span-full;
}
</style>
