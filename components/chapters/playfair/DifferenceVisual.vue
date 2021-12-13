<template>
  <div class="w-full">
    <svg id="chart" class="w-full h-full" viewBox="0 0 99 99">
      <rect
        height="70"
        width="100"
        style="fill:#F3ECCB; font-family: 'Dancing Script', cursive"
      />
      <RecreationTesting></RecreationTesting>
    </svg>
  </div>
</template>
<script>
import RecreationTesting from "@/components/chapters/playfair/recreations/RecreationTesting";

export const docsDefinition = {
  matchName: ["Difference Visualization"],
  componentName: "DifferenceVisual",
  props: {}
};
export default {
  components: { RecreationTesting },
  inject: ["scrollData"],
  methods: {
    svg() {}
  }
};
</script>
