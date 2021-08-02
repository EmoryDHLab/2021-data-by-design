<template>
  <div class="chapter-content md:my-10 lg:my-52 max-w-screen-2xl font-sans text-base lg:text-xl">
    <template v-if="sections.length">
      <template v-if="$isMobile">
        <ChapterTitle v-if="currentSection == 0"></ChapterTitle>
        <ChapterSection :title="mobileSection.title" :renderGroups="mobileSection.renderGroups"></ChapterSection>
      </template>
      <template v-else>
        <ChapterSection v-for="(section, i) in sections" :key="i" :title="section.title" :renderGroups="section.renderGroups"></ChapterSection>
      </template>
    </template>
  </div>
</template>
<script>
import ChapterSection from "~/components/page-layout/ChapterSection"
import ChapterSectionMobile from "./ChapterSectionMobile";
import {mapMutations, mapState} from "vuex";
import {renderGroups} from "./renderGroups";
import ChapterTitle from "@/components/page-layout/ChapterTitle";

export default {
  name: 'ChapterComponent',
  components: {ChapterTitle, ChapterSection, ChapterSectionMobile},
  props: {
    chapterSections: {
      type: Array
    }
  },
  data: () => ({
    sections: []
  }),
  methods: {
    ...mapMutations("currentChapter", ["initializeSections"])
  },
  mounted() {
    if (!this.chapterSections?.length) console.error("empty section");
    else {
      const sections = this.chapterSections.map(section => Object.assign({}, section,
        {renderGroups: renderGroups(section.components)}));
      this.initializeSections({sectionsData: sections});
      this.sections = sections;
    }
  },
  computed: {
    mobileSection () {
      return this.sections[this.currentSection];
    },
    // mobileRenderGroup () {
    //   if (this.sections) {
    //     const group = this.sections[this.currentSection].renderGroups[this.currentRenderGroup];
    //     return group;
    //   }
    // },
    // mobileTitle () {
    //   if (this.currentRenderGroup == 0) {
    //     return this.sections[this.currentSection].title;
    //   }
    //   return false;
    // },
    ...mapState("currentChapter", ["currentSection"])
  }
}
</script>
