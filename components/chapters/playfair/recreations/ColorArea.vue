<template>
  <g>
    <path
      :d="area"
      fill="pink"
      clip-path="url(#stipple-clip1)"
      opacity="0.4"
    ></path>
    <path
      :d="area"
      fill="pink"
      clip-path="url(#stipple-clip2)"
      opacity="0.4"
    ></path>
    <path
      :d="area"
      fill="#3e6620"
      clip-path="url(#hatchure-clip1)"
      opacity="0.4"
    ></path>
    <path
      :d="area"
      fill="#3e6620"
      clip-path="url(#hatchure-clip2)"
      opacity="0.4"
    ></path>
    <clipPath id="stipple-clip1">
      <rect width="44" height="50"></rect>
    </clipPath>
    <clipPath id="stipple-clip2">
      <rect x="67.6" width="1" height="50"></rect>
    </clipPath>
    <clipPath id="hatchure-clip1">
      <rect x="44" width="23.6" height="50"></rect>
    </clipPath>
    <clipPath id="hatchure-clip2">
      <rect x="68.6" width="20" height="50"></rect>
    </clipPath>
  </g>
</template>
<script>
export default {
  props: { area: Function },
  computed: {}
};
</script>
