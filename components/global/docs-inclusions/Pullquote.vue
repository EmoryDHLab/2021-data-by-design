<template>
  <div class="col-start-1 md:m-16">
    <div class="content font-william grid grid-cols-8 py-9">
      <div class="col-start-2 col-end-8">
        <div class="big text-xl lg:text-2xl xl:text-4xl">
          <slot name="title"></slot>
        </div>
        <div class="small text-base lg:text-xl xl:text-2xl">
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



.big p:last-child {
  margin-block-end: 0.5em;
}
</style>
