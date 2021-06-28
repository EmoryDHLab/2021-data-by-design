<template functional>
  <div class="root">
    <div class="big">
      <slot name="title"></slot>
    </div>
    <div class="small">
      <slot name="subtitle"></slot>
    </div>
  </div>
</template>

<script>
export const docsDefinition = {
  matchName: ["Pullquote"],
  componentName: "Pullquote",
  slots: {
    title: {},
    subtitle: {}
  }
}
export default {
}
</script>

<style scoped>
div.root {
  font-family: "VTC William", sans-serif;
}

.big {
  font-size: 36pt;
  line-height: 150%;
}
.small {
  font-size: 24pt;
  line-height: 150%;
}

</style>
