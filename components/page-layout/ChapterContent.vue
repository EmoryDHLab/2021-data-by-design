<template>
  <div class="chapter-content my-52 max-w-screen-2xl font-sans text-base lg:text-xl mb-4">
    <template v-if="!$isMobile">
      <template v-for="section in chapterSections">
        <ChapterSection :title="section.title" :components="section.components"></ChapterSection>
      </template>
    </template>
  </div>
</template>
<script>
import ChapterSection from "~/components/page-layout/ChapterSection"

export default {
  name: 'ChapterComponent',
  components: {ChapterSection},
  props: {
    chapterSections: {
      type: Array
    }
  }
}
</script>
