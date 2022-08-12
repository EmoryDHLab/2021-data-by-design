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
    <div v-if="docsComponents.loaded" class="flex bg-offwhite">
      <ChapterContent :chapter-sections="chapterSections" />
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
  chapterComponents,
  chapterDefinitions,
  globalDefinitions,
} from "~/components/docs-renderer/componentImports";

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
      componentData: this.componentData,
    };
  },
  data() {
    return {
      mounted: false,
      componentData: {
        body: null,
        footnotes: null,
      },
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
      const componentDefinitions = [
        ...globalDefinitions,
        ...this.docsComponents.definitions,
      ];

      const componentData = componentsFromDoc(
        {
          components: componentDefinitions,
          classProp: "class",
        },
        this.docData
      );

      this.componentData.body = componentData.body;
      this.componentData.footnotes = componentData.footnotes;
    });
  },
  computed: {
    docsRendererComponent() {
      if (this.config.id) {
        // https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components
        // Loads the correct slots component from the chapter-slots folder. That component
        // handles the doc rendering, injecting the specified slots into the docs renderer.
        return () => import(`@/components/chapter-slots/${this.config.id}`);
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
    bodyComponents() {
      if (this.componentData) {
        return this.componentData.body;
      }
    },
    divisions() {
      if (this.bodyComponents) {
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

        return findSections(this.bodyComponents, [sectionDef, metadataDef]);
      }
    },
    chapterSections() {
      if (!this.divisions) return [];
      const sectionsData = this.divisions.section;
      const metadataEnd = this.divisions.metadata[0].endIndex;
      const firstSectionComponents = this.bodyComponents.slice(
        metadataEnd + 1,
        sectionsData[0]?.startIndex || this.bodyComponents.length
      );
      return [
        { title: false, components: firstSectionComponents },
        ...sectionsData.map((section) => ({
          components: this.bodyComponents.slice(
            section.startIndex + 1,
            section.endIndex
          ),
          title: section.startString.split(":")[1].replace("\n", "").trim(),
        })),
      ];
    },
    metadata() {
      if (!this.divisions) return;
      const sectionData = this.divisions.metadata[0];
      const components = this.bodyComponents.slice(
        sectionData.startIndex + 1,
        sectionData.endIndex
      );
      const flattenChildren = (componentData) =>
        componentData.children
          .map((child) => {
            if (typeof child === "string") return child;
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
