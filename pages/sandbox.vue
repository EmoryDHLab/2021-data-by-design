<template>
  <GridLayout>
    <PeabodyTimelineView />

    <PeabodyQuiz></PeabodyQuiz>

    <PeabodyFreeform />
  </GridLayout>
</template>

<script>
import EventSquare from "~/components/chapters/peabody/grid/EventSquare";
import PeabodyQuiz from "../components/chapters/peabody/PeabodyQuiz";
import PeabodyTimelineView from "../components/chapters/peabody/PeabodyTimelineView";
import PeabodyFreeform from "../components/chapters/peabody/PeabodyFreeform.vue";

export default {
  components: {
    PeabodyTimelineView,
    PeabodyQuiz,
    EventSquare,
    PeabodyFreeform,
  },
};
</script>

<style scoped></style>
