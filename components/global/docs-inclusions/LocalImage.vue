<template>
  <img :src="src" alt="" :width="width" loading="lazy" />
</template>

<script>
export const docsDefinition = {
  matchName: ["Image"],
  componentName: "LocalImage",
  props: {
    path: {
      type: "string",
      required: true,
    },
    width: {
      type: "string",
    },
  },
};

export default {
  name: "LocalImage",
  props: {
    path: {
      type: String,
      required: true,
    },
    width: {
      type: String,
    },
  },
  computed: {
    src() {
      return require(`~/assets/images/${this.path}`);
    },
  },
};
</script>

<style scoped></style>
