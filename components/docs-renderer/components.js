import FootnoteReference from "@/components/global/docs-inclusions/FootnoteReference"

function contextModules(context) {
  const modules = context.keys()
    .map(key => context(key))
    .filter(module => "docsDefinition" in module);
  return modules;
}

function definitions(modules) {
  return modules.map(module => module.docsDefinition);
} 

function components(modules) {
  return Object.fromEntries(modules.map(module => [module.docsDefinition.componentName, module.default]));
}

export function chapterDefinitions(chapterId) {

}

const globalModules = contextModules(require.context("@/components/global/docs-inclusions", true, /\.vue$/));

console.log("globalModules", globalModules);

export const globalDefinitions = definitions(globalModules);
export const globalComponents = {FootnoteReference, ...components(globalModules)};
console.log(globalDefinitions, globalComponents);