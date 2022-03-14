<template>
  <button @click="$emit('click')">
    <svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="white" d="M1.88884 17.9178V4.47945L4.39774 1.92393H21.3591L23.868 4.47945V17.9178L21.3591 20.4733H4.39774L1.88884 17.9178ZM0 18.8409L3.73951 22.3876H22.0173L25.7569 18.8409V3.54664L22.0173 0H3.73951L0 3.54664V18.8409Z"></path>
      <path v-if="checked" fill="white" d="M11.1804 18.8118H13.5653L18.5259 3.54664H15.9788L12.2393 15.1582L9.4251 9.15324H6.59185L11.1804 18.8118Z"/>
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    checked: Boolean
  },
}
</script>

<style scoped>

</style>
