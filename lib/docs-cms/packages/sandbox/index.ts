

import testFileOutput from "./testFileOutput.json"
import config from "./docsconfig.json"

import { getDoc, parseDoc, document } from "google-docs-parser"
import { componentsFromDoc, findSections } from "google-docs-components";
import * as fs from "fs";

const docId = "1SmWpErSKPupCDuq-jeqmIQqRbnz0WhuLKsXmRXLYSvo";

console.log("https://docs.google.com/document/d/" + docId);
getDoc(config, docId).then(result => {
  fs.writeFile("rawdoc.json", JSON.stringify(result), console.log);
  const document = parseDoc(result);
  fs.writeFile("document.json", JSON.stringify(document), () => console.log);
  const components = componentsFromDoc({
    classProp: true,
    components: [
      {
        matchName: ["MyComponent", "My Component"],
        componentName: "MyComponent",
        props: {
          prop1: {
            type: "number",
            required: true
          },
          prop2: {
            type: "string",
            required: true
          }
        },
        slots: "any"
      },
      {
        matchName: ["OneSlot"],
        componentName: "OneSlot",
      }
    ]
  }, document);
  const sectionDefs = [
    {name: "section", start: "Section", endByNextStart: true, endByContentEnd: true},
    {name: "direction", start: /^(left|right)/, end: "-"}
  ];
  const sections = findSections(components.body, sectionDefs);
  console.log(sections);
  fs.writeFile("components.json", JSON.stringify(components), () => console.log);
})


