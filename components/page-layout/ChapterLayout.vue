<template>

  <div class="flex">
    <div class="margin">
    </div>
    <div class="chapter-content">
      <template v-for="section in chapterSections">
        <ChapterSection :title="section.title" :components="section.components"></ChapterSection>
      </template>
    </div>
    <div class="margin">
    </div>
  </div>

</template>

<script>
import {componentsFromDoc, findSections} from "google-docs-components"
import TwoColumnDocsRenderer from "~/components/page-layout/TwoColumnDocsRenderer";
import GridLayout from "~/components/page-layout/GridLayout";
import ChapterSection from "~/components/page-layout/ChapterSection";
export default {
  props: {
    docData: {
      type: Object,
      required: true
    }
  },
  components: {ChapterSection},
  mounted() {
    console.log(this.components);
  },
  computed: {
    components() {
      return componentsFromDoc({components: []}, this.docData).body;
    },
    divisions() {
      const metadataDef = {
        name: "metadata",
        start: "Metadata",
        end: "End Metadata"
      }

      const sectionDef = {
        name: "section",
        start: "Section",
        endByNextStart: true,
        endByContentEnd: true
      }

      const sectionData = findSections(this.components, [sectionDef, metadataDef]);
      return sectionData;
    },
    chapterSections() {
      if (!this.divisions) return [];
      const sectionsData = this.divisions.section;
      const metadataEnd = this.divisions.metadata[0].endIndex;
      const firstSectionComponents = this.components.slice(metadataEnd + 1, sectionsData[0].startIndex);
      const sections = [
        {title: false, components: firstSectionComponents},
        ...sectionsData.map(section => ({
          components: this.components.slice(section.startIndex + 1, section.endIndex),
          title: section.startString.split(":")[1].replace("\n", "").trim()
        }))
      ];
      return sections;
    },
    metadata() {
      if (!this.divisions) return;
      const sectionData = this.divisions.metadata[0];
      const components = this.components.slice(sectionData.startIndex + 1, sectionData.endIndex);
      const flattenChildren = componentData => (
        componentData.children.map(child => {
          if (typeof child == "string")
            return child;
          if ("children" in child) {
            return flattenChildren(child)
          }
          return "";
        }).join("")
      )
      const lines = components
        .map(componentData => flattenChildren(componentData))
        .map(line => line.replace("\n", ""));
      const entries = lines
        .map(line => line.split(":"))
        .map(entry => [entry[0].toLowerCase().trim(), entry[1].trim()])
      return Object.fromEntries(entries);
    }
  }
}
</script>

<style scoped>

.flex {
  display: flex;
  flex-direction: row;
  background-color: #FFFFFF;
}

.chapter-content {
  width: 1440px;
}

.margin {
  height: 100%;
  flex-grow: 1;
}

</style>
