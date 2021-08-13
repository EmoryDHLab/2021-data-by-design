<template>
  <GridLayout>
    <Component
      :is="docsRenderer" :docContent="docContent" class="contents middle-subgrid"></Component>
  </GridLayout>
</template>

<script>
import GridLayout from "@/components/page-layout/GridLayout";

export default {
  components: {GridLayout},
  inject: ["docsRenderer"],
  props: {
    docContent: Array,
  }
}
</script>

<style>

/*.middle-subgrid {*/
/*  display: grid;*/
/*  grid-column: 1 / -1;*/
/*  grid: inherit;*/
/*}*/

.middle-subgrid > p {
  @apply col-span-6 2xl:col-span-8 col-start-3 2xl:col-start-4
}
.middle-subgrid > div {
  @apply col-span-full
}


</style>
