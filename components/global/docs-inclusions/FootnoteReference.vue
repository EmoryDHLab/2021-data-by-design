<template>
  <span>
    <span role="button" class="circle" @click="show = !show">
      {{ footnoteNumber }}
    </span>
    <span class="text-blue-400" v-if="show">
      <DocsRenderer :docContent="componentData.footnotes[footnoteNumber]" />
    </span>
  </span>
</template>

<script>
import DocsRenderer from "../../docs-renderer/DocsRenderer.vue";

export default {
  inject: ["componentData"],
  components: { DocsRenderer },
  props: {
    footnoteNumber: Number,
  },
  data: () => ({
    show: false,
  }),
};
</script>

<style scoped>
  .circle {
    cursor: pointer;
    display: inline-block;
    font-family: "VTC William";
    font-weight: bold;
    vertical-align: middle;
    font-size: .75rem;
    line-height: 1.25rem;
    border-radius: 50%;
    min-width: 1.25rem;
    height: 1.25rem;
    margin-left: 0.25rem;
    margin-bottom: 0.2rem;
    text-align: center;
    background-color: var(--primaryColor);
    color: var(--primaryColorText);
  }
</style>
