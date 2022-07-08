<template>
  <div
    class="flex flex-col items-center middle-full"
    :style="{ width: this.width }"
  >
    <div>
      <slot />
    </div>
    <div class="caption text-center mt-10 w-5/6" v-if="$scopedSlots.caption">
      <slot name="caption"></slot>
    </div>
  </div>
</template>

<script>
export const docsDefinition = {
  matchName: ["Captioned"],
  componentName: "Captioned",
  props: {
    width: {
      type: "string",
    },
  },
  slots: ["caption"],
};
export default {
  props: {
    width: String,
  },
};
</script>

<style scoped>
.caption,
.caption p,
.caption span {
  @apply font-william text-sm lg:text-lg;
}
</style>
