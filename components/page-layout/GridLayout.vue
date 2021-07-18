<script src="../global/index.js"></script>
<template>
  <div class="grid grid-cols-10 2xl:grid-cols-14">
    <h2 class="hidden 2xl:block">14 col</h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "GridLayout"
}
</script>
