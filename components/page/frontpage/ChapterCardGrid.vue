<template>
  <div class="grid grid-cols-2 grid-rows-3">
    <ChapterCard class="bg-green-300">
      <template v-slot:title>Visualization as Argument</template>
      <template v-slot:subtitle>William Playfair’s Time-Series Charts</template>
      <template v-slot:caption>The Amalgamation of White and Black elements of the population in the United States by W.E.B Du Bois.
        Atlanta University. Library of Congress.</template>
    </ChapterCard>
    <ChapterCard class="bg-yellow-200">
      <template v-slot:title>This is a title</template>
      <template v-slot:subtitle>This is a subtitle</template>
      <template v-slot:caption>The Amalgamation of White and Black elements of the population in the United States by W.E.B Du Bois.
        Atlanta University. Library of Congress.</template>
    </ChapterCard>
    <ChapterCard class="bg-royalblue">
      <template v-slot:title>This is a title</template>
      <template v-slot:subtitle>This is a subtitle</template>
      <template v-slot:caption>The Amalgamation of White and Black elements of the population in the United States by W.E.B Du Bois.
        Atlanta University. Library of Congress.</template>
    </ChapterCard>
    <ChapterCard class="bg-purple-300">
      <template v-slot:title>This is a title</template>
      <template v-slot:subtitle>This is a subtitle</template>
      <template v-slot:caption>The Amalgamation of White and Black elements of the population in the United States by W.E.B Du Bois.
        Atlanta University. Library of Congress.</template>
    </ChapterCard>
    <ChapterCard class="bg-red-300 col-span-2">
      <template v-slot:title>This is a title</template>
      <template v-slot:subtitle>This is a subtitle</template>
      <template v-slot:caption>The Amalgamation of White and Black elements of the population in the United States by W.E.B Du Bois.
        Atlanta University. Library of Congress.</template>
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