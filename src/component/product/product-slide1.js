import {
  getNodes,
  getNode,
  addClass,
  removeClass,
  insertLast,
  formatPrice,
  setStorage,
  getStorage,
  isArray,
} from "/src/lib/index.js";
import getPbImageURL from "/src/api/getPbImageURL";
import PocketBase from "pocketbase";
import { getSavedRecentProduct } from "/src/component/recent-product/main.js";

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
      addCart();
      // product 클릭시 일어날 이벤트 처리
      addProduct();
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

let productIdList = [];
async function renderProductItem() {
  const productsData = await pb.collection("products").getFullList();
  productsData.forEach((item) => {
    productIdList.push(item.id);
    const discount = item.price * (item.discount * 0.01);
    const template = `
    <article class="swiper-slide product">
    <h3 class="sr-only">${item.name}</h3>
    <div class="visual">
      <a href="/src/pages/product/product-detail.html?product=${
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
  });
  swiper.update();
}

// add-cart에 각각 이벤트 추가
function addCart() {
  const addCart = getNodes(".product-slide1 .visual__add-cart");
  addCart.forEach((addCartButton, index) => {
    addCartButton.addEventListener("click", (e) => {
      e.preventDefault();
      openCartPopUp(productIdList[index]);
    });
  });
}

// 제품 클릭시 일어날 이벤트 처리
function viewedProducts() {
  let recentProductsId = [];

  return async function () {
    const productLink = getNodes(".product-slide1 .visual__link");

    // 기존 저장된 데이터를 로드
    recentProductsId = (await getStorage("recentProductId")) || [];

    productLink.forEach((productLink, index) => {
      productLink.addEventListener("click", async (e) => {
        e.preventDefault();
        const productId = productIdList[index];
        const productIndex = recentProductsId.indexOf(productId);

        // 중복된 값을 제거
        if (productIndex !== -1) {
          recentProductsId.splice(productIndex, 1);
        }

        // 최근 본 제품 목록에 추가
        recentProductsId.push(productId);
        await setStorage("recentProductId", recentProductsId);

        // 업데이트된 목록을 화면에 출력
        getSavedRecentProduct();
      });
    });
  };
}

// 클로저로 생성한 addProduct 함수 사용
const addProduct = viewedProducts();
getSavedRecentProduct();

/* -------------------------------------------------------------------------- */
/*                                   장바구니 모달                             */
/* -------------------------------------------------------------------------- */

const popup = document.querySelector(".modal");

// 템플릿 생성 함수
async function renderAddShoppingCart(id) {
  const item = await pb.collection("products").getOne(id);
  const template = `
      <section class="basket-container modal_popup">
      <article class="basket-container__product__num__container">
        <p>${item.name}</p>
        <div class="basket-container__product__num__container__box">
          <span id="product__price">${item.price}원</span>
          <div class="price_counter">
            <button type="button" id="minusBtn">
              <img src="/images/minus-button-black.svg" alt="" />
            </button>
            <span id="product__num">1</span>
            <button type="button" id="plusBtn">
              <img src="/images/plus-button-black.svg" alt="" />
            </button>
          </div>
        </div>
      </article>
      <article class="basket-container__price__container">
        <div class="basket-container__price__container__sum">
          <span>합계</span>
          <span id="total">${item.price}원</span>
        </div>
        <div class="basket-container__price__container__bonus badge__group">
          <p class="badge__accent">적립</p>
          <span>구매시 5원 적립</span>
        </div>
      </article>
      <ul class="basket-container__btn_container">
        <li class="basket-container__btn_container__items">
          <button type="button" class="button__stroke__gray button__large__basket cancel">
            취소
          </button>
        </li>
        <li class="basket-container__btn_container__items">
          <button type='submit' class="button__fill button__large__basket add__cart">
            장바구니 담기
          </button>
        </li>
      </ul>
    </section>
  `;
  insertLast(popup, template);

  const counterButton = document.querySelector(".price_counter");
  const cancelButton = document.querySelector(".cancel");
  const addCartButton = document.querySelector(".add__cart");
  const countProductNum = document.getElementById("product__num");
  const totalProduct = document.getElementById("total");

  handleAddCart(id);
  counterButton.addEventListener(
    "click",
    handleCounterProduct(countProductNum, item.price, totalProduct)
  );
  cancelButton.addEventListener("click", closeCartPopUp);
  addCartButton.addEventListener("click", handleAddCart(item.id));
}

// 상품 갯수 별 가격 증가 / 감소 함수
function handleCounterProduct(countNode, price, resultNode) {
  return function (e) {
    const target = e.target.closest("button");
    if (!target) return;

    if (target.id === "plusBtn") {
      countNode.textContent = parseInt(countNode.textContent) + 1;
      resultNode.textContent = parseInt(resultNode.textContent) + price + "원";
    } else if (target.id === "minusBtn") {
      if (parseInt(countNode.textContent) <= 0) {
        alert("상품 개수가 0보다 작으면 안됩니다!");
        countNode.textContent = 1;
        resultNode.textContent = price + "원";
        return;
      }
      countNode.textContent = parseInt(countNode.textContent) - 1;
      resultNode.textContent = parseInt(resultNode.textContent) - price + "원";
    }
  };
}

// 로컬스토리지에 장바구니 항목 추가 함수
function handleAddCart(id) {
  return async function (e) {
    e.preventDefault();
    let productNum = document.querySelector("#product__num").textContent;
    let cartItems = await getStorage("cartItems");

    if (!isArray(cartItems)) {
      cartItems = [];
    }
    let existedItems = cartItems.find((item) => item.productID === id);

    if (existedItems) {
      existedItems.quantity =
        parseInt(existedItems.quantity) + parseInt(productNum);
    } else {
      cartItems.push({ productID: id, quantity: parseInt(productNum) });
    }

    setStorage("cartItems", cartItems);

    closeCartPopUp(e);
  };
}

// 팝업 열기
function openCartPopUp(id) {
  renderAddShoppingCart(id);
  popup.style.display = "block";
  document.body.style.overflow = "hidden"; // 팝업 모달 여는 동안 스크롤 못하게 하도록 함
}
// 팝업 닫기
function closeCartPopUp() {
  popup.textContent = "";
  popup.style.display = "none";
  document.body.style.overflow = "visible";
}