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
    <text
      fill="black"
      :x="topText.offset"
      y="15"
      font-family="Maranallo"
      font-size="2.7"
    >
      {{ topText.text }}
    </text>
    <text
      fill="black"
      :x="midText.offset"
      y="18.5"
      font-family="Chancery Cursive"
      font-size="2.9"
    >
      {{ midText.text }}
    </text>
    <text
      fill="black"
      :x="botText.offset"
      y="22"
      font-family="Maranallo"
      font-size="3"
    >
      {{ botText.text }}
    </text>
  </g>
</template>
<script>
export default {
  props: { color: String, topText: Object, midText: Object, botText: Object },
  computed: {}
};
</script>
