import initializeShareon from "./shareon";

// TODO: update README
const s = document.currentScript;
if (s && s.hasAttribute("init")) {
  initializeShareon();
}

export default initializeShareon;
