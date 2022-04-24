<template>
  <div class="root">
    <div class="title main-title">
      Keep reading below
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
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--primaryColor);
  color: var(--primaryColorText);
}

.title {
  font-family: "VTC William";
  font-size: 36px;
}

.main-title {
  text-align: center;
  margin: 40px 0;
}

</style>
