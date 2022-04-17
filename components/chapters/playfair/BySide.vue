<template>
  <!-- <StaticData :dataset="['uk-covid']" v-slot="data">
    <svg
      v-if="data.ukCovid"
      class="w-full h-full flex ml-6"
      viewBox="0 0 100 50"
    >
      <rect width="100%" height="100%" fill="#F3ECCB" />
      <Recreation :playfairData="data.ukCovid"></Recreation>
    </svg>
  </StaticData> -->
</template>
<script>
import Recreation from "@/components/chapters/playfair/recreationElements/Recreation";
import StaticData from "@/components/data-access/StaticData";

export default {
  components: { StaticData },
  props: ["playfairData"]
};
</script>
