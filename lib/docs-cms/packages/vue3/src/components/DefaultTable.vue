<template>
  <div class="doc-table-root" :style="rootStyles">
    <div
      class="doc-table-cell"
      v-for="(_, i) in tableData.cells"
      :key="_"
      :style="cellStyles(i)"
    >
      <slot :name="`cell:${i}`"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultTable",
  props: {
    tableData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    numRows() {
      return this.tableData.rows.length;
    },
    numColumns() {
      return this.tableData.rows[0].length;
    },
    rootStyles() {
      const gridTemplateAreas = this.tableData.rows
        .map(
          (row) => `"${row.map((i) => (i == -1 ? "." : `area${i}`)).join(" ")}"`
        )
        .join(" ");
      return {
        display: "grid",
        gridTemplateAreas,
      };
    },
  },
  methods: {
    cellStyles(index) {
      return {
        gridArea: `area${index}`,
      };
    },
  },
};
</script>

