<template>
  <div class="root" :style="{width: this.width}">
    <div>
      <slot/>
    </div>
    <div class="caption" v-if="$slots.caption">
      <slot name="caption"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: String,
  }
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
  font-family: "VTC William";
  font-size: 18px;
  line-height: 150%;
}
</style>
