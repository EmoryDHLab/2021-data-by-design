<template>
  <div class="font-sans text-sm tracking-wide w-full grid grid-cols-3 gap-y-8 gap-x-4" :class="showing ? 'h-52 opacity-100' : 'h-0 opacity-0'">
    <div
      class="cursor-pointer flex flex-row gap-2 pl-2 border-l-2 border-transparent"
      v-for="(event, i) in legendText"
      :key="event"
      :class="{ 'border-peabodyorange': value == i + 1, 'height-0': showing }"
      @mouseover="$emit('input', i + 1)"
    >
      <div>{{ i + 1 }}</div>
      <div class="event-text">
        {{ event.toLowerCase() }}
        <!-- <span class="invisible font-bold">next</span> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showing: {
      type: Boolean,
      default: true
    },
    legendText: {
      type: Array,
      validator(array) {
        return array.filter((el) => typeof el === "string").length === 9;
      },
      default() {
        return [
          "Battles, Sieges, Beginning of War",
          "Conquests, Annexations, Unions",
          "Losses and Disasters",
          "Falls of States",
          "Foundations of States and Revolutions",
          "Treaties and Sundries",
          "Births",
          "Deeds",
          "Deaths, of Remarkable Individuals",
        ];
      },
    },
    value: {
      type: Number,
      validator(num) {
        return num >= 1 && num <= 9;
      },
    },
  }
};
</script>

<style lang="postcss" scoped>
  div {
    font-variant: small-caps;
  }

  .opacity-0 {
    div {
      height: 0;
      display: none;
    }
  }

  .event-text {
    font-variant: small-caps;
  }
</style>
