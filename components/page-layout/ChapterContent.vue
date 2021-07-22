<template>
  <div class="chapter-content my-52 max-w-screen-2xl font-sans text-base lg:text-xl mb-4">
    <template v-if="!$isMobile">
      <template v-for="(section, i) in sections">
        <ChapterSection :title="section.title" :renderGroups="section.renderGroups"></ChapterSection>
      </template>
    </template>
  </div>
</template>
<script>
import ChapterSection from "~/components/page-layout/ChapterSection"
import {renderGroups} from "./renderGroups";

export default {
  name: 'ChapterComponent',
  components: {ChapterSection},
  props: {
    chapterSections: {
      type: Array
    }
  },
  computed: {
    sections() {
      if (!this.chapterSections?.length) return [];
      return this.chapterSections.map(section => Object.assign({}, section,
        {renderGroups: renderGroups(section.components)}));
    }
  }
}
</script>
