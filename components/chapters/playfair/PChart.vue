<template>
  <StaticData :dataset="['uk_covid']" v-slot="data">
    <svg
      v-if="data.uk_covid"
      class="w-full h-full flex ml-6"
      viewBox="0 0 100 50"
    >
      <rect width="100%" height="100%" fill="#F3ECCB" />
      <RecreationHover :dataFile="data.uk_covid"></RecreationHover>
    </svg>
  </StaticData>
</template>
<script>
import RecreationHover from "@/components/chapters/playfair/recreationHover/RecreationHover";
import StaticData from "@/components/data-access/StaticData";

export default {
  components: { StaticData, RecreationHover },
  props: ["dataFile"]
};
</script>
