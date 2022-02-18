<template>
  <div class="grid grid-cols-2 grid-rows-3">
    <ChapterCard class="bg-brooks_sec hover:text-white hover:bg-brooks_pri">
      <template v-slot:title>Every Datapoint a Person</template>
      <template v-slot:subtitle>The Brooks / Diagram of a Slave Ship </template>
      <template v-slot:caption>Before there are data, there are people. People who offer up their lives as data --
        or whose lives become data without consent.</template>
    </ChapterCard>
    <ChapterCard class="bg-playfair_sec hover:text-white">
      <template v-slot:title>What Visualization Reveals</template>
      <template v-slot:subtitle>William Playfair's Time-Series Charts</template>
      <template v-slot:caption>Data visualization has never been neutral or objective. There is a meaning -- and
        an argument -- conveyed through each design.</template>
    </ChapterCard>
    <ChapterCard class="bg-willard_sec hover:text-white">
      <template v-slot:title>Narratives of Possession</template>
      <template v-slot:subtitle>Emma Willard and Shanawdithit’s Narrative Maps</template>
      <template v-slot:caption>Maps can create nations and contest them. <br>How
        have maps been used to document multiple pasts?</template>
    </ChapterCard>
    <ChapterCard class="bg-peabody_sec hover:text-white">
      <template v-slot:title>The Work of Knowledge</template>
      <template v-slot:subtitle>Elizabeth Palmer Peabody’s Chronological Grids as Argument</template>
      <template v-slot:caption>We have come to believe that data visualizations should be clear and efficient.
        Is there value in designs that make us pause and reflect?</template>
    </ChapterCard>
    <ChapterCard class="bg-dubois_sec hover:text-white col-span-2" style="text-align: center">
      <template v-slot:title>Between Data and Truth</template>
      <template v-slot:subtitle>W. E. B. Du Bois’s “Data Portraits”</template>
      <template v-slot:caption>How can data visualization bear witness to oppression? How can it hold space for what cannot be conveyed through data alone? </template>
    </ChapterCard>
  </div>
</template>

<script>
import ChapterCard from "./ChapterCard";
export default {
  components: {ChapterCard},
  name: "ChapterCardGrid"
}
</script>

<style scoped>

</style>