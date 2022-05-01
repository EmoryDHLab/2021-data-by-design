<template>
  <div>
    <div>Testing {{ name }}</div>
  </div>
</template>

<script>
export const docsDefinition = {
  matchName: ["PeabodyTest"],
  componentName: "PeabodyTest",
  props: {
    name: {
      type: "string",
    },
  },
};
export default {};
</script>

<style scoped>
</style>
