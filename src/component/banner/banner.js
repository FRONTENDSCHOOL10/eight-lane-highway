import { getNode, removeClass, addClass } from "/src/lib/index.js";

const swiper = new Swiper(".banner .swiper", {
  loop: true,
  autoplay: true,
  navigation: {
    prevEl: ".banner .swiper-button-prev",
    nextEl: ".banner .swiper-button-next",
  },
  pagination: {
    el: ".banner .swiper-pagination",
    type: "fraction",
  },
});

const swiperContainer = getNode(".banner");
const buttonContainer = getNode(".banner__button-container");

swiperContainer.addEventListener("mouseenter", () => {
  addClass(buttonContainer, "is__show");
});
swiperContainer.addEventListener("mouseleave", () => {
  removeClass(buttonContainer, "is__show");
});
