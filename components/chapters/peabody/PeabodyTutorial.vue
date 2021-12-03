<template>
  <div class="w-full h-full">
    <PeabodyGrid
      :show-labels="scrollData.current > 0"
      :show-squares="scrollData.current > 1" :years-data="1500"></PeabodyGrid>
  </div>
</template>
<script>

import PeabodyGrid from "./grid/PeabodyGrid";
export const docsDefinition = {
  matchName: ["PeabodyTutorial"],
  componentName: "PeabodyTutorial",
  props: {}
}
export default {
  components: {PeabodyGrid},
  inject: ['scrollData'],
}
</script>
