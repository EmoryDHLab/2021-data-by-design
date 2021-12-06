<template>
  <div class="font-sans text-sm uppercase" :class="layoutClass">
    <div class="cursor-pointer flex flex-row gap-2"
         v-for="(event, i) in legendText"
         :class="{'font-bold': value == i + 1}"
         @mouseover="$emit('input', i + 1)">
      <div>{{i + 1}}</div>
      <div>{{event}}<span class="invisible font-bold">next</span></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    legendText: {
      type: Array,
      validator(array) {
        return array.filter(el => typeof el === 'string').length === 9
      },
      default() {
        return [ "Battles, Sieges, Beginning of War",
          "Conquests, Annexations, Unions",
          "Losses and Disasters",
          "Falls of States",
          "Foundations of States and Revolutions",
          "Treaties and Sundries",
          "Births",
          "Deeds",
          "Deaths, of Remarkable Individuals"]
      }
    },
    value: {
      type: Number,
      validator(num) {
        return num >= 1 && num <= 9;
      }
    },
  },
  computed: {
    layoutClass () {
      return "w-full grid grid-cols-3 gap-y-1 gap-x-4"
      // return "flex flex-col";
    }
  }
}
</script>

<style scoped>

</style>
