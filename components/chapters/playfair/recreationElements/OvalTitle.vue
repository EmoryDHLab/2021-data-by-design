<template>
  <g>
    <ellipse
      :cx="ellipse.cx"
      :cy="ellipse.cy"
      :rx="ellipse.rx"
      :ry="ellipse.ry"
      :fill="color"
      stroke="black"
      stroke-width="0.2"
    >
    </ellipse>
    <text
      fill="black"
      :x="topText.x"
      :y="topText.y"
      font-family="Maranallo"
      font-size="2.7"
    >
      {{ topText.text }}
    </text>
    <text
      fill="black"
      :x="midText.x"
      :y="midText.y"
      font-family="Chancery Cursive"
      font-size="2.9"
    >
      {{ midText.text }}
    </text>
    <text
      fill="black"
      :x="botText.x"
      :y="botText.y"
      font-family="Maranallo"
      font-size="3"
    >
      {{ botText.text }}
    </text>
  </g>
</template>
<script>
export default {
  props: {
    color: String,
    ellipse: Object,
    topText: Object,
    midText: Object,
    botText: Object,
  },
  computed: {},
};
</script>
