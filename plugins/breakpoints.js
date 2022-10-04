import config from "~/tailwind.config";

export default defineNuxtPlugin(() => {
  const { theme } = config;
  const screens = Object.entries(theme.screens)
    .map(([key, value]) => ({
      name: key,
      min: parseInt(value, 10),
    }))
    .sort((a, b) => b.min - a.min);

  return {
    provide: {
      $breakpoint(windowWidth) {
        const widestReached = screens.find(
          (screen) => windowWidth > screen.min
        );
        if (widestReached) {
          return widestReached.name;
        }
        return undefined;
      },
      $breakpoints(windowWidth) {
        return screens
          .filter((screen) => windowWidth > screen.min)
          .map((screen) => screen.name);
      },
      $isMobile() {
        return this.$breakpoints && this.$breakpoints.length <= 1;
      },
    },
  };
});
