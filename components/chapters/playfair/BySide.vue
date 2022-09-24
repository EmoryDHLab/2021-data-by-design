<template>
  <div
    v-if="this.playfairData"
    class="col-span-6 2xl:col-span-8 col-start-3 2xl:col-start-4 mt-6 flex flex-row"
  >
    <svg viewBox="0 0 100 50">
      <rect width="64%" height="100%" fill="#F3ECCB" />
      <rect width="35%" height="100%" fill="#F3ECCB" x="65" />
      <StackedChart :playfairData="this.playfairData"></StackedChart>
      <CoxcombChart :playfairData="this.playfairData"></CoxcombChart>
    </svg>
  </div>
</template>
<script>
import StackedChart from "~/components/chapters/playfair/StackedChart";
import CoxcombChart from "~/components/chapters/playfair/CoxcombChart";
import StaticData from "~/components/data-access/StaticData";
import playfairData from "~/api/static/data/playfair_nums_def.json";

export default {
  data() {
    return {
      playfairData,
    };
  },
  components: { StackedChart, StaticData, CoxcombChart },
};
</script>
