<template>
  <div>
    <SectionTitle v-if="title" :title="title"/>
    <GridLayout>
      <div v-for="(components, i) in componentGroups"
           :key="i"
           class="col-start-2 col-end-10"
      >
        <Component
          :is="docsRenderer"
          :docContent="components"></Component>
      </div>
    </GridLayout>
  </div>
</template>

<script>
import GridLayout from "./GridLayout.vue";
import LeaderFollowPair from "./LeaderFollowPair.vue";
import SectionTitle from "./SectionTitle";

export default {
  props: {
    title: [String, Boolean],
    renderGroup: {
      type: Array,
      required: true
    }
  },
  computed: {
    componentGroups() {
      const order = ["components", "right", "left"];
      const groups = order.map(key => key in this.renderGroup && this.renderGroup[key]).filter(Boolean);
      debugger;
      return groups;
    }
  },
  components: {SectionTitle, GridLayout, LeaderFollowPair},
  inject: ["docsRenderer"],
}


</script>
