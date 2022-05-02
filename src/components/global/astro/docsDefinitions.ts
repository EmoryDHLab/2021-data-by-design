import type { ComponentDef } from "google-docs-components";
const docsDefinitions: Array<ComponentDef> = [
  {
    matchName: "TestAstro",
    componentName: "TestAstro",
    slots: ["default"],
    props: {
      validProp: {
        type: "string",
      },
    },
  },
];

export default docsDefinitions;
