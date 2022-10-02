<template>
  <!--This component is no longer used; it was in the version that renders each pair on its own page-->
  <div>
    <SectionTitle v-if="title" :title="title" />
    <GridLayout class="space-y-4 my-8">
      <div
        v-for="(components, i) in componentGroups"
        :key="i"
        class="col-start-2 col-end-10"
      >
        <Component :is="chapterSlot" :docContent="components"></Component>
      </div>
    </GridLayout>
  </div>
</template>

<script>
import GridLayout from "../../layout/GridLayout.vue";
import LeaderFollowPair from "../../layout/LeaderFollowPair.vue";
import SectionTitle from "./SectionTitle";

export default {
  props: {
    title: [String, Boolean],
    renderGroup: {
      type: Object,
      required: true,
    },
  },
  computed: {
    componentGroups() {
      const order = ["components", "right", "left"];
      const groups = order
        .map((key) => key in this.renderGroup && this.renderGroup[key])
        .filter(Boolean);
      if (!groups || !groups.length) {
        debugger;
      }
      return groups;
    },
  },
  components: { SectionTitle, GridLayout, LeaderFollowPair },
  inject: ["chapterSlot"],
};
</script>
