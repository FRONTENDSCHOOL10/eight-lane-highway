import { addClass, getNode, toggleClass } from "../../lib";

const foodTypeNav = getNode(".food-type__container");

// 버튼 클릭시 아코디언 오픈
function toggleHandler(e) {
  const target = e.target;
  const toggleButton = target.closest(".food-type__button");
  if (!toggleButton) return;
  const accordion = toggleButton.closest(".food-type__item");
  toggleClass(accordion, "is__show");
}
foodTypeNav.addEventListener("click", toggleHandler);
