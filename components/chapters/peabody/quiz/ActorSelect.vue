<template>
  <div class="gap-2 flex flex-wrap" :class="{ 'flex-col': vertical }">
    <div v-for="actor in shownActors" :key="actor" class="flex gap-2">
      <EventSquare
        :colors="[actorColors[actor]]"
        :width="squareWidth"
        :height="squareWidth"
        @hoverStart="hovered(actor)"
        :highlighted="selectedActors.includes(actor)"
      >
      </EventSquare>
      <span
        class="text-sm small-caps tracking-wide min-w-12"
        :class="{ editable: editNames }"
        spellcheck="false"
        :contenteditable="editNames"
        >{{ editNames ? "" : actor.toLowerCase() }}</span
      >
    </div>
  </div>
</template>

<script>
import { actorColors } from "../peabodyUtils";
import EventSquare from "../grid/EventSquare";

export default {
  components: { EventSquare },
  model: {
    prop: "selectedActor",
    event: "selected",
  },
  props: {
    editNames: {
      type: Boolean,
      default: false,
    },
    selectedActors: {
      type: Array,
      default() {
        return [];
      },
    },
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

.editable {
  border: none;
  vertical-align: bottom;
  border-bottom: 2px dashed #efefef;
}

.editable:focus {
  outline: 0px solid transparent;
}

.min-w-12 {
  min-width: 3rem;
}
</style>
