import { init } from "./shareon";

// TODO: update README
const s = document.currentScript;
if (s && s.hasAttribute("init")) {
  init();
}

export { init } from "./shareon";
