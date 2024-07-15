import "/src/styles/style.scss";
import { Header } from "/src/component/header/header.js";
import { Footer } from "/src/component/footer/footer.js";
import { getNode, addClass, removeClass } from "./src/lib/index.js";

const defineElement = () => {
  customElements.define("c-header", Header);
  customElements.define("c-footer", Footer);
};

defineElement();
