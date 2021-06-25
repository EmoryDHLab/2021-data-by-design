<template>
  <GridLayout>

  </GridLayout>
</template>

<script>
import GridLayout from "~/components/page-layout/GridLayout";
import TwoColumnDocsRenderer from "~/components/page-layout/TwoColumnDocsRenderer";
import { findSections } from "google-docs-components"

export default {
  props: {
    title: [String, Boolean],
    components: {
      type: Array,
      required: true
    }
  },
  components: {GridLayout},
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
    }
  }
}
</script>

<style scoped>

</style>
