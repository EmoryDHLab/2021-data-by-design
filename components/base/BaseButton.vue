<template>
  <button @click="$emit('click')">
    <svg
      :width="width"
      height="32"
      viewBox="0 0 77 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      :class="{ black: !whiteMode, white: whiteMode, selected: selected }"
    >
      <path
        d="M70 31H7C4.66 28.66 3.34 27.34 1 25V7C3.34 4.66 4.66 3.34 7 1H70C72.34 3.34 73.66 4.66 76 7V25C73.66 27.34 72.34 28.66 70 31Z"
        :stroke="whiteMode ? 'white' : 'black'"
        stroke-width="2"
      />
      <text
        x="50%"
        y="50%"
        text-anchor="middle"
        dominant-baseline="middle"
        class="font-william"
      >
        {{ text }}
      </text>
    </svg>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    width: {
      type: Number,
      default: 77,
    },
    text: String,
    selected: Boolean,
    whiteMode: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
text {
}
.selected text {
  fill: #ffd3d3 !important;
}
.selected path {
  stroke: #ffd3d3;
}

.black text {
  fill: black;
}
.white text {
  fill: white;
}
.white:hover text {
  fill: black;
}
.white:hover path {
  fill: white;
}

.black:hover path {
  fill: #ffd3d3;
  stroke: none;
}
</style>
