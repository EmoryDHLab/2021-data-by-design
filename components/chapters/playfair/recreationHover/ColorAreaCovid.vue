<template>
  <g>
    <path
      :d="area"
      fill="#3e6620"
      clip-path="url(#covid1)"
      opacity="0.4"
    ></path>
    <clipPath id="covid1">
      <rect width="90" height="50"></rect>
    </clipPath>
  </g>
</template>
<script>
export default {
  props: { area: String },
  computed: {},
};
</script>
