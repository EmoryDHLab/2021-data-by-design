<template functional>
  <div class="border">
    <slot/>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
div.border {
  width: fit-content;
  height: fit-content;
  border: 3px dashed var(--primaryColor);
  padding: 5px;
}
</style>
