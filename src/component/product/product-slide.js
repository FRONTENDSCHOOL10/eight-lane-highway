import {
  getNodes,
  getNode,
  addClass,
  removeClass,
  insertLast,
} from "/src/lib/index.js";
import getPbImageURL from "/src/api/getPbImageURL";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://eight-lane-highway.pockethost.io/");

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
      renderProductItem();
    },
    slideChange: function () {
      checkNavigation(this);
    },
    update: function () {
      checkNavigation(this);
      // add-button 클릭시 일어날 이벤트 처리
      addCartEvent();
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

// 3자리마다 컴마와 1원단위 삭제
function formatPrice(price) {
  const roundedPrice = Math.floor(price / 10) * 10;
  return roundedPrice.toLocaleString();
}

async function renderProductItem() {
  const productsData = await pb.collection("products").getFullList();
  productsData.forEach((item) => {
    const discount = item.price * (item.discount * 0.01);
    const template = `
    <article class="swiper-slide product">
    <h3 class="sr-only">${item.name}</h3>
    <div class="visual">
      <a href="" class="visual__link">
        <img
          src="${getPbImageURL(item)}" alt="${item.name}" />
      </a>
      <button class="visual__add-cart" aria-label="장바구니 담기">
        <img
          src="https://eight-lane-highway.pockethost.io/api/files/gvvvhy46u0pq19y/ddn8bpfq6fsglu8/cart_sfurEEgmWu.svg"
          alt="장바구니 담기" />
      </button>
    </div>
    <div class="info">
      <p class="info__delivery">샛별배송</p> 
      <p class="info__product__title">
       ${item.name}
      </p>
      <p class="info__product__price">
        <span class="info__sale__price">${
          item.discount === 0 ? "" : item.discount + "%"
        } </span>${formatPrice(item.price - discount)} 원 
      </p>
      ${
        item.discount === 0
          ? ""
          : `<p class="info__product__original-price">${formatPrice(
              item.price
            )} 원</p>`
      }
      <p class="info__product__description">
        ${item.subtitle}
      </p>
      <div class="badge__group">
      ${
        item.is_karlyOnly == "true"
          ? '<p class="badge badge__karly">Karly Only</p>'
          : ""
      }
      ${
        item.is_limited == "true"
          ? '<p class="badge badge__text">한정수량</p>'
          : ""
      }
      </div>
    </div>
  </article>
    `;
    insertLast(".swiper-wrapper", template);
  });
  swiper.update();
}

// add-button 클릭시 일어날 이벤트 처리
function addCartEvent() {
  const addCart = getNodes(".visual__add-cart");
  addCart.forEach((button) => {
    button.addEventListener("click", handleClickButton);
  });
}
// add-button 클릭시 일어날 이벤트 처리
function handleClickButton() {
  console.log("add-cart버튼 클릭");
}
