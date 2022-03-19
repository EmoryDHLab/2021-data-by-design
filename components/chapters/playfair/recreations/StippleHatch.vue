<template>
  <g>
    <path
      :d="area"
      fill="url(#pattern-circles)"
      clip-path="url(#stipple-clip1)"
    ></path>
    <path
      :d="area"
      fill="url(#pattern-circles)"
      clip-path="url(#stipple-clip2)"
    ></path>
    <path
      :d="area"
      fill="url(#pattern-lines)"
      clip-path="url(#hatchure-clip1)"
    ></path>
    <path
      :d="area"
      fill="url(#pattern-lines)"
      clip-path="url(#hatchure-clip2)"
    ></path>
    <svg width="100" height="50">
      <pattern
        id="pattern-circles"
        x="0"
        y="0"
        width="0.6"
        height="0.6"
        patternUnits="userSpaceOnUse"
        patternContentUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <circle id="pattern-circle" cx="0.1" cy="0.1" r="0.1" fill="black" />
      </pattern>
    </svg>
    <svg width="100" height="50">
      <pattern
        id="pattern-lines"
        x="0"
        y="0"
        width="0.6"
        height="0.6"
        patternUnits="userSpaceOnUse"
        patternContentUnits="userSpaceOnUse"
        patternTransform="rotate(-45)"
      >
        <rect width="0.1" height="0.6" fill="black"></rect>
      </pattern>
    </svg>
    <clipPath id="stipple-clip1">
      <rect width="42" height="50"></rect>
    </clipPath>
    <clipPath id="stipple-clip2">
      <rect x="66.8" width="0.2" height="50"></rect>
    </clipPath>
    <clipPath id="hatchure-clip1">
      <rect x="42" width="24.8" height="50"></rect>
    </clipPath>
    <clipPath id="hatchure-clip2">
      <rect x="68" width="3.2" height="50"></rect>
    </clipPath>
  </g>
</template>
<script>
export default {
  props: { area: Function },
  computed: {}
};
</script>
