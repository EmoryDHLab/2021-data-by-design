<template>
  <StaticData :dataset="dataFileName" v-slot="data" :key="dataFileName">
    <svg
      viewBox="0 0 100 50"
      class="col-span-6 2xl:col-span-8 col-start-3 2xl:col-start-4 mt-6 flex"
    >
      <rect width="100%" height="100%" fill="#F3ECCB" />
      <RecreationCovid
        v-if="dataFileName === 'uk_covid'"
        :dataFile="data.uk_covid"
      ></RecreationCovid>
      <RecreationIncome
        v-if="dataFileName === 'income'"
        :dataFile="data.income"
      ></RecreationIncome>
      <RecreationWomen
        v-if="dataFileName === 'femaleRPs'"
        :dataFile="data.femaleRPs"
      ></RecreationWomen>
    </svg>
  </StaticData>
</template>
<script>
import RecreationCovid from "@/components/chapters/playfair/recreationHover/RecreationCovid";
import RecreationWomen from "@/components/chapters/playfair/recreationHover/RecreationWomen";
import RecreationIncome from "@/components/chapters/playfair/recreationHover/RecreationIncome";
import StaticData from "@/components/data-access/StaticData";

export default {
  components: {
    StaticData,
    RecreationCovid,
    RecreationWomen,
    RecreationIncome
  },
  props: {
    chartName: {
      type: String
    }
  },
  data: function() {
    return {};
  },
  computed: {
    dataFileName() {
      console.log("chart name: " + this.chartName);
      if (this.chartName == "Covid") {
        return "uk_covid";
      } else if (this.chartName == "Income") {
        return "income";
      } else if (this.chartName == "Women") {
        return "femaleRPs";
      }
    }
  }
};
</script>
