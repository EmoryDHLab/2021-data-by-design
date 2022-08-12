<template>
  <FullBleedGridLayout>
    <Component :is="docsRenderer" :docContent="docContent"></Component>
  </FullBleedGridLayout>
</template>

<script>
import FullBleedGridLayout from "./FullBleedGridLayout";

export default {
  components: { FullBleedGridLayout },
  inject: ["docsRenderer"],
  props: {
    docContent: Array,
  },
};
</script>
