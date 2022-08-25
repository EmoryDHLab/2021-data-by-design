// The FootnoteReference component is special;
// if the DocsRenderer sees "FootnoteReference" as an entry in the components
// object, it will use that as the footnote reference component;
// it isn't referenced by the Google Doc itself,
// so it doesn't need a docsDefinition.
// import FootnoteReference from "~/components/global/docs-inclusions/FootnoteReference";

export function contextModules(context) {
  return context
    .keys()
    .map((key) => context(key))
    .filter((module) => "docsDefinition" in module);
}

async function chapterModules(chapterId) {
  try {
    const dynamicImport = await import(`~/components/chapters/${chapterId}`);
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

// const globalModules = contextModules(
//   require.context("@/components/global/docs-inclusions", true, /\.vue$/)
// );
//
// export const globalDefinitions = definitions(globalModules);
// export const globalComponents = {
//   FootnoteReference,
//   ...components(globalModules),
// };
