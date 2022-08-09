<template>
  <div class="font-duboisNarrow uppercase">
    <div class="flex flex-col">
      <div
        v-for="item in legendList"
        :key="item.displayName"
        class="flex flex-row mb-6 items-center pl-4"
      >
        <div
          class="mr-2 rounded-2xl h-8 w-8"
          :style="`background-color: ${item.color}; border: 1px solid black;`"
        ></div>
        <p>{{ item.displayName }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    legendList: Array,
  },
};
</script>
