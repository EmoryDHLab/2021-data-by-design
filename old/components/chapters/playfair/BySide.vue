<template>
  <svg
    class="col-span-6 2xl:col-span-8 col-start-3 2xl:col-start-4 mt-6 flex"
    viewBox="0 0 100 50"
  >
    <rect width="100%" height="100%" fill="#F3ECCB" />
  </svg>
</template>
<script>
import Recreation from "@/components/chapters/playfair/recreationElements/Recreation";
import StaticData from "@/components/data-access/StaticData";

export default {
  components: { StaticData },
  props: ["playfairData"]
};
</script>
