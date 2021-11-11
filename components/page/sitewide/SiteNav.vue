<template>
  <div class="w-full min-h-full bg-black flex justify-evenly">
    <div class="font-william text-white text-2xl">
      <NuxtLink to="/">Data by Design</NuxtLink>
    </div>
    <div class="flex justify-between w-2/5">
      <div
        class="font-william text-white text-xl"
        v-for="page in pages"
        @mouseover="onHover(page)"
        @mouseleave="onLeave(page)"
      >
        <NuxtLink :to="page.to">{{ page.name }}</NuxtLink>
        <div
          v-if="page.children"
          class="absolute flex-column"
          :class="{
            visible: hoverPage == page.name,
            invisible: hoverPage != page.name
          }"
        >
          <div
            v-for="child in page.children"
            class="bg-black text-lg  hover:bg-royalblue border border-white pl-1 pr-3"
          >
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
      this.hoverPage = page.name;
    },
    onLeave(page) {
      this.hoverPage = "";
    }
  }
};
</script>
