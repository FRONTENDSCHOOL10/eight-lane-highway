import { getNode, addClass, removeClass } from "/src/lib/index.js";

const swiper = new Swiper(".swiper-container", {
  slidesPerView: 4,
  slidesPerGroup: 4,
  spaceBetween: 18,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    init: function () {
      checkNavigation(this);
    },
    slideChange: function () {
      checkNavigation(this);
    },
    update: function () {
      checkNavigation(this);
    },
  },
});

function checkNavigation(swiper) {
  const prev = getNode(".swiper-button-prev");
  const next = getNode(".swiper-button-next");

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

const addCart = document.querySelectorAll(".add-cart");

addCart.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("add-cart버튼 클릭");
  });
});
