<template>
  <div class="chapter-root bg-black" :style="themeVars">
    <ChapterTitle :title="metadata.title" :subtitle="metadata.subtitle">
    </ChapterTitle>
    <ChapterNav></ChapterNav>
    <div v-if="mounted" class="chapter-flex flex bg-offwhite">
      <div class="h-full flex-grow">
      </div>
      <div class="chapter-content my-52 max-w-screen-2xl">
        {{$breakpoint}}
        <template v-for="section in chapterSections">
          <ChapterSection :title="section.title" :components="section.components"></ChapterSection>
        </template>
      </div>
      <div class="h-full flex-grow">
      </div>
    </div>
    <ChapterFooter>
    </ChapterFooter>
  </div>
</template>

<script>
import {componentsFromDoc, findSections} from "google-docs-components"
import GridLayout from "~/components/page-layout/GridLayout";
import ChapterSection from "~/components/page-layout/ChapterSection";
import globalDocsDefs from "@/components/global/docs-inclusions/docsDefs"
import ThemeVars from "@/components/mixins/ThemeVars";
import ChapterTitle from "@/components/page-layout/ChapterTitle";

export default {
  props: {
    docData: {
      type: Object,
      required: true
    },
    config: {
      type: Object
    }
  },
  components: {ChapterSection, ChapterTitle},
  provide () {
    return {
      theme: this.theme,
      docsRenderer: this.docsRendererComponent,
    }
  },
  data () {
    return {
      mounted: false
    }
  },
  mounted () {
    this.mounted = true;
  },
  computed: {
    docsRendererComponent () {
      if (this.config.slotsFile) {
        //https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components
        //Loads the correct slots component from the chapter-slots folder. That component
        //handles the doc rendering, injecting the specified slots into the docs renderer.
        return () => import("../chapter-slots/" + this.config.slotsFile)
      }
    },
    theme () {
      return this.config.theme
    },
    themeVars () {
      if (!this.theme) return {}
      return Object.fromEntries(
        Object.entries(this.theme)
        .map(
          ([propName, propValue]) => ([`--${propName}`, propValue])
        )
      )
    },
    components() {
      return componentsFromDoc({
        components: globalDocsDefs,
        classProp: "class"
      }, this.docData).body;
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

<style>

/*
TODO: Delete safely
 */
.chapter-root {
  --col-width: 104px;
  --num-col: 14;
  --halfway-line: 8;
  --vertical-gap-small: 72px;
  --vertical-gap-medium: 120px;
  --vertical-gap-large: 200px;
}


.chapter-content p {
  font-family: "neue-haas-unica";
  font-size: 20px;
}

.chapter-content p:last-child {
  margin-bottom: 0px;
}

.chapter-content p:first-child {
  margin-top: 0px;
}
</style>
