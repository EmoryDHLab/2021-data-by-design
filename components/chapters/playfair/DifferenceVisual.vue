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
      <Recreation :playfairData="data.playfair_nums_def"></Recreation>
    </svg>
  </StaticData>
</template>
<script>
import Recreation from "@/components/chapters/playfair/recreations/Recreation";
import StaticData from "@/components/data-access/StaticData";

export default {
  components: { Recreation, StaticData },
  props: ["playfairData"],
  inject: ["scrollData"]
};
</script>
