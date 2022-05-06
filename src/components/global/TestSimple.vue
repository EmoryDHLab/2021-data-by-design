<template>
  <div class="bg-fuchsia-300">
    Hey, this is a simple component.
    <div>{{ counter }}</div>
    <button @click="counter++">incrememnt</button>
  </div>
</template>

<script>
export const docsDefinition = {
  matchName: ["TestSimple"],
  componentName: "TestSimple",
  props: {},
};
export default {
  data() {
    return {
      counter: 0,
    };
  },
};
</script>