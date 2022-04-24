<template>
  <div class="gap-2 flex flex-wrap" :class="{ 'flex-col': vertical }">
    <div v-for="actor in shownActors" :key="actor" class="flex gap-2">
      <EventSquare
        :colors="[actorColors[actor]]"
        :width="squareWidth"
        :height="squareWidth"
        @hover-start="hovered(actor)"
        :highlighted="selectedActors.includes(actor)"
      >
      </EventSquare>
      <span
        class="text-sm small-caps tracking-wide"
        :class="{ 'font-bold': selectedActors.includes(actor) }"
        >{{ actor.toLowerCase() }}</span
      >
    </div>
  </div>
</template>

<script>
import { actorColors } from "../peabody-utils";
import EventSquare from "../grid/EventSquare";

export default {
  components: { EventSquare },
  model: {
    prop: "selectedActor",
    event: "selected",
  },
  props: {
    selectedActors: Array,
    actorColors: {
      type: Object,
      default() {
        return actorColors;
      },
    },
    shownActors: {
      type: Array,
      required: true,
    },
    squareWidth: {
      type: String,
      default: "25",
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hovered(actor) {
      this.$emit("selected", actor);
    },
  },
};
</script>

<style scoped>
.small-caps {
  font-variant: small-caps;
}
</style>
