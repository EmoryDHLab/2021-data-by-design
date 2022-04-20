<template>
  <GridLayout>

    <PeabodyTimelineView/>

    <PeabodyQuiz></PeabodyQuiz>

  </GridLayout>

</template>

<script>

import EventSquare from "@/components/chapters/peabody/grid/EventSquare"
import PeabodyQuiz from "../components/chapters/peabody/PeabodyQuiz";
import PeabodyTimelineView
  from "../components/chapters/peabody/PeabodyTimelineView";

export default {
  components: {PeabodyTimelineView, PeabodyQuiz, EventSquare}
}
</script>

<style scoped>

</style>
