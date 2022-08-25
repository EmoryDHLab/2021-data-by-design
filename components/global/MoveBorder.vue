<template>
  <div class="border-primary border-4 border-dashed p-1">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
div.border-primary {
  border-color: var(--primaryColor);
}
</style>
