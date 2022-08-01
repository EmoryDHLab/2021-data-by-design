<template>
  <div class="w-full bg-black flex justify-evenly pb-2 pt-2">
    <div class="font-william text-white text-2xl">
      <NuxtLink to="/">Data by Design</NuxtLink>
    </div>
    <div class="flex justify-between w-2/5">
      <div
        class="font-sans text-white text-xl"
        v-for="page in pages"
        @mouseover="onHover(page)"
        @mouseleave="onLeave()"
      >
        <div v-if="page.to"><NuxtLink :to="page.to">{{ page.name }}</NuxtLink></div>
        <div v-else>{{ page.name }}</div>
        <div
          v-if="page.children"
          class="absolute z-20 top-10 border divide-y"
          :class="{
            visible: hoverPage === page.name,
            invisible: hoverPage !== page.name,
          }"
        >
          <div
            v-for="child in page.children"
            class="bg-black text-lg hover:bg-playfairPrimary pl-2 pr-3 pb-0.5 pt-0.5"
          >
            <NuxtLink :to="child.to">{{ child.name }}</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chaptersConfig from "@/chaptersConfig";

const chaptersChildren = Object.values(chaptersConfig).map(
  ({ navName, id }) => ({
    to: `/chapters/${id}/`,
    name: navName,
  })
);

export default {
  data() {
    return {
      hoverPage: "",
      pages: [
        {
          name: "Home",
          to: "/",
        },
        {
          name: "Chapters",
          children: chaptersChildren,
        },
        {
          name: "About",
          to: "/sandbox",
        },
      ],
    };
  },
  methods: {
    onHover(page) {
      this.hoverPage = page.name;
    },
    onLeave() {
      this.hoverPage = "";
    },
  },
};
</script>
