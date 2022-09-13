// Checks the "root" elements for text denoting a section
export default function findSections(contentArray, sectionDefs, allEnd) {
    const sections = Object.fromEntries(sectionDefs.map((def) => [def.name, []]));
    const sectionStarts = {};
    let lastStart;
    const endSection = (name, index) => {
        const startArr = sectionStarts[name];
        if (!(startArr === null || startArr === void 0 ? void 0 : startArr.length))
            return false;
        const { startIndex, startString } = startArr.pop();
        sections[name].push({
            startIndex,
            startString,
            endIndex: index,
        });
        lastStart = false;
        return true;
    };
    contentArray.forEach((rootContent, index) => {
        let contentString;
        if (typeof rootContent == "string") {
            contentString = rootContent;
        }
        else if ("element" in rootContent && rootContent.element == "p") {
            contentString = rootContent.children.reduce((acc, child) => {
                if (typeof child == "string") {
                    return acc + child;
                }
                if ("element" in child &&
                    (child.element == "span" || child.element == "a")) {
                    return acc + child.children.join();
                }
                return acc;
            }, "");
        }
        if (!contentString)
            return;
        const matches = (matcher) => {
            if (typeof matcher == "string") {
                const commonPortion = contentString.slice(0, matcher.length);
                if (commonPortion == matcher) {
                    return true;
                }
                return false;
            }
            return matcher.test(contentString);
        };
        for (const def of sectionDefs) {
            if (matches(def.start)) {
                lastStart = def.name;
                const startObj = { startString: contentString, startIndex: index };
                if (Array.isArray(sectionStarts[def.name])) {
                    if (def.endByNextStart) {
                        endSection(def.name, index);
                    }
                    sectionStarts[def.name].push(startObj);
                    break;
                }
                sectionStarts[def.name] = [startObj];
                break;
            }
            if (def.end && matches(def.end)) {
                if (endSection(def.name, index)) {
                    break;
                }
                continue;
            }
            if (allEnd && matches(allEnd) && lastStart) {
                endSection(lastStart, index);
                break;
            }
        }
    });
    sectionDefs.forEach((def) => {
        if (def.endByContentEnd) {
            endSection(def.name, contentArray.length);
        }
    });
    return sections;
}
//# sourceMappingURL=findSections.js.map