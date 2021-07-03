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
    grid-template-columns: repeat(var(--num-col), var(--col-width));
  }
</style>
