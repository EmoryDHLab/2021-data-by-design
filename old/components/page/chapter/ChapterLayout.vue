<template>
  <div class="chapter-root bg-black" :style="themeVars">
    <template v-if="metadata">
      <MobileTitleNav v-if="$isMobile" :title="metadata.title"></MobileTitleNav>
      <ChapterTitle
        v-else
        :title="metadata.title"
        :subtitle="metadata.subtitle"
      ></ChapterTitle>
    </template>
    <ChapterNav></ChapterNav>
    <div v-if="docsComponents.loaded" class="chapter-flex flex bg-offwhite">
      <div class="h-full flex-grow"></div>
      <ChapterContent :chapter-sections="chapterSections" />
      <div class="h-full flex-grow"></div>
    </div>
    <ChapterFooter v-if="!$isMobile"> </ChapterFooter>
    <SiteFooter v-if="!$isMobile"></SiteFooter>
  </div>
</template>

<script>
import { componentsFromDoc, findSections } from "google-docs-components";

import ChapterTitle from "./nav/ChapterTitle.vue";
import ChapterFooter from "./nav/ChapterFooter.vue";
import ChapterNav from "./nav/ChapterNav.vue";
import ChapterContent from "./content/ChapterContent";
import MobileTitleNav from "./nav/MobileTitleNav";
import SiteFooter from "../sitewide/SiteFooter";

import {
  globalDefinitions,
  chapterDefinitions,
  chapterComponents,
} from "@/components/docs-renderer/componentImports";

export default {
  props: {
    docData: {
      type: Object,
      required: true,
    },
    config: {
      type: Object,
    },
  },
  components: {
    ChapterContent,
    ChapterTitle,
    MobileTitleNav,
    ChapterNav,
    ChapterFooter,
    SiteFooter,
  },
  provide() {
    return {
      theme: this.theme,
      docsRenderer: this.docsRendererComponent,
      docsComponents: this.docsComponents,
    };
  },
  data() {
    return {
      mounted: false,
      docsComponents: {
        loaded: false,
        definitions: [],
        components: {},
      },
    };
  },
  created() {
    const loadDefinitions = chapterDefinitions(this.config.id).then(
      (definitions) => (this.docsComponents.definitions = definitions)
    );
    const loadComponents = chapterComponents(this.config.id).then(
      (components) => (this.docsComponents.components = components)
    );
    Promise.all([loadDefinitions, loadComponents]).then(() => {
      this.docsComponents.loaded = true;
    });
  },
  computed: {
    docsRendererComponent() {
      if (this.config.id) {
        //https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components
        //Loads the correct slots component from the chapter-slots folder. That component
        //handles the doc rendering, injecting the specified slots into the docs renderer.
        return () => import("@/components/chapter-slots/" + this.config.id);
      }
    },
    theme() {
      return this.config.theme;
    },
    themeVars() {
      if (!this.theme) return {};
      return Object.fromEntries(
        Object.entries(this.theme).map(([propName, propValue]) => [
          `--${propName}`,
          propValue,
        ])
      );
    },
    components() {
      if (this.docsComponents.loaded) {
        const componentDefinitions = [
          ...globalDefinitions,
          ...this.docsComponents.definitions,
        ];
        const components = componentsFromDoc(
          {
            components: componentDefinitions,
            classProp: "class",
          },
          this.docData
        ).body;
        return components;
      }
    },
    divisions() {
      if (this.components) {
        const metadataDef = {
          name: "metadata",
          start: "Metadata",
          end: "End Metadata",
        };

        const sectionDef = {
          name: "section",
          start: "Section",
          endByNextStart: true,
          endByContentEnd: true,
        };

        const sectionData = findSections(this.components, [
          sectionDef,
          metadataDef,
        ]);
        return sectionData;
      }
    },
    chapterSections() {
      if (!this.divisions) return [];
      const sectionsData = this.divisions.section;
      const metadataEnd = this.divisions.metadata[0].endIndex;
      const firstSectionComponents = this.components.slice(
        metadataEnd + 1,
        sectionsData[0]?.startIndex || this.components.length
      );
      const sections = [
        { title: false, components: firstSectionComponents },
        ...sectionsData.map((section) => ({
          components: this.components.slice(
            section.startIndex + 1,
            section.endIndex
          ),
          title: section.startString.split(":")[1].replace("\n", "").trim(),
        })),
      ];
      return sections;
    },
    metadata() {
      if (!this.divisions) return;
      const sectionData = this.divisions.metadata[0];
      const components = this.components.slice(
        sectionData.startIndex + 1,
        sectionData.endIndex
      );
      const flattenChildren = (componentData) =>
        componentData.children
          .map((child) => {
            if (typeof child == "string") return child;
            if ("children" in child) {
              return flattenChildren(child);
            }
            return "";
          })
          .join("");
      const lines = components
        .map((componentData) => flattenChildren(componentData))
        .map((line) => line.replace("\n", ""));
      const entries = lines
        .map((line) => line.split(":"))
        .map((entry) => [entry[0].toLowerCase().trim(), entry[1].trim()]);
      return Object.fromEntries(entries);
    },
  },
};
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
.chapter-root .bg-theme {
  background-color: var(--primaryColor);
}

.chapter-root .text-theme {
  color: var(--primaryColorText);
}
</style>
