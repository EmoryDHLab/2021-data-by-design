import { defineConfig } from "astro/config";
import nodejs from "@astrojs/node";
import vue from "@astrojs/vue";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // adapter: nodejs()
  integrations: [vue(), tailwind()],
});
