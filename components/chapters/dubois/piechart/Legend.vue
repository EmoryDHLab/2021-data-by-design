<template>
  <div class="font-duboisNarrow uppercase">
    <div v-if="lang == 'eng'" class="flex flex-col">
      <div
        v-for="item in legendList"
        :key="item.eng"
        class="flex flex-row mb-6 items-center pl-4"
      >
        <div
          class="mr-2 rounded-2xl h-8 w-8"
          :style="
            'background-color: ' + item.color + '; border: 1px solid black;'
          "
        ></div>
        <p>{{ item.eng }}</p>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col items-end text-red-500 pr-4 whitespace-nowrap"
    >
      <div
        v-for="item in legendList"
        :key="item.fr"
        class="flex flex-row mb-6 items-center content"
      >
        <p>{{ item.fr }}</p>
        <div
          class="ml-2 rounded-2xl h-8 w-8"
          :style="
            'background-color: ' + item.color + '; border: 1px solid black;'
          "
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    legendList: Array,
    lang: String,
    colors: Array
  },
  computed: {
    xValue: function() {
      return this.xScale(this.x);
    }
  }
};
</script>
