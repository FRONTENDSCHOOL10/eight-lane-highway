import { checkNavigation } from "./checkNavigation";

export function CustomSwiper(className) {
  const swiper = new Swiper(`${className} .swiper-container`, {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 18,
    navigation: {
      nextEl: `${className} .swiper-button-next`,
      prevEl: `${className} .swiper-button-prev`,
    },
    on: {
      init: function () {
        checkNavigation(className, this);
      },
      slideChange: function () {
        checkNavigation(className, this);
      },
      update: function () {
        checkNavigation(className, this);
      },
    },
  });

  return swiper;
}
