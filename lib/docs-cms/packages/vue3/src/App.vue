<script setup lang="ts">
import type { ContentData, ProcessedContent } from "google-docs-components";
import OneSlot from "./components/OneSlot.vue";
import MyComponent from "./components/MyComponent.vue";
import doc from "../../sandbox/components.json";
import Renderer from "./components/Renderer.vue";

const body = doc.body as ContentData[];

const registeredComponents = {
  OneSlot,
  MyComponent,
};
</script>

<template>
  <div>
    <div>hi there testing</div>
    <Renderer
      class="pass-through"
      rootElement="div"
      :ignoreCss="[]"
      :content="body"
      :components="registeredComponents"
      :element-classes="{ p: [{ hi: true }, 'there'] }"
    >
      <template v-slot:DevSlot1>
        I'm a slot
        <p>A second element</p>
        <MyComponent :prop1="1" :prop2="2"></MyComponent>
      </template>
    </Renderer>
  </div>
</template>

<style>
</style>
