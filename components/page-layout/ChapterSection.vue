<template>
  <div class="section-root">
    <SectionTitle v-if="title" :title="title"/>

    <GridLayout v-if="$isMobile" class="space-y-4 my-8">
      <template v-for="(group, g) in renderGroups">
        <div v-for="(components, c) in mobileGroups(group)"
             :key="`${g}-${c}`"
             class="col-start-2 col-end-10"
        >
          <Component
            :is="docsRenderer"
            :docContent="components"></Component>
        </div>
      </template>
    </GridLayout>

    <template v-else>
      <template v-for="group in renderGroups">
        <GridLayout v-if=" 'components' in group">
          <Component class="middle-subgrid" :is="docsRenderer" :docContent="group.components"></Component>
          <!--        <DocsRenderer class="span-middle-8" :content="group.components"></DocsRenderer>-->
        </GridLayout>
        <LeaderFollowPair v-else :left-content="group.left" :right-content="group.right || []">
        </LeaderFollowPair>
      </template>
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
  methods: {
    mobileGroups(renderGroup) {
      const order = ["components", "right", "left"];
      const groups = order.map(key => key in renderGroup && renderGroup[key]).filter(Boolean);
      if (!groups || !groups.length) {
        debugger;
      }
      return groups;
    }
  }
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
