import Vue from "vue"
// import { theme } from "~tailwind.config"

export default (options, inject) => {

  return false;
  const screens = Object.entries(theme.screens)
    .map( ([key, value]) => ({
        name: key,
        min: parseInt(value)
      })
    ).sort((a, b) => (b.min - a.min));

  const state = Vue.observable({
    windowWidth: undefined
  })

  Vue.mixin({
    mounted () {
      state.windowWidth = window.innerWidth;
    },
    computed: {
      $breakpoint () {
        const widestReached = screens.find(screen => state.windowWidth > screen.min);
        if (widestReached) {
          return widestReached.name;
        }
      },
      $breakpoints () {
        return screens.filter(screen => state.windowWidth > screen.min);
      },
      $isMobile() {
        return this.$breakpoints && this.$breakpoints.length <= 1;
      }
    }
  })

  if (process.client) {
    window.onresize = () => {
      state.windowWidth = window.innerWidth;
    }
  }

}
