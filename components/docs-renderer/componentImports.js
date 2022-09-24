// The FootnoteReference component is special;
// if the DocsRenderer sees "FootnoteReference" as an entry in the components
// object, it will use that as the footnote reference component;
// it isn't referenced by the Google Doc itself,
// so it doesn't need a docsDefinition.
import * as Blockquote from "~/components/global/docs-inclusions/Blockquote";
import * as Captioned from "~/components/global/docs-inclusions/Captioned";
import FootnoteReference from "~/components/global/docs-inclusions/FootnoteReference";
import * as LocalImage from "~/components/global/docs-inclusions/LocalImage";
import * as Pullquote from "~/components/global/docs-inclusions/Pullquote";
import * as Scrollytell from "~/components/global/docs-inclusions/Scrollytell";

async function chapterModules(chapterId) {
  try {
    const dynamicImport = await import(
      `~/components/chapters/${chapterId}/index.ts`
    );
    return dynamicImport.default;
  } catch (e) {
    return [];
  }
}

function definitions(modules) {
  return modules.map((module) => module.docsDefinition);
}

function components(modules) {
  return Object.fromEntries(
    modules.map((module) => [
      module.docsDefinition.componentName,
      module.default,
    ])
  );
}

export async function chapterComponents(chapterId) {
  return components(await chapterModules(chapterId));
}

export async function chapterDefinitions(chapterId) {
  return definitions(await chapterModules(chapterId));
}

const globalModules = [
  Blockquote,
  Captioned,
  LocalImage,
  Pullquote,
  Scrollytell,
];

export const globalDefinitions = definitions(globalModules);
export const globalComponents = {
  FootnoteReference,
  ...components(globalModules),
};
