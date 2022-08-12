<template>
  <div class="grid-wrapper">
    <slot></slot>
  </div>
</template>

<script>
/**
 * This component implements a full bleed grid layout: https://www.joshwcomeau.com/css/full-bleed/
 * We should ideally move from GridLayout to this component when possible
 */
export default {
  name: "FullBleedGridLayout",
};
</script>

<style>
.grid-wrapper {
  display: grid;
  grid-template-columns:
    1fr
    min(65ch, 100%)
    1fr;
}

.grid-wrapper > * {
  grid-column: 2;
}

.full-bleed {
  width: 100%;
  grid-column: 1 / 4;
}
</style>
