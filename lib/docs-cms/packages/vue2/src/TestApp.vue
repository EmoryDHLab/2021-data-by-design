<template>
  <div id="app">
    <Renderer
      class="pass-through"
      rootElement="div"
      :ignoreCss="[]"
      :content="doc.body"
      :components="registeredComponents"
      :element-classes="{ p: [{ hi: true }, 'there'] }"
    >
      <template v-slot:DevSlot1>
        I'm a slot
        <p>A second element</p>
      </template>
    </Renderer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import doc from "../../sandbox/components.json";
import OneSlot from "./components/OneSlot.vue";
import MyComponent from "./components/MyComponent.vue";
import Renderer from "@/components/Renderer";

export default Vue.extend({
  name: "App",
  components: {
    Renderer,
  },
  data: () => ({
    doc,
    registeredComponents: {
      OneSlot,
      MyComponent,
    },
  }),
});
</script>

<style scoped>
.pass-through >>> .hi {
  font-family: sans-serif;
}
.pass-through >>> .there {
  font-size: 16pt;
}
</style>
