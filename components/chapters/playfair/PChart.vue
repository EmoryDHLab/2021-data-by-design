<template>
   <div
    v-if="this.chartData"
    class="col-span-6 2xl:col-span-8 col-start-3 2xl:col-start-4 mt-6 flex flex-row"
  >
    <svg
      viewBox="0 0 100 50"
    >
      <rect width="100%" height="100%" fill="#F3ECCB" />
      <RecreationCovid
        :chartData="this.chartData"
      ></RecreationCovid>
    </svg>
  </div>
</template>
<script>
import RecreationCovid from "@/components/chapters/playfair/recreationHover/RecreationCovid";
import ukCovidData from "~/api/static/data/uk_covid.json";

export default {
  components: {
    RecreationCovid,
  },
  data: function () {
    return {};
  },
  computed: {
    chartData() {
      return ukCovidData;
    },
  },
  // watch: {
  //   dataFileName() {
  //     console.log(this);
  //   }
  // }
};
</script>
