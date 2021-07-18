<template>
  <div class="section-root">
    <GridLayout v-if="title">
      <div class="chapter-title col-span-8 col-start-2 2xl:col-start-4 my-28 h-16 relative">
        <div class="background">
        </div>
        <div class="title-text font-william font-bold text-4xl flex justify-center items-center">
          <span>{{title}}</span>
        </div>
      </div>
    </GridLayout>

    <template v-for="group in renderGroups">
      <GridLayout v-if=" 'components' in group">
        <Component class="middle-subgrid" :is="docsRenderer" :docContent="group.components"></Component>
        <!--        <DocsRenderer class="span-middle-8" :content="group.components"></DocsRenderer>-->
      </GridLayout>
      <LeaderFollowPair v-else :left-content="group.left" :right-content="group.right || []">
      </LeaderFollowPair>
    </template>
  </div>
</template>

<script>
import { findSections } from "google-docs-components"

export default {
  props: {
    title: [String, Boolean],
    components: {
      type: Array,
      required: true
    }
  },
  inject: ["docsRenderer"],
  computed: {
    divisions () {
      const def = {
        name: "align",
        start: /^-(left|right)/i,
        end: "-",
        endByNextStart: true,
        endByContentEnd: true
      }
      const sectionData = findSections(this.components, [def]).align;
      return sectionData;
    },
    componentGroups () {
      const groups = [];
      let lastEndIndex = -1;

      this.divisions.forEach( ({startString, startIndex, endIndex}) => {

        if (startIndex - lastEndIndex > 1) {
          groups.push({
            components: this.components.slice(lastEndIndex + 1, startIndex)
          })
        }

        const [alignment, pairingId] = startString
          .replace("\n", "")
          .replace(/-/g, "")
          .split(":")
          .map(s => s.trim().toLowerCase() );

        groups.push ({
          alignment,
          pairingId,
          components: this.components.slice(startIndex + 1, endIndex)
        })

        lastEndIndex = endIndex;
      });

      if (this.components.length - lastEndIndex > 0) {
        groups.push({
          components: this.components.slice(lastEndIndex + 1, this.components.length)
        });
      }

      return groups;
    },
    renderGroups () {
      const idIndexMap = {}
      return this.componentGroups.reduce ( (acc, curr, i, source) => {
        if (curr.alignment) {
          if (curr.pairingId in idIndexMap) {
            const pair = acc[idIndexMap[curr.pairingId]];
            if (curr.alignment in pair) {
              console.warning(`There are two groups labeled ${curr.alignment}:${curr.pairingId}. Joining them`)
              pair[curr.alignment].push(...curr.components);
              return acc;
            }
            pair[curr.alignment] = [...curr.components];
            return acc;
          }
          idIndexMap[curr.pairingId] = acc.length;
          acc.push({[curr.alignment]: [...curr.components]});
          return acc;
        }
        acc.push({components: [...curr.components]});
        return acc;
      }, []);
    }
  }
}
</script>

<style>

  .middle-subgrid {
    display: grid;
    grid-column: 1 / -1;
    grid: inherit;
  }

  .middle-subgrid > * {
    @apply col-span-8 col-start-2 2xl:col-start-4
  }

  /*Splitting the chapter title into two divs allows us to set an opacity on just the background*/

  .chapter-title > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .chapter-title .background {
    background-color: var(--primaryColor);
    opacity: 50%;
  }

</style>
