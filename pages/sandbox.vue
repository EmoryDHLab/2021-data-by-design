<template>
  <GridLayout>
    <div class="w-14">
      <EventSquare :colors="['blue', 'green']"/>
    </div>

  </GridLayout>

</template>

<script>

import EventSquare from "@/components/chapters/peabody/grid/EventSquare"
export default {
  components: {EventSquare}
}
</script>

<style scoped>

</style>
