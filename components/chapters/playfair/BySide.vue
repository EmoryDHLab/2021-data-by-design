<template>
  <StaticData :dataset="['playfair_nums_def']" v-slot="{ playfair_nums_def }">
    <div
      v-if="playfair_nums_def"
      class="col-span-6 2xl:col-span-8 col-start-3 2xl:col-start-4 mt-6 flex flex-row"
    >
      <svg viewBox="0 0 100 50">
        <rect width="64%" height="100%" fill="#F3ECCB" />
        <rect width="35%" height="100%" fill="#F3ECCB" x="65" />
        <StackedChart :playfairData="playfair_nums_def"></StackedChart>
        <CoxcombChart :playfairData="playfair_nums_def"></CoxcombChart>
      </svg>
    </div>
  </StaticData>
</template>
<script>
import StackedChart from "@/components/chapters/playfair/StackedChart";
import CoxcombChart from "@/components/chapters/playfair/CoxcombChart";
import StaticData from "@/components/data-access/StaticData";

export default {
  components: { StackedChart, StaticData, CoxcombChart }
};
</script>
