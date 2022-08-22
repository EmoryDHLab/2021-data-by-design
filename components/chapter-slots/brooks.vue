<template>
  <Slots>
    <template v-slot:[slots.shipOutline]>
      <div class="middle-full flex flex-col items-center pb-10">
        <ShipOutline /></div
    ></template>
  </Slots>
</template>

<script>
import ChapterSlots from "~/components/mixins/ChapterSlots";
import ShipOutline from "~/components/chapters/brooks/ShipOutline.svg?inline";

export default {
  mixins: [ChapterSlots],
  components: {
    ShipOutline,
  },
  data() {
    return {
      slots: {
        shipOutline: "ShipOutline",
      },
    };
  },
  chapterState: {},
  methods: {},
};
</script>

<style scoped></style>
