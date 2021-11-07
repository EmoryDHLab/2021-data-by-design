<template>
  <div>
    <div class="font-sans text-sm uppercase" v-for="(event, i) in legendText"
         :class="{'font-bold': value == i + 1}"
         @hover="$emit('input', i + 1)">
      {{i + 1}} {{event}}
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
}
</script>

<style scoped>

</style>
