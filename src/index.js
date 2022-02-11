import { init } from "./shareon";

const s = document.currentScript;
if (s && s.hasAttribute("init")) {
  init();
}

export { init } from "./shareon";
