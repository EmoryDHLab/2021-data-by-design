// No need to use this anymore; theme vars are brought into chapter scope by ChapterLayout
export default {
  inject: {
    theme: {
      default: false,
    },
  },
  mounted() {
    if (this.theme) {
      const styleString = Object.entries(this.theme)
        .map(([propName, propValue]) => `--${propName}: ${propValue}`)
        .join("; ");

      this.$el.style = styleString;
    }
  },
};
