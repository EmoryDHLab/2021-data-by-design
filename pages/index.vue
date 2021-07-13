<template>
  <div class="container">
<!--    <NuxtLink to="/chapters/peabody">Peabody</NuxtLink>-->
    <div class="big-title">
      <span class="line-one">DATA BY</span>
      <span class="line-two">DESIGN</span>
    </div>
    <div class="cover-img-container">

    </div>
  </div>
</template>

<script>
export default {}
</script>
<style>
.container {
  background-color: black;
  display: grid;
  grid-template-columns: repeat(14, 1fr);
  grid-template-rows: repeat(10, 81px);
  width: 100%;
}
.big-title {
  color: white;
  font-weight: bold;
  font-size: 224px;
  grid-column: 1 / -1;
  grid-row: 1 / 4;
  /*line-height: 80%;*/
  margin-left: 40px;
  z-index: 10;
  line-height: 80%;
}

.big-title .line-one {
  font-family: "VTC William";
}
.big-title .line-two {
  font-family: "VTC William Wide";
  /*grid-column: 2 / -1;*/
  /*grid-row: 3 / -1;*/
  margin-top: 10px;
  /*z-index: 10;*/
  margin-left: 112px;
}

.cover-img-container {
  background-color: #3B6FE0;
  grid-column: 10 / -1;
  grid-row: 1 / -1;
}

</style>
