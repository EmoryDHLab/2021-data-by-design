<template>
  <div class="chapter-content my-52 max-w-screen-2xl font-sans text-base lg:text-xl mb-4">
    <template v-if="sections.length">
      <template v-if="!$isMobile">
        <template v-for="(section, i) in sections">
          <ChapterSection :title="section.title" :renderGroups="section.renderGroups"></ChapterSection>
        </template>
      </template>
      <template v-else>
        <ChapterSectionMobile v-if="sections.length" :renderGroup="mobileRenderGroup"></ChapterSectionMobile>
      </template>
    </template>
  </div>
</template>
<script>
import ChapterSection from "~/components/page-layout/ChapterSection"
import ChapterSectionMobile from "./ChapterSectionMobile";
import {mapMutations, mapState} from "vuex";
import {renderGroups} from "./renderGroups";

export default {
  name: 'ChapterComponent',
  components: {ChapterSection, ChapterSectionMobile},
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
  mounted () {
    if (!this.chapterSections?.length) console.error("empty section");
    else {
      const sections = this.chapterSections.map(section => Object.assign({}, section,
        {renderGroups: renderGroups(section.components)}));
      this.initializeSections({sectionsData: sections});
      this.sections = sections;
    }
  },
  computed: {
    mobileRenderGroup () {
      if (this.sections) {
        const group = this.sections[this.currentSection].renderGroups[this.currentRenderGroup];
        return group;
      }
    },
    ...mapState("currentChapter", ["currentSection","currentRenderGroup"])
  }
}
</script>
