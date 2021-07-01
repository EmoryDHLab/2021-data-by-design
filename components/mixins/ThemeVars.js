export default {
  inject: ['theme'],
  mounted () {
    const styleString = Object.entries(this.theme)
      .map( ([propName, propValue]) => `--${propName}: ${propValue}`)
      .join("; ");

    this.$el.style = styleString;
  },
}
