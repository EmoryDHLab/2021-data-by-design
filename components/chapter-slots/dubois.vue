<template>
  <Slots>
    <template v-slot:[slots.test]>
      <PiechartP5></PiechartP5>
    </template>
    <template v-slot:[slots.testUSA]>
      <USAsvg></USAsvg>
    </template>
  </Slots>
</template>

<script>
import ChapterSlots from "@/components/mixins/ChapterSlots";
import PiechartP5 from "@/components/chapters/dubois/piechart/PiechartP5";
import USAsvg from "@/components/chapters/dubois/usmap/USAsvg";

export default {
  components: {
    PiechartP5,
    USAsvg
  },
  mixins: [ChapterSlots],
  data() {
    return {
      slots: { test: "TestComponent", testUSA: "TestUSA" }
    };
  },
  chapterState: {},
  methods: {}
};
</script>

<style scoped></style>
