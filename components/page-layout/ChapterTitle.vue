<template>
  <div class="root">
    <div class="text">
      <h1 class="title"> {{title}}</h1>
      <h2 class="subtitle"> {{subtitle}} </h2>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    title: String,
    subtitle: String
  }
}
</script>

<style scoped>
.root {
  height: 440px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  font-family: "VTC William";
  font-size: 64px;
}

.subtitle {
  font-family: "VTC William";
  font-size: 24px;
}

.text {
  color: white;
  text-align: center;
}
</style>
