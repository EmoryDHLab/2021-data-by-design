<template>
  <GridLayout>
    <div class="chapter-title col-span-6 2xl:col-span-8 col-start-3 2xl:col-start-4 relative">
      <div class="opacity-50 bg-theme w-full h-full absolute">
      </div>
      <div class="title-text p-4 relative font-william font-bold text-xl lg:text-4xl flex justify-center items-center">
        <span>{{title}}</span>
      </div>
    </div>
  </GridLayout>
</template>
<script>
import GridLayout from "./GridLayout.vue"

export default {
  name: 'SectionTitle',
  components: {GridLayout},
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
