<template>
  <div>
    <h4>MyComponent</h4>
    <p>Prop1: {{prop1}}</p>
    <p>Prop2: {{prop2}}</p>
    <slot name="SlotExample"></slot>
  </div>
</template>

<script>
export default {
  props: {
    prop1: Number,
    prop2: String
  }
}
</script>

<style scoped>
div {
  padding: 20px;
  width: 400px;
  border: 1px solid green;
}
</style>