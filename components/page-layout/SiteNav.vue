<template>
  <div class="root">
    <div class="flex">
      <div class="site-title">
        Data by Design
      </div>
      <div class="nav-title">
        Home
      </div>
      <div class="nav-title">
        Chapters
      </div>
      <div class="nav-title">
        About the Site
      </div>
      <div class="nav-title">
        Credits
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.root {
  display: flex;
  justify-content: center;
  background-color: black;
}
.flex {
  width: 1100px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
}

.site-title {
  font-family: "VTC William";
  font-size: 24px;
}

.nav-title {
  font-family: "neue-haas-unica";
  font-size: 20px;
}

</style>
