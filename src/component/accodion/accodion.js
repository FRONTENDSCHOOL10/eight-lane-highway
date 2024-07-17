import { toggleClass } from "/src/lib";

const titles = document.querySelectorAll(".accodian__menu__main__items__title");
const itemLists = document.querySelectorAll(".accodian__sub__items__info");

titles.forEach((item) => {
  item.addEventListener("click", toggleTitle);
});

itemLists.forEach((item) => {
  item.addEventListener("click", handleClickedItems);
});

export function toggleTitle(e) {
  const titleElement = e.currentTarget;

  const subMenu = titleElement.nextElementSibling;

  const svgElement = titleElement.querySelector("img");

  if (!subMenu) return;

  toggleClass(subMenu, "accodion_is__clicked");
  svgElement.classList.toggle("rotate");
}

export function handleClickedItems(e) {
  const target = e.target.closest("input");

  if (!target) return;

  const isChecked = target.checked;
  console.log(isChecked);

  const labelElement = target.nextElementSibling.textContent;
  console.log(labelElement);

  console.log(target);
}
