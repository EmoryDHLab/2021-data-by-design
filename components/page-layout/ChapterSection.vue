<template>
  <div>
    <template v-for="group in renderGroups">
      <GridLayout v-if=" 'components' in group">
        <DocsRenderer class="span-middle-10" :content="group.components"></DocsRenderer>
      </GridLayout>
      <LeaderFollowPair v-else :left-content="group.left" :right-content="group.right">
      </LeaderFollowPair>
    </template>
  </div>
</template>

<script>
import GridLayout from "~/components/page-layout/GridLayout";
import LeaderFollowPair from "~/components/page-layout/LeaderFollowPair";
import DocsRenderer from "docs-renderer-vue2"
import { findSections } from "google-docs-components"

export default {
  props: {
    title: [String, Boolean],
    components: {
      type: Array,
      required: true
    }
  },
  components: {GridLayout, DocsRenderer, LeaderFollowPair},
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
          debugger;
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

<style scoped>
  .span-middle-10 {
    grid-column-start: 2;
    grid-column-end: 12
  }
</style>
