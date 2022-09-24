function processTextStyle(textStyle) {
    const css = {};
    const convertColor = (color) => {
        if (!color.color) {
            //"Fully transparent color". Not sure how this happens.
            return "rgba(255,255,255,0)";
        }
        const rgb = color.color.rgbColor;
        const toPercentage = (color) => {
            const decimal = color || 0;
            return decimal * 100 + '%';
        };
        return `rgb(${toPercentage(rgb.red)}, ${toPercentage(rgb.green)}, ${toPercentage(rgb.blue)})`;
    };
    if (textStyle.foregroundColor) {
        css.color = convertColor(textStyle.foregroundColor);
    }
    if (textStyle.backgroundColor) {
        css["background-color"] = convertColor(textStyle.backgroundColor);
    }
    if (textStyle.bold) {
        css["font-weight"] = "bold";
    }
    if (textStyle.italic) {
        css["font-style"] = "italic";
    }
    if (textStyle.strikethrough) {
        css["text-decoration"] = "line-through";
    }
    if (textStyle.underline) {
        css["text-decoration"] = "underline";
    }
    if (textStyle.weightedFontFamily) {
        const { fontFamily, weight } = textStyle.weightedFontFamily;
        if (fontFamily) {
            css["font-family"] = fontFamily;
            if (weight)
                css["font-weight"] = String(weight);
        }
    }
    if (textStyle.fontSize) {
        css["font-size"] = textStyle.fontSize.magnitude + textStyle.fontSize.unit;
    }
    return css;
}
export const textRunMatcher = {
    matchProperty: "textRun",
    resolve(object, parseChildren) {
        const text = object;
        if (!text.content)
            return false;
        const textStyle = text.textStyle;
        let html = text.content;
        if (!textStyle)
            return html;
        // Object.keys(htmlReplacements).forEach(key => {
        //   if (key in textStyle) {
        //     // @ts-ignore
        //     html = htmlReplacements[key](html, textStyle[key]);
        //   }
        // })
        const css = processTextStyle(textStyle);
        const hasCSS = Object.keys(css).length;
        if (!hasCSS)
            return html;
        return Object.assign({ type: "styledText", text: html, css }, (textStyle.link && { link: textStyle.link.url }));
    }
};
//# sourceMappingURL=text.js.map