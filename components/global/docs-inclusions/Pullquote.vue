<template>
  <div class="col-start-1 m-16">
    <div class="content grid grid-cols-8 py-9">
      <div class="col-start-2 col-end-8">
        <div class="big">
          <slot name="title"></slot>
        </div>
        <div class="small">
          <slot name="subtitle"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export const docsDefinition = {
  matchName: ["Pullquote"],
  componentName: "Pullquote",
  slots: ["title", "subtitle"]
}
export default {
}
</script>

<style scoped>

div.content {
  color: var(--primaryColorText);
  background-color: var(--primaryColor);
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
