<template>
  <div class="flex text-white h-28 border-b">
    <EventBoxArrow :class="{'invisible': value == 0}" @click="updateValue(value - 1)"/>
    <div class="mx-4 my-2 text-base w-96 flex flex-col gap-4">
      <div>
        <span class="font-william">{{eventYear}}:</span> {{eventText}}
      </div>
      <div class="self-end text-sm">
        {{completedText}}
      </div>
    </div>
    <EventBoxArrow :class="{'invisible': yearsData && value == yearsData.length - 1}" @click="updateValue(value + 1)" class="transform rotate-180"/>
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
    eventYear() {
      return this.yearsData?.[this.value]?.year;
    },
    eventText () {
      console.log(this.yearsData?.[this.value]);
      return this.yearsData?.[this.value]?.event;
    },
    completedText() {
      if (this.yearsData?.length) {
        return `${this.value + 1}/${this.yearsData.length}`;
      }
    }
  }
}
</script>

<style scoped>

</style>
