import { toggleClass } from "../../lib";

const titles = document.querySelectorAll(".accodian__menu__main__items__title");
const itemLists = document.querySelectorAll(".accodian__sub__items__info");

titles.forEach((item) => {
  item.addEventListener("click", toggleTitle);
});

itemLists.forEach((item) => {
  item.addEventListener("click", handleClickedItems);
});

function toggleTitle(e) {
  const titleElement = e.currentTarget;

  const subMenu = titleElement.nextElementSibling;

  const svgElement = titleElement.querySelector("img");

  if (!subMenu) return;

  toggleClass(subMenu, "is__clicked");
  svgElement.classList.toggle("rotate");
}

function handleClickedItems(e) {
  const target = e.target.closest("input");

  if (!target) return;

  const isChecked = target.checked;
  console.log(isChecked);

  const labelElement = target.nextElementSibling;

  console.log(target);
  console.log(labelElement.textContent);
}
