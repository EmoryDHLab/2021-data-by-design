<template>
  <svg v-if="playfairData" class="w-full h-full flex ml-6" viewBox="0 0 100 50">
    <rect width="100%" height="100%" fill="#F3ECCB" />
    <Recreation :playfairData="playfairData"></Recreation>
  </svg>
</template>
<script>
import Recreation from "~/components/chapters/playfair/recreationElements/Recreation";
import playfairData from "~/api/static/data/playfair_nums_def.json";

export default {
  components: { Recreation },
  data() {
    return { playfairData };
  },
};
</script>
