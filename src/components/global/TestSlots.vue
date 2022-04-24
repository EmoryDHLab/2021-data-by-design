<template>
  <div>
    yo yo {{ name }}
    {{ element }}
    <div>
      Named slot go here:
      <slot name="named" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    name: String,
    element: Object,
  },
  data() {
    return {
      test: "test",
    };
  },
};
</script>