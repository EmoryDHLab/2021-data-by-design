<template>
  <div class="root">
    <div class="extension" :style="backgroundColor">

    </div>
    <div class="content" :style="backgroundColor">
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
  inject: ["theme"],
  computed: {
   backgroundColor () {
      return {
        backgroundColor: this.theme?.primaryColor || "black",
      }
    }
  }
}
</script>

<style scoped>
.root {
  display: contents;
}

div.extension {
  grid-column-start: 1;
}
div.content {
  font-family: "VTC William", sans-serif;
  color: white;
  padding-right: 20px;
  grid-column-start: 2;
  grid-column-end: inherit;
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
