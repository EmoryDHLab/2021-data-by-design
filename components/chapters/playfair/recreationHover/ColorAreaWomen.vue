<template>
  <g>
    <path
      :d="area"
      fill="#3e6620"
      clip-path="url(#women1)"
      opacity="0.4"
    ></path>
    <path :d="area" fill="red" clip-path="url(#women2)" opacity="0.3"></path>
    <path
      :d="area"
      fill="#3e6620"
      clip-path="url(#women3)"
      opacity="0.4"
    ></path>
    <path :d="area" fill="red" clip-path="url(#women4)" opacity="0.3"></path>
    <path
      :d="area"
      fill="#3e6620"
      clip-path="url(#women5)"
      opacity="0.4"
    ></path>
    <clipPath id="women1">
      <rect width="55" height="50"></rect>
    </clipPath>
    <clipPath id="women2">
      <rect x="55" width="6" height="50"></rect>
    </clipPath>
    <clipPath id="women3">
      <rect x="61" width="5" height="50"></rect>
    </clipPath>
    <clipPath id="women4">
      <rect x="66" width="3" height="50"></rect>
    </clipPath>
    <clipPath id="women5">
      <rect x="69" width="20" height="50"></rect>
    </clipPath>
  </g>
</template>
<script>
export default {
  props: { area: String },
  computed: {},
};
</script>
