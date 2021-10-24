<template>
  <div class="root bg-black md:h-96 flex flex-col justify-center items-center">
    <div class="text text-white text-center my-5">
      <h1 class="font-william text-4xl md:text-7xl mb-5 md:mb-10"> {{title}}</h1>
      <h2 class="font-william text-2xl md:text-4xl"> {{subtitle}} </h2>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    title: String,
    subtitle: String
  },
}
</script>
