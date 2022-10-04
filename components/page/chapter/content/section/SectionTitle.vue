<template>
  <div class="bg-theme bg-opacity-50 m-w-1/2 my-12">
    <div
      class="title-text p-4 relative font-william font-bold text-xl lg:text-4xl flex justify-center items-center"
    >
      <span>{{ title }}</span>
    </div>
  </div>
</template>
<script>
import GridLayout from "../../layout/GridLayout.vue";

export default {
  name: "SectionTitle",
  components: { GridLayout },
  props: {
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.bg-theme {
  background-color: var(--primaryColor);
}
</style>
