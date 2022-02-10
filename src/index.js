import initializeShareon from "./shareon";
import "./style.css";

// TODO: update README
const s = document.currentScript;
if (s && s.hasAttribute("init")) {
  initializeShareon();
}

export default initializeShareon;
