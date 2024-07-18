import {
  setStorage,
  CustomSwiper,
  renderProductItem,
  removeRecentProductsId,
  recentProducts,
  insertLast,
  getStorage,
  isArray,
  openCartPopUp,
  closeCartPopUp,
} from "/src/lib/index.js";

import PocketBase from "pocketbase";
const pb = new PocketBase("https://eight-lane-highway.pockethost.io/");

// 스와이퍼의 시작과 마지막을 체크

(async function () {
  let productsData = await pb.collection("products");
  let specialProductsData = await pb.collection("specialProducts");

  let allData = [
    ...(await productsData.getFullList()),
    ...(await specialProductsData.getFullList()),
  ];

  const swiper1 = new CustomSwiper(".product-slide1");
  const swiper2 = new CustomSwiper(".product-slide2");

  await renderProductItem(".product-slide1", productsData);
  await renderProductItem(".product-slide2", specialProductsData);

  const localStorageItem = localStorage.getItem("recent");

  let data = localStorageItem ? JSON.parse(localStorageItem) : [];

  function handleClick(e) {
    const url = new URLSearchParams(e.target.closest("a").href);
    let id;
    for (const [_, a] of url) id = a;
    let src = e.target.closest("img").src;
    data.push({ id, src });
    setStorage("recent", data);
  }

  const slides = document.querySelectorAll(".visual__link");
  slides.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      e.preventDefault(); // remove
      handleClick(e, index);
      removeRecentProductsId(e);
    });
  });

  recentProducts();

  // 장바구니 버튼 클릭시 해당 아이템의 모달창을 띄워줌.
  // 제품의 id를 받아와 제품의 정보를 렌더링 해줌.

  const cartButton = document.querySelectorAll(".visual__add-cart");
  cartButton.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const url = new URLSearchParams(
        e.target.parentNode.previousElementSibling.href
      );
      let id;
      for (const [_, a] of url) id = a;
      openCartPopUp(id);
      renderAddShoppingCart(id);
    });
  });

  /* -------------------------------------------------------------------------- */
  /*                                   장바구니 모달                             */
  /* -------------------------------------------------------------------------- */

  const popup = document.querySelector(".modal");

  // 템플릿 생성 함수
  async function renderAddShoppingCart(id) {
    const item = allData.find((item) => item.id === id);
    let changePrice =
      item.discount === 0
        ? item.price
        : Math.floor((item.price * ((100 - item.discount) / 100)) / 10) * 10;
    const changePriceTemplate =
      item.discount === 0
        ? `<span id="product__price">${changePrice}원</span>`
        : `<div class='price__wrappers'><span id="product__price">${changePrice}원</span><span id="product__undiscount__price">${item.price}원</span></div>`;

    const template = `
        <section class="basket-container modal_popup">
        <article class="basket-container__product__num__container">
          <p>${item.name}</p>
          <div class="basket-container__product__num__container__box">
            ${changePriceTemplate}
            <div class="price_counter">
              <button type="button" id="minusBtn">
                <img src="/images/minus-button-black.svg" alt="마이너스버튼" />
              </button>
              <span id="product__num">1</span>
              <button type="button" id="plusBtn">
                <img src="/images/plus-button-black.svg" alt="플러스버튼" />
              </button>
            </div>
          </div>
        </article>
        <article class="basket-container__price__container">
          <div class="basket-container__price__container__sum">
            <span>합계</span>
            <span id="total">${changePrice}원</span>
          </div>
          <div class="basket-container__price__container__bonus badge__group">
            <p class="badge badge__accent">적립</p>
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
        resultNode.textContent =
          parseInt(resultNode.textContent) + price + "원";
      } else if (target.id === "minusBtn") {
        if (parseInt(countNode.textContent) <= 0) {
          alert("상품 개수가 0보다 작으면 안됩니다!");
          countNode.textContent = 1;
          resultNode.textContent = price + "원";
          return;
        }
        countNode.textContent = parseInt(countNode.textContent) - 1;
        resultNode.textContent =
          parseInt(resultNode.textContent) - price + "원";
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
  openCartPopUp();
  // 팝업 닫기
  closeCartPopUp();
})();
