<template>
  <div class="md:my-16 middle-text flex flex-col">
    <div class="font-william">
      <slot name="quote"></slot>
    </div>
    <div class="font-sans text-lg text-gray-500">
      <slot name="attribution"></slot>
    </div>
<!--    <div class="bg-theme font-william grid grid-cols-8 py-9">-->
<!--      <div class="col-start-2 col-end-8">-->
<!--        <div class="big text-xl lg:text-2xl xl:text-4xl">-->
<!--          <slot name="title"></slot>-->
<!--        </div>-->
<!--        <div class="small text-base lg:text-xl xl:text-2xl">-->
<!--          <slot name="subtitle"></slot>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>

export const docsDefinition = {
  matchName: ["Blockquote"],
  componentName: "Blockquote",
  slots: ["quote", "attribution"]
}

export default {
}
</script>

<style scoped>
</style>
