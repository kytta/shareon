import initializeShareon from "./shareon";
import "./shareon.css";

// TODO: update README
const s = document.currentScript;
if (s && s.hasAttribute("init")) {
  initializeShareon();
}

export default initializeShareon;
