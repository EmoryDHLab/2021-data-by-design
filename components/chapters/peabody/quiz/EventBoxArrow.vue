<template>
  <button @click="$emit('click')">
    <svg width="27" height="20" viewBox="0 0 27 20">
      <path
        d="M26.877 8.10034V10.9373H2.87988L3.45581 9.89213L9.79104 19.0377H6.52744L0.000236511 9.66815V9.36952L6.52744 0H9.79104L3.45581 9.14555L2.87988 8.10034H26.877Z"
        fill="white"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: "EventBoxArrow.vue",
};
</script>

<style scoped></style>
