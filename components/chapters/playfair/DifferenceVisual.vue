<template>
  <StaticData :dataset="['playfair_nums_def']" v-slot="data">
    <svg
      v-if="data.playfair_nums_def"
      class="w-full h-full flex ml-6"
      viewBox="0 0 100 50"
    >
      <rect
        width="100%"
        height="100%"
        style="fill:#F3ECCB; font-family: 'Dancing Script', cursive"
      />
      <RecreationTesting
        :playfairData="data.playfair_nums_def"
      ></RecreationTesting>
    </svg>
  </StaticData>
</template>
<script>
import RecreationTesting from "@/components/chapters/playfair/recreations/RecreationTesting";
import StaticData from "@/components/data-access/StaticData";

export default {
  components: { RecreationTesting, StaticData },
  props: ["playfairData"]
};
</script>
