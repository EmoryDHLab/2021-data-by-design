import type { ComponentDef } from "google-docs-components";
const docsDefinitions: Array<ComponentDef> = [
  {
    matchName: "TestAstro",
    componentName: "TestAstro",
    slots: ["default", "name"],
    props: {
      validProp: {
        type: "string",
      },
    },
  },
  {
    matchName: ["Captioned"],
    componentName: "Captioned",
    props: {
      width: {
        type: "string",
      },
    },
    slots: ["default", "caption"],
  },
  {
    matchName: ["Image"],
    componentName: "LocalImage",
    props: {
      path: {
        type: "string",
        required: true,
      },
      width: {
        type: "string",
      },
    },
  },
];

export default docsDefinitions;
