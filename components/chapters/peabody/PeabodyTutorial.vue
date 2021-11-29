<template>
  <div class="w-full">
    <PeabodyGrid></PeabodyGrid>
    {{scrollData.current + scrollData.progress}}
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
