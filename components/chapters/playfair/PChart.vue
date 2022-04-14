<template>
  <StaticData :dataset="[dataFileName]" v-slot="data">
    <svg
      v-if="data.uk_covid || data.income || data.femaleRPs"
      class="col-span-full flex"
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
  props: {
    chartName: {
      type: String
    }
  },
  data: {},
  computed: {
    dataFileName() {
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
