// import { findSections } from "google-docs-components";
//
// export function renderGroups(componentArray) {
//   const def = {
//     name: "align",
//     start: /^-(left|right)/i,
//     end: "-",
//     endByNextStart: true,
//     endByContentEnd: true,
//   };
//
//   const divisions = findSections(componentArray, [def]).align;
//
//   const componentGroups = [];
//   let lastEndIndex = -1;
//
//   divisions.forEach(({ startString, startIndex, endIndex }) => {
//     if (startIndex - lastEndIndex > 1) {
//       componentGroups.push({
//         components: componentArray.slice(lastEndIndex + 1, startIndex),
//       });
//     }
//
//     const [alignment, pairingId] = startString
//       .replace("\n", "")
//       .replace(/-/g, "")
//       .split(":")
//       .map((s) => s.trim().toLowerCase());
//
//     componentGroups.push({
//       alignment,
//       pairingId,
//       components: componentArray.slice(startIndex + 1, endIndex),
//     });
//
//     lastEndIndex = endIndex;
//   });
//
//   if (componentArray.length - lastEndIndex > 0) {
//     componentGroups.push({
//       components: componentArray.slice(lastEndIndex + 1, componentArray.length),
//     });
//   }
//
//   const idIndexMap = {};
//   return componentGroups.reduce((acc, curr) => {
//     if (curr.alignment) {
//       if (curr.pairingId in idIndexMap) {
//         const pair = acc[idIndexMap[curr.pairingId]];
//         if (curr.alignment in pair) {
//           console.warn(
//             `There are two groups labeled ${curr.alignment}:${curr.pairingId}. Joining them`
//           );
//           pair[curr.alignment].push(...curr.components);
//           return acc;
//         }
//         pair[curr.alignment] = [...curr.components];
//         return acc;
//       }
//       idIndexMap[curr.pairingId] = acc.length;
//       acc.push({ [curr.alignment]: [...curr.components] });
//       return acc;
//     }
//     acc.push({ components: [...curr.components] });
//     return acc;
//   }, []);
// }
