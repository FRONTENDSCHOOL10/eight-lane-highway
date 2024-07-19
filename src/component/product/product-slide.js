import {
  setStorage,
  insertLast,
  getStorage,
  isArray,
  openCartPopUp,
  closeCartPopUp,
  getCartData,
  getId,
  getUrl,
} from "/src/lib/index.js";
import {
  CustomSwiper,
  renderProductItem,
  removeRecentProductsId,
  recentProducts,
} from "/src/pages/main/index.js";

import getPbImageURL from "/src/api/getPbImageURL.js";
import pb from "/src/api/pocketbase.js";

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

  if (!swiper1 || !swiper2) return;

  await renderProductItem(".product-slide1", productsData);
  await renderProductItem(".product-slide2", specialProductsData);
  // const seeAllProduct = `
  //   <article class="swiper-slide product" id="seeAllProduct">
  //   <a href="/src/pages/productList/index.html?title=best" >
  //     <img src="/images/icon-arrow-right.svg" alt="전체보기 화살표" aria-hidden="true"/>
  //     <span aria-label="전체보기">전체보기</span>
  //   </a>
  // </article>
  // `;

  // insertLast(".product-slide1 .swiper-wrapper", seeAllProduct);
  // insertLast(".product-slide2 .swiper-wrapper", seeAllProduct);
  const localStorageItem = localStorage.getItem("recent");

  let data = localStorageItem ? JSON.parse(localStorageItem) : [];

  const slides = document.querySelectorAll(".visual__link");
  slides.forEach((item) => {
    item.addEventListener("click", (e) => {
      const id = getId(e.target.closest("a"));
      const src = getUrl(e.target.closest("img"));
      data.push({ id, src });
      setStorage("recent", data);
      removeRecentProductsId(e, e.target.closest("img"));
    });

    item.addEventListener("keydown", (e) => {
      if (e.keyCode == 32) {
        e.preventDefault();
        e.target.click();
        console.log(e.currentTarget.firstElementChild);
        handleClick(e, e.currentTarget.firstElementChild);
        removeRecentProductsId(e, e.currentTarget.firstElementChild);
      }
    });
  });

  recentProducts();

  // 장바구니 버튼 클릭시 해당 아이템의 모달창을 띄워줌.
  // 제품의 id를 받아와 제품의 정보를 렌더링 해줌.

  const cartButton = document.querySelectorAll(".visual__add-cart");
  cartButton.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const id = getId(e.target.parentNode.previousElementSibling);
      openCartPopUp(id);
      renderAddShoppingCart(id);
    });

    item.addEventListener("keydown", (e) => {
      if (e.keyCode == 32) {
        e.preventDefault();
        const id = getId(e.target.parentNode.firstElementChild);
        openCartPopUp(id);
        renderAddShoppingCart(id);
      }
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
        ? item.price.toLocaleString()
        : (
            Math.floor((item.price * ((100 - item.discount) / 100)) / 10) * 10
          ).toLocaleString();
    const changePriceTemplate =
      item.discount === 0
        ? `<span id="product__price">${changePrice.toLocaleString()}원</span>`
        : `<div class='price__wrappers'><span id="product__price">${changePrice.toLocaleString()}원</span><span id="product__undiscount__price">${item.price.toLocaleString()}원</span></div>`;

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
    const focusableElements = popup.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    const counterButton = document.querySelector(".price_counter");
    const cancelButton = document.querySelector(".cancel");
    const addCartButton = document.querySelector(".add__cart");
    const countProductNum = document.getElementById("product__num");
    const totalProduct = document.getElementById("total");

    handleAddCart(id);
    counterButton.addEventListener(
      "click",
      handleCounterProduct(countProductNum, changePrice, totalProduct)
    );
    cancelButton.addEventListener("click", closeCartPopUp);
    addCartButton.addEventListener("click", handleAddCart(item.id));
  }

  // 상품 갯수 별 가격 증가 / 감소 함수
  function handleCounterProduct(countNode, price, resultNode) {
    return function (e) {
      let result = parseInt(price.replace(/,/g, ""), 10);
      const target = e.target.closest("button");
      if (!target) return;

      if (target.id === "plusBtn") {
        countNode.textContent = parseInt(countNode.textContent) + 1;
        result =
          parseInt(resultNode.textContent.replace(/,/g, ""), 10) +
          parseInt(price.replace(/,/g, ""), 10);
        resultNode.textContent = result.toLocaleString() + "원";
      } else if (target.id === "minusBtn") {
        if (parseInt(countNode.textContent) <= 0) {
          alert("상품 개수가 0보다 작으면 안됩니다!");
          countNode.textContent = 1;
          resultNode.textContent = price + "원";
          return;
        }
        countNode.textContent = parseInt(countNode.textContent) - 1;
        result =
          parseInt(resultNode.textContent.replace(/,/g, ""), 10) -
          parseInt(price.replace(/,/g, ""), 10);
        resultNode.textContent = result.toLocaleString() + "원";
      }
    };
  }

  // 로컬스토리지에 장바구니 항목 추가 함수
  function handleAddCart(id) {
    return async function (e) {
      e.preventDefault();
      const products = allData.find((item) => item.id === id);

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
        cartItems.push({
          productID: products.id,
          quantity: parseInt(productNum),
          name: products.name,
          price: products.price,
          discount: products.discount,
          imgURL: getPbImageURL(products),
          packaging: products.packaging,
        });
      }
      setStorage("cartItems", cartItems);
      closeCartPopUp(e);
      getCartData();
    };
  }

  // 팝업 열기
  openCartPopUp();
  // 팝업 닫기
  closeCartPopUp();
})();
getCartData();
