import { checkNavigation } from "/src/lib/index.js";

export function CustomSwiper(className) {
  try {
    const swiperContainer = document.querySelector(
      `${className} .swiper-container`
    );
    if (!swiperContainer) {
      console.warn(`Swiper container not found for className: ${className}`);
      return null;
    }

    const swiper = new Swiper(swiperContainer, {
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
  } catch (error) {
    console.error(
      `Failed to initialize Swiper for className: ${className}`,
      error
    );
    return null;
  }
}
