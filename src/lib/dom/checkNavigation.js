
import { getNode,addClass,removeClass } from "/src/lib/index";

export function checkNavigation(className, swiper) {
  const prev = getNode(`${className} .swiper-button-prev`);
  const next = getNode(`${className} .swiper-button-next`);

  if (swiper.isEnd) {
    addClass(next, "is__hide");
  } else {
    removeClass(next, "is__hide");
  }
  if (swiper.isBeginning) {
    addClass(prev, "is__hide");
  } else {
    removeClass(prev, "is__hide");
  }
}
