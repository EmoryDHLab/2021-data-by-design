import { contextModules } from "../../docs-renderer/componentImports";

console.log("peabody index ")
const modules = contextModules(require.context("./", true, /\.vue$/));

export default modules;
// export modules