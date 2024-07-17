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

// 스와이퍼의 시작과 마지막을 체크
function checkNavigation(className, swiper) {
  const prev = getNode(`${className} .swiper-button-prev`);
  const next = getNode(`${className} .swiper-button-next`);

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

(async function () {
  // 데이터 캐시 변수
  let cachedProductsData = null;
  // 데이터 가져오기 함수
  async function fetchProductsData(sortType = "") {
    if (!cachedProductsData || sortType) {
      cachedProductsData = await pb
        .collection("products")
        .getFullList({ sort: sortType });
    }
    return cachedProductsData;
  }
  // 데이터 미리 가져오기
  await fetchProductsData();

  // 제품 ID 리스트
  let productIdList = [];

  // 제품 항목 렌더링 함수
  async function renderProductItem(className, swiper, sortType = "") {
    let productsData = await fetchProductsData(sortType);
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
              <img src="${getPbImageURL(item)}" alt="${item.name}" />
            </a>
            <a href="/" class="visual__add-cart" aria-label="장바구니 담기">
              <img src="https://eight-lane-highway.pockethost.io/api/files/gvvvhy46u0pq19y/ddn8bpfq6fsglu8/cart_sfurEEgmWu.svg" alt="장바구니 담기" />
            </a>
          </div>
          <div class="info">
            <p class="info__delivery">샛별배송</p>
            <p class="info__product__title">${item.name}</p>
            <p class="info__product__price">
              <span class="info__sale__price">${
                item.discount === 0 ? "" : item.discount + "%"
              }</span>${formatPrice(item.price - discount)} 원
            </p>
            ${
              item.discount === 0
                ? ""
                : `<p class="info__product__original-price">${formatPrice(
                    item.price
                  )} 원</p>`
            }
            <p class="info__product__description">${item.subtitle}</p>
            <div class="badge__group">
              ${
                item.is_karlyOnly === "true"
                  ? '<p class="badge badge__karly">Karly Only</p>'
                  : ""
              }
              ${
                item.is_limited === "true"
                  ? '<p class="badge badge__text">한정수량</p>'
                  : ""
              }
            </div>
          </div>
        </article>
      `;
      insertLast(`${className} .swiper-wrapper`, template);
    });
    swiper.update();
  }
  // add-cart에 각각 이벤트 추가
  function addCart(className) {
    const addCart = getNodes(`${className} .visual__add-cart`);
    addCart.forEach((addCartButton, index) => {
      addCartButton.addEventListener("click", (e) => {
        e.preventDefault();
        openCartPopUp(productIdList[index]);
      });
    });
  }

  let recentProductsId = await getStorage("recentProductId");
  async function removeRecentProductsId() {
    if (!recentProductsId) return;
    // 최근 본 상품이 5개 초과일 경우, 가장 오래된 상품 하나를 삭제
    if (recentProductsId.length > 5) {
      recentProductsId.shift(); // 가장 오래된 상품 하나를 삭제
      await setStorage("recentProductId", recentProductsId); // 수정된 목록을 저장
    }
  }
  function recentProducts(className) {
    return async function () {
      const productLinks = getNodes(`${className} .visual__link`);
      async function handleClick(e, index) {
        const productId = productIdList[index];
        recentProductsId = (await getStorage("recentProductId")) || [];

        // 이미 저장된 상품이 있다면 중복 체크 후 제거
        const productIndex = recentProductsId.indexOf(productId);
        if (productIndex !== -1) {
          recentProductsId.splice(productIndex, 1);
        }

        // 최근 본 상품 목록에 상품 추가
        recentProductsId.push(productId);
        await setStorage("recentProductId", recentProductsId);

        // 최신 데이터로 업데이트
        getSavedRecentProduct();
        removeRecentProductsId(); // removeRecentProductsId 함수를 호출하여 오래된 상품 제거
      }

      productLinks.forEach((productLink, index) => {
        productLink.addEventListener("click", (e) => handleClick(e, index));
      });
    };
  }
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

  function CustomSwiper(className, sortType = "") {
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
          recentProducts(className)();
          renderProductItem(className, this, sortType);
          checkNavigation(className, this);
        },
        slideChange: function () {
          checkNavigation(className, this);
        },
        update: function () {
          recentProducts(className)();
          checkNavigation(className, this);
          addCart(className);
        },
      },
    });

    return swiper;
  }

  const swiper1 = new CustomSwiper(".product-slide1");
  const swiper2 = new CustomSwiper(".product-slide2", "price");
})();
