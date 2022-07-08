<template>
  <div class="w-full h-9 flex flex-row items-center bg-theme">
    <div class="font-sans mx-4" v-if="title">
      {{ title }}
    </div>
    <div class="flex flex-row mt-1 space-x-4">
      <div
        v-for="(section, i) in sections"
        class="w-2 h-2 rounded-full bg-white cursor-pointer"
        @click="(e) => setSection({ sectionNumber: i })"
        :class="{ 'opacity-50 hover:opacity-100': i != currentSection }"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  props: {
    title: String,
  },
  computed: {
    ...mapState("currentChapter", ["currentSection", "sections"]),
  },
  methods: {
    ...mapMutations("currentChapter", ["setSection"]),
  },
};
</script>
