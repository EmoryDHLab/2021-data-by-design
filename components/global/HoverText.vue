<template>
  <a href="javascript:;" v-html="html"></a>
</template>

<script>
import ThemeVars from "@/components/mixins/ThemeVars";

export default {
  mixins: [ThemeVars],
  props: {
    html: String,
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
  font-weight: 600;
  color: black;
}

a:hover {
  text-decoration: underline;
  text-decoration-color: var(--primaryColor)
}
</style>
