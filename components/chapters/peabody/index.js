import { contextModules } from "../../docs-renderer/componentImports";

const modules = contextModules(require.context("./", true, /\.vue$/));

export default modules;
