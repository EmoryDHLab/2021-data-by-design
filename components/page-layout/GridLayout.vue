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
    grid-template-columns: repeat(14, var(--col-width));
    grid-column-gap: var(--col-gutter-width);
  }
</style>
