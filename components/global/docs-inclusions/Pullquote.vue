<template>
  <div class="root">
    <div class="content">
      <div class="big">
        <slot name="title"></slot>
      </div>
      <div class="small">
        <slot name="subtitle"></slot>
      </div>
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
  },
}
export default {
}
</script>

<style scoped>
.root {
  grid-column-start: 1;
  margin: var(--vertical-gap-small) 0;
}

div.content {
  color: var(--primaryColorText);
  background-color: var(--primaryColor);
  padding: 36px var(--col-width);
}

div.content p {
  font-family: "VTC William", sans-serif;
}

.big p {
  font-size: 36px;
  line-height: 150%;
}

.big p:last-child {
  margin-block-end: 0.5em;
}

.small p {
  font-size: 24px;
  line-height: 150%;
}

</style>
