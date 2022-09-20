<template>
  <div class="flex text-white min-h-28">
    <EventBoxArrow
      :class="{ invisible: value == 0 }"
      @click="updateValue(value - 1)"
    />
    <div class="mx-4 my-2 text-base w-96 flex flex-row justify-between gap-4">
      <div>
        <span class="font-william">{{ eventYear }}:</span> {{ eventText }}
      </div>
      <div class="self-end flex flex-col items-center gap-2">
        <EventCheckbox
          @click="$emit('solveClicked', currentSolved)"
          :checked="currentSolved"
        />
        <div class="text-sm">
          {{ completedText }}
        </div>
      </div>
    </div>
    <EventBoxArrow
      :class="{ invisible: eventData && value == eventData.length - 1 }"
      @click="updateValue(value + 1)"
      class="transform rotate-180"
    />
  </div>
</template>

<script>
import EventBoxArrow from "./EventBoxArrow.vue";
import EventCheckbox from "./EventCheckbox";
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    eventData: {
      type: Array,
    },
    solvedEvents: {
      type: Array,
    },
  },
  components: { EventBoxArrow, EventCheckbox },
  methods: {
    updateValue(newVal) {
      if (newVal >= 0 && newVal < this.eventData.length) {
        this.$emit("input", newVal);
      }
    },
  },
  computed: {
    currentEvent() {
      return this.eventData?.[this.value];
    },
    currentSolved() {
      return this.solvedEvents.includes(this.currentEvent);
    },
    eventYear() {
      return this.currentEvent?.year;
    },
    eventText() {
      return this.currentEvent?.event;
    },
    completedText() {
      console.log("🚀 ~ file: EventBox.vue ~ line 68 ~ completedText ~ this", this)
      if (this.eventData?.length) {
        return `${this.value + 1}/${this.eventData.length}`;
      }
    },
  },
};
</script>

<style scoped>
.min-h-28 {
  min-height: 7rem;
}
</style>
