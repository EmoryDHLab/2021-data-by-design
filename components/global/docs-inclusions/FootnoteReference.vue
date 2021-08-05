<template>
  <span>
    <span class="circle" @click="show = !show">
      {{footnoteNumber}}
    </span>
    <span class="text-blue-400" v-if="show">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad aliquam asperiores consectetur cumque dicta dolor ducimus esse eum eveniet nemo numquam, officia officiis recusandae reprehenderit repudiandae unde voluptas, voluptatum.
    </span>
  </span>
</template>

<script>
export default {
  props: {
    footnoteNumber: Number,
  },
  data: () => ({
    show: false
  })
}
</script>

<style scoped>
.circle {
  display: inline-block;
  font-family: "VTC William";
  font-weight: bold;
  vertical-align: middle;
  font-size: 14px;
  line-height: 22px;
  border-radius: 50%;
  min-width: 22px;
  height: 22px;
  margin-left: 2px;
  text-align: center;
  background-color: var(--primaryColor);
  color: var(--primaryColorText)
}
</style>
