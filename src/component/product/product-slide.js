import {
  getNodes,
  getNode,
  addClass,
  removeClass,
  getStorage,
} from "/src/lib/index.js";
import getPbImageURL from "../../api/getPbImageURL";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://eight-lane-highway.pockethost.io/");

const addCart = getNodes(".visual__add-cart");
// 스와이퍼
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

// 스와이퍼의 시작과 마지막을 체크
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

// 장바구니 담기 버튼 클릭시 일어날 이벤트 처리
addCart.forEach((button) => {
  button.addEventListener("click", handleClickButton);
});

function handleClickButton() {
  console.log("add-cart버튼 클릭");
}

//

async function getProducts() {
  console.log(pb.collection("products").getFullList("price"));
}
