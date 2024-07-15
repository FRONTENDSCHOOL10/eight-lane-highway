import { toggleClass } from "../../lib";

const titles = document.querySelectorAll(".accodian__menu__main__items__title");

titles.forEach((item) => {
  item.addEventListener("click", toggleTitle);
});

function toggleTitle(e) {
  const titleElement = e.currentTarget;

  const subMenu = titleElement.nextElementSibling;

  const svgElement = titleElement.querySelector("img");

  if (!subMenu) return;

  toggleClass(subMenu, "is__clicked");
  svgElement.classList.toggle("rotate");
}
