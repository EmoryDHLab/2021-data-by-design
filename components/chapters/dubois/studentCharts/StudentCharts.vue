<template>
  <div class="middle-full flex flex-col items-center">
    <span
      ><button
        @click="chartState = CHART_STATE.ONE"
        class="border-2 border-indigo-600 p-1 rounded"
      >
        Chart One
      </button>
      <button
        @click="chartState = CHART_STATE.TWO"
        class="border-2 border-indigo-600 p-1 rounded"
      >
        Chart Two
      </button>
    </span>
    <ChartOne v-if="this.chartState === this.CHART_STATE.ONE" />
    <ChartTwo v-else :chartState="this.chartState" />
  </div>
</template>

<script>
import ChartOne from "./ChartOne";
import ChartTwo from "./ChartTwo";

const CHART_STATE = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
};

export default {
  data() {
    return {
      chartState: CHART_STATE.ONE,
      CHART_STATE,
    };
  },
  components: {
    ChartOne,
    ChartTwo,
  },
};
</script>
