<template>
  <svg
    v-if="this.playfairData"
    class="w-full h-full flex ml-6"
    viewBox="0 0 100 50"
  >
    <rect
      width="100%"
      height="100%"
      style="fill:#F3ECCB; font-family: 'Dancing Script', cursive"
    />
    <RecreationTesting :playfairData="this.playfairData"></RecreationTesting>
  </svg>
</template>
<script>
import RecreationTesting from "@/components/chapters/playfair/recreations/RecreationTesting";

export default {
  components: { RecreationTesting },
  props: ["playfairData"]
};
</script>
