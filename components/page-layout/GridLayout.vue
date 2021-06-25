<template>
  <div class="grid">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "GridLayout"
}
</script>

<style scoped>
  .grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  }
</style>
