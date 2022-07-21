// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from "vue";
import { theme } from "~/tailwind.config";

export default () => {
  const screens = Object.entries(theme.screens)
    .map(([key, value]) => ({
      name: key,
      min: parseInt(value, 10),
    }))
    .sort((a, b) => b.min - a.min);

  const state = Vue.observable({
    windowWidth: undefined,
  });

  Vue.mixin({
    mounted() {
      state.windowWidth = window.innerWidth;
    },
    computed: {
      $breakpoint() {
        const widestReached = screens.find(
          (screen) => state.windowWidth > screen.min
        );
        if (widestReached) {
          return widestReached.name;
        }
        return undefined;
      },
      $breakpoints() {
        return screens
          .filter((screen) => state.windowWidth > screen.min)
          .map((screen) => screen.name);
      },
      $isMobile() {
        return this.$breakpoints && this.$breakpoints.length <= 1;
      },
    },
  });

  if (process.client) {
    window.onresize = () => {
      state.windowWidth = window.innerWidth;
    };
  }
};
