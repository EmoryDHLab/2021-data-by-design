<template>
  <div class="root h-96 flex flex-col justify-center items-center">
    <div class="text text-white text-center">
      <h1 class="font-william text-7xl mb-10"> {{title}}</h1>
      <h2 class="font-william text-4xl"> {{subtitle}} </h2>
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
