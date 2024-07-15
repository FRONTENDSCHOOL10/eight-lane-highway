import "/src/styles/style.scss";
import { Header } from "/src/component/header/header.js";
import { Footer } from "/src/component/footer/footer.js";
import { getNode, addClass, removeClass } from "./src/lib/index.js";

// const body = document.querySelector("body");

const defineElement = () => {
  customElements.define("c-header", Header);
  customElements.define("c-footer", Footer);
};

defineElement();

// const cHeader = document.createElement("c-header");
// const cFooter = document.createElement("c-footer");

const toTop = getNode(".to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    addClass(toTop, "is__show");
  } else {
    removeClass(toTop, "is__show");
  }
});
toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
