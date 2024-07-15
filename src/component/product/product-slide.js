import {
  getNodes,
  getNode,
  addClass,
  removeClass,
  insertLast,
  formatPrice,
} from "/src/lib/index.js";
import getPbImageURL from "/src/api/getPbImageURL";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://eight-lane-highway.pockethost.io/");

// 스와이퍼
const swiper = new Swiper(".product-slide1 .swiper-container", {
  slidesPerView: 4,
  slidesPerGroup: 4,
  spaceBetween: 18,
  navigation: {
    nextEl: ".product-slide1 .swiper-button-next",
    prevEl: ".product-slide1 .swiper-button-prev",
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
  const prev = getNode(".product-slide1 .swiper-button-prev");
  const next = getNode(".product-slide1 .swiper-button-next");

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

async function renderProductItem() {
  const productsData = await pb.collection("products").getFullList();
  productsData.forEach((item) => {
    const discount = item.price * (item.discount * 0.01);
    const template = `
    <article class="swiper-slide product">
    <h3 class="sr-only">${item.name}</h3>
    <div class="visual">
      <a href="/src/component/product/product-detail.html?product=${
        item.id
      }" class="visual__link">
        <img
          src="${getPbImageURL(item)}" alt="${item.name}" />
      </a>
      <a href="/" class="visual__add-cart" aria-label="장바구니 담기">
        <img
          src="https://eight-lane-highway.pockethost.io/api/files/gvvvhy46u0pq19y/ddn8bpfq6fsglu8/cart_sfurEEgmWu.svg"
          alt="장바구니 담기" />
      </a>
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
    insertLast(".product-slide1 .swiper-wrapper", template);
    // item.addEventListener("click", () => {});
  });
  swiper.update();
}

// add-cart에 각각 이벤트 추가
function addCartEvent() {
  const addCart = getNodes(".visual__add-cart");
  addCart.forEach((a, index) => {
    a.addEventListener("click", () => {
      handleClickButton(index);
    });
  });
}
// add-cart 클릭시 일어날 이벤트 처리
function handleClickButton(index) {
  console.log(index + 1 + "번째 add-cart버튼 클릭");
}
