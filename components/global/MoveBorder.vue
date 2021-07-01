<template functional>
  <div :style="{borderColor: injections.theme.primaryColor}">
    <slot/>
  </div>
</template>

<script>
export default {
  inject: ["theme"],
}
</script>

<style scoped>
div {
  width: fit-content;
  border: 3px dashed;
  padding: 5px;
}
</style>
