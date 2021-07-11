<template>
  <div class="root" :style="{width: this.width}">
    <div>
      <slot/>
    </div>
    <div class="caption" v-if="$scopedSlots.caption">
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
      type: 'string'
    }
  },
  slots: ["caption"]
}
export default {
  props: {
    width: String,
  },
}
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.caption {
  width: 416px;
  margin-top: 16px;
  text-align: center;
  line-height: 150%;
}

.caption, .caption p, .caption span {
  font-family: "VTC William";
  font-size: 18px;
}
</style>
