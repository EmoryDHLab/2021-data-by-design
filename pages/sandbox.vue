<template>
  <GridLayout>
    <div class="w-10">
      <EventSquare :colors="['blue', 'green']"/>
    </div>
  </GridLayout>
</template>

<script>

import EventSquare from "@/components/chapters/peabody/newpeabodygrid/EventSquare"
export default {
  components: {EventSquare}
}
</script>

<style scoped>

</style>
