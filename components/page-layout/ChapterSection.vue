<template>
  <div class="section-root">
    <SectionTitle v-if="title" :title="title"/>

    <template v-for="group in renderGroups">
      <GridLayout v-if=" 'components' in group">
        <Component class="middle-subgrid" :is="docsRenderer" :docContent="group.components"></Component>
        <!--        <DocsRenderer class="span-middle-8" :content="group.components"></DocsRenderer>-->
      </GridLayout>
      <LeaderFollowPair v-else :left-content="group.left" :right-content="group.right || []">
      </LeaderFollowPair>
    </template>
  </div>
</template>

<script>
import GridLayout from "./GridLayout.vue";
import LeaderFollowPair from "./LeaderFollowPair.vue";
import SectionTitle from "./SectionTitle";

export default {
  props: {
    title: [String, Boolean],
    renderGroups: {
      type: Array,
      required: true
    }
  },
  components: {SectionTitle, GridLayout, LeaderFollowPair},
  inject: ["docsRenderer"],
}
</script>

<style>

  .middle-subgrid {
    display: grid;
    grid-column: 1 / -1;
    grid: inherit;
  }

  .middle-subgrid > * {
    @apply col-span-8 col-start-2 2xl:col-start-4
  }

  /*Splitting the chapter title into two divs allows us to set an opacity on just the background*/

</style>
