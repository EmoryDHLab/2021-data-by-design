<template>
  <g>
    <ellipse
      cx="28"
      cy="17"
      :rx="(94 / 11) * 1.9"
      ry="10"
      :fill="color"
      stroke="black"
      stroke-width="0.2"
    >
    </ellipse>
    <text fill="black" x="14" y="15" font-family="Maranallo" font-size="2.7">
      EXPORTS & IMPORTS
    </text>
    <text
      fill="black"
      x="24"
      y="18.5"
      font-family="Chancery Cursive"
      font-size="2.9"
    >
      to and from all
    </text>
    <text fill="black" x="15" y="22" font-family="Maranallo" font-size="3">
      NORTH AMERICA
    </text>
  </g>
</template>
<script>
export default {
  props: { color: String },
  computed: {}
};
</script>
