<template>
  <div class="flex justify-evenly w-full text-white">
    <EventBoxArrow :class="{'invisible': value == 0}" @click="updateValue(value - 1)"/>
    <div class="mx-4 my-2 text-base w-3/4 flex flex-col gap-4">
      <div>
        {{eventText}}
      </div>
      <div class="self-end text-sm">
        {{value + 1}}/{{yearsData.length}}
      </div>
    </div>
    <EventBoxArrow :class="{'invisible': value == yearsData.length - 1}" @click="updateValue(value + 1)" class="transform rotate-180"/>
  </div>
</template>

<script>
import EventBoxArrow from "./EventBoxArrow.vue"
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    yearsData: {
      type: Array,
    }
  },
  components: {EventBoxArrow},
  methods: {
    updateValue (newVal) {
      if (newVal >= 0 && newVal < this.yearsData.length) {
        this.$emit("input", newVal);
      }
    }
  },
  computed: {
    eventText () {
      return this.yearsData?.[this.value]?.event;
    }
  }
}
</script>

<style scoped>

</style>
