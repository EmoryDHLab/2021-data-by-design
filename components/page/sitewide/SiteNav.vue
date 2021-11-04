<template>
  <div class="w-full bg-black flex justify-evenly">
    <div class="font-william text-white text-2xl">
      Data by Design
    </div>
    <div class="flex justify-between w-2/5">
      <div
        class="font-william text-white text-xl"
        v-for="page in pages"
        @mouseover="onHover(page)"
        @mouseout="hoverPage = ''"
      >
        <NuxtLink :to="page.to">{{ page.name }}</NuxtLink>
        <div v-if="page.children">
          <div v-for="child in page.children">
            <NuxtLink :to="child.to">{{ child.name }}</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chaptersConfig from "@/chapters-config";

const chaptersChildren = Object.values(chaptersConfig).map(
  ({ navName, id }) => ({
    to: `/chapters/${id}/`,
    name: navName
  })
);

export default {
  data() {
    return {
      hoverPage: "",
      pages: [
        {
          name: "Home",
          to: "/"
        },
        {
          name: "Chapters",
          to: "/",
          children: chaptersChildren
        },
        {
          name: "About this Site",
          to: "/sandbox"
        }
      ]
    };
  },
  methods: {
    onHover(page) {
      this.hoverPage = page.
      console.log(page);
    }
  }
};
</script>
