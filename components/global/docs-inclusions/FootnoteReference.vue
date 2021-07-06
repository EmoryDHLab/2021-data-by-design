<template>
  <span>
    {{footnoteNumber}}
  </span>
</template>

<script>
export default {
  props: {
    footnoteNumber: Number,
  }
}
</script>

<style scoped>
span {
  display: inline-block;
  font-family: "VTC William";
  font-weight: bold;
  vertical-align: middle;
  font-size: 14px;
  line-height: 22px;
  border-radius: 50%;
  min-width: 22px;
  height: 22px;
  margin-left: 2px;
  text-align: center;
  background-color: var(--primaryColor);
  color: var(--primaryColorText)
}
</style>
