<template>
  <div class="section-root">
    <SectionTitle class="my-12" v-if="title" :title="title" />

    <GridLayout v-if="$isMobile" class="space-y-4 my-8">
      <template v-for="(group, g) in renderGroups">
        <div
          v-for="(components, c) in mobileGroups(group)"
          :key="`${g}-${c}`"
          class="col-start-2 col-end-10"
        >
          <Component :is="docsRenderer" :docContent="components"></Component>
        </div>
      </template>
    </GridLayout>

    <div class="space-y-10" v-else>
      <div v-for="group in renderGroups">
        <MiddleSubgrid
          v-if="'components' in group"
          :docContent="group.components"
        ></MiddleSubgrid>
        <LeaderFollowPair
          v-else
          :left-content="group.left"
          :right-content="group.right || []"
        >
        </LeaderFollowPair>
      </div>
    </div>
  </div>
</template>

<script>
import GridLayout from "~/components/page/chapter/layout/GridLayout.vue";
import LeaderFollowPair from "~/components/page/chapter/layout/LeaderFollowPair.vue";
import SectionTitle from "./SectionTitle";
import MiddleSubgrid from "~/components/page/chapter/layout/MiddleSubgrid";

export default {
  props: {
    title: [String, Boolean],
    renderGroups: {
      type: Array,
      required: true,
    },
  },
  components: { MiddleSubgrid, SectionTitle, GridLayout, LeaderFollowPair },
  inject: ["docsRenderer"],
  methods: {
    mobileGroups(renderGroup) {
      const order = ["components", "right", "left"];
      const groups = order
        .map((key) => key in renderGroup && renderGroup[key])
        .filter(Boolean);
      if (!groups || !groups.length) {
        debugger;
      }
      return groups;
    },
  },
};
</script>
