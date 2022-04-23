<template>
  <g>
    <path :d="area" fill="red" clip-path="url(#income1)" opacity="0.3"></path>
    <path
      :d="area"
      fill="#3e6620"
      clip-path="url(#income2)"
      opacity="0.4"
    ></path>
    <path :d="area" fill="red" clip-path="url(#income3)" opacity="0.3"></path>
    <clipPath id="income1">
      <rect width="57" height="50"></rect>
    </clipPath>
    <clipPath id="income2">
      <rect x="57" width="10" height="50"></rect>
    </clipPath>
    <clipPath id="income3">
      <rect x="67" width="23" height="50"></rect>
    </clipPath>
  </g>
</template>
<script>
export default {
  props: { area: String },
  computed: {}
};
</script>
