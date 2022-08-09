<template>
  <div class="middle-full flex flex-col items-center">
    <span>
      <button
        @click="setChartState(CHART_STATE.ONE)"
        :class="
          classes(
            'cut-corners p-2 uppercase font-dubois',
            chartState === CHART_STATE.ONE ? 'bg-dubois_sec' : 'bg-white'
          )
        "
      >
        Chart One
      </button>
      <button
        @click="setChartState(CHART_STATE.TWO)"
        :class="
          classes(
            'cut-corners p-2 uppercase font-dubois',
            chartState === CHART_STATE.TWO ? 'bg-dubois_sec' : 'bg-white'
          )
        "
      >
        Chart Two
      </button>
      <button
        @click="setChartState(CHART_STATE.THREE)"
        :class="
          classes(
            'cut-corners p-2 uppercase font-dubois',
            chartState === CHART_STATE.THREE ? 'bg-dubois_sec' : 'bg-white'
          )
        "
      >
        Chart Three
      </button>
    </span>
    <ChartOne v-if="this.chartState === this.CHART_STATE.ONE" />
    <ChartTwo v-else-if="this.chartState === this.CHART_STATE.TWO" />
    <ChartThree v-else />
  </div>
</template>

<script>
import ChartOne from "./ChartOne";
import ChartTwo from "./ChartTwo";
import ChartThree from "./ChartThree";

const CHART_STATE = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
};

export default {
  data() {
    return {
      chartState: parseInt(this.$route.query.chart || CHART_STATE.ONE),
      CHART_STATE,
    };
  },
  methods: {
    setChartState: function (chartState) {
      this.chartState = chartState;
      this.$router.push({ query: { chart: chartState.toString() } });
    },
    classes(...classNames) {
      return classNames.filter(Boolean).join(" ");
    },
  },
  components: {
    ChartOne,
    ChartTwo,
    ChartThree,
  },
};
</script>

<style>
.cut-corners {
  clip-path: polygon(
    0 10px,
    10px 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    10px 100%,
    0 calc(100% - 10px)
  );
}
</style>
