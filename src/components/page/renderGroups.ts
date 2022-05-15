import { findSections } from "google-docs-components";
import type { ContentData } from "google-docs-components";

export function chapterSections(componentArray: ContentData[]): {
  metadata: {};
  sections: Array<{ components: ContentData[]; title: string | boolean }>;
} {
  const metadataDef = {
    name: "metadata",
    start: "Metadata",
    end: "End Metadata",
  };

  const sectionDef = {
    name: "section",
    start: "Section",
    endByNextStart: true,
    endByContentEnd: true,
  };

  const findSectionsData = findSections(componentArray, [
    sectionDef,
    metadataDef,
  ]);

  console.log(findSectionsData);

  const sectionsData = findSectionsData.section;
  const metadataEnd = findSectionsData.metadata?.[0]?.endIndex || 0;

  const firstSectionComponents = componentArray.slice(
    metadataEnd + 1,
    sectionsData[0]?.startIndex || componentArray.length
  );

  const sections = [
    { title: false, components: firstSectionComponents },
    ...sectionsData.map((section) => ({
      components: componentArray.slice(
        section.startIndex + 1,
        section.endIndex
      ),
      title: section.startString.split(":")[1].replace("\n", "").trim(),
    })),
  ];

  if (!findSections?.metadata?.[0]) {
    return { metadata: {}, sections };
  }

  const { startIndex, endIndex } = findSectionsData.metadata[0];

  const components = componentArray.slice(startIndex + 1, endIndex);

  const flattenChildren = (componentData) =>
    componentData.children
      .map((child) => {
        if (typeof child == "string") return child;
        if ("children" in child) {
          return flattenChildren(child);
        }
        return "";
      })
      .join("");

  const lines = components
    .map((componentData) => flattenChildren(componentData))
    .map((line) => line.replace("\n", ""));
  const entries = lines
    .map((line) => line.split(":"))
    .map((entry) => [entry[0].toLowerCase().trim(), entry[1].trim()]);

  const metadata = Object.fromEntries(entries);

  return { sections, metadata };
}

export function leftRightGroups(componentArray) {
  const def = {
    name: "align",
    start: /^-(left|right)/i,
    end: "-",
    endByNextStart: true,
    endByContentEnd: true,
  };

  const divisions = findSections(componentArray, [def]).align;

  const componentGroups = [];
  let lastEndIndex = -1;

  divisions.forEach(({ startString, startIndex, endIndex }) => {
    if (startIndex - lastEndIndex > 1) {
      componentGroups.push({
        components: componentArray.slice(lastEndIndex + 1, startIndex),
      });
    }

    const [alignment, pairingId] = startString
      .replace("\n", "")
      .replace(/-/g, "")
      .split(":")
      .map((s) => s.trim().toLowerCase());

    componentGroups.push({
      alignment,
      pairingId,
      components: componentArray.slice(startIndex + 1, endIndex),
    });

    lastEndIndex = endIndex;
  });

  if (componentArray.length - lastEndIndex > 0) {
    componentGroups.push({
      components: componentArray.slice(lastEndIndex + 1, componentArray.length),
    });
  }

  const idIndexMap = {};
  return componentGroups.reduce((acc, curr, i, source) => {
    if (curr.alignment) {
      if (curr.pairingId in idIndexMap) {
        const pair = acc[idIndexMap[curr.pairingId]];
        if (curr.alignment in pair) {
          console.log(
            `There are two groups labeled ${curr.alignment}:${curr.pairingId}. Joining them`
          );
          pair[curr.alignment].push(...curr.components);
          return acc;
        }
        pair[curr.alignment] = [...curr.components];
        return acc;
      }
      idIndexMap[curr.pairingId] = acc.length;
      acc.push({ [curr.alignment]: [...curr.components] });
      return acc;
    }
    acc.push({ components: [...curr.components] });
    return acc;
  }, []);
}
