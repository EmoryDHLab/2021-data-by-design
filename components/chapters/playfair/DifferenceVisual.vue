<template>
  <div class="w-full">
    <svg id="chart" viewBox="0 0 500 500">
      <rect
        :height="getHeight()"
        :width="getWidth()"
        style="fill:#F3ECCB; font-family: 'Dancing Script', cursive"
      />
      <RecreationTesting :playfairData="this.playfairData"></RecreationTesting>
    </svg>
  </div>
</template>
<script>
import RecreationTesting from "@/components/chapters/playfair/recreations/RecreationTesting";

export const margin = { top: 25, right: 60, bottom: 25, left: 25 };
export const viewbox = "0 0 " + 400 + " " + 500;
export default {
  components: { RecreationTesting },
  props: ["playfairData"],
  methods: {
    getHeight() {
      return window.innerWidth / 3 / 1.6 - margin.top - margin.bottom;
    },
    getWidth() {
      return window.innerWidth / 3 / 0.77 - margin.left - margin.right;
    }
  }
};
</script>
