import PocketBase from "pocketbase";
import { insertLast } from "/src/lib/dom/index";
import getPbImageURL from "/src/api/getPbImageURL";
import { formatPrice } from "/src/lib/utils/price";
import "/src/component/header/header.js";
import "/src/component/footer/footer.js";
import {
  toggleTitle,
  handleClickedItems,
} from "/src/component/accodion/accodion";
import {
  updateCategoryCounts,
  updateBrandCounts,
} from "/src/component/accodion/countAccodionItems";
import {
  updateBenefitCounts,
  updateDeliveryCounts,
  updateExeptionCounts,
  updatePriceCounts,
  updateTypeCounts,
} from "/src/component/accodion/countAccodionItems";
import { openCartPopUp } from "/src/component/addShoppingBasket/addShoppingBasket";

const pb = new PocketBase("https://eight-lane-highway.pockethost.io/");

const productListTitle = document.querySelector(".products__list_title");
const list = document.querySelector(".product__lists__container__items");
const totals = document.querySelector(".product__lists__container__totals");
const popup = document.querySelector(".modal");

let currentPage = 1;
const itemsPerPage = 12;
let productItem = [];
let totalPages = 1;

async function fetchProducts() {
  productItem = await pb.collection("products").getFullList();
  totalPages = Math.ceil(productItem.length / itemsPerPage);
  renderPaginationButtons();
  renderProductList();
}

function renderTitleName() {
  const params = new URLSearchParams(location.search);
  let titleName = params.get("title");

  switch (titleName) {
    case "new":
      titleName = "신상품";
      break;
    case "best":
      titleName = "베스트";
      break;
    case "shopping":
      titleName = "알뜰쇼핑";
      break;
    case "benefits":
      titleName = "특가/혜택";
      break;
  }

  const template = `<h2 class="products__list_title">${titleName}</h2>`;

  insertLast(productListTitle, template);
}

renderTitleName();

function renderProductList() {
  list.innerHTML = "";
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = productItem.slice(startIndex, endIndex);

  currentPageItems.forEach((items) => {
    const isKarlyOnly = JSON.parse(items.is_karlyOnly.toLowerCase());
    const isLimited = JSON.parse(items.is_limited.toLowerCase());

    const discountSection =
      items.discount !== 0
        ? `<p class="info__product__price">
            <span class="info__sale__price">${
              items.discount
            }%</span> ${formatPrice(
            items.price * ((100 - items.discount) / 100)
          )} 원
          </p>
          <p class="info__product__original-price">${formatPrice(
            items.price
          )} 원</p>`
        : `<p class="info__product__price">
            ${formatPrice(items.price)} 원
          </p>`;
    const karlyOnlyBadge = isKarlyOnly
      ? `<p class="badge badge__karly">Karly Only</p>`
      : `<p></p>`;
    const limitedBadge = isLimited
      ? `<p class="badge badge__text">한정수량</p>`
      : `<p></p>`;

    const template = `
      <a href="/src/pages/product/product-detail.html?product=${items.id}">
        <article class="product product-list-items">
            <h3 class="sr-only">제품 상세</h3>
            <div class="visual">
              <p class="visual__link">
                <img
                  src="${getPbImageURL(items)}" />
              </p>
              <button class="visual__add-cart"  data-product-id=${items.id}>
                <img
                  src="https://eight-lane-highway.pockethost.io/api/files/gvvvhy46u0pq19y/ddn8bpfq6fsglu8/cart_sfurEEgmWu.svg"
                  alt="장바구니 담기"/>
              </button>
            </div>
            <div class="info">
              <p class="info__delivery">${items.delivery}</p>
              <p class="info__product__title">${items.name}</p>
              ${discountSection}
              <p class="info__product__subtitle">
                ${items.subtitle}
              </p>
              <div class="badge__group">
                ${karlyOnlyBadge}
                ${limitedBadge}
              </div>
            </div>
          </article>
      </a>
    `;
    insertLast(list, template);
  });

  const addCartButtons = document.querySelectorAll(".visual__add-cart");
  addCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.currentTarget.getAttribute("data-product-id");
      openCartPopUp(productId)(e);
    });
  });

  const countTotal = countTotalProduct(productItem);
  totals.textContent = "";
  insertLast(totals, countTotal);

  updateCategoryCounts(productItem);
  updateBrandCounts(productItem);
  updatePriceCounts(productItem);
  updateDeliveryCounts(productItem);
  updateTypeCounts(productItem);
  updateBenefitCounts(productItem);
  updateExeptionCounts(productItem);
}

function renderPaginationButtons() {
  const pageContainer = document.querySelector(".page__container");
  pageContainer.textContent = "";

  pageContainer.innerHTML += `
    <li class="page__item" aria-label="첫번째 페이지 이동">
      <a href="#" class="first-page"><span class="move-icon__first"></span></a>
    </li>
    <li class="page__item" aria-label="이전 페이지 이동">
      <a href="#" class="previous-page"><span class="move-icon__left"></span></a>
    </li>
  `;

  for (let i = 1; i <= totalPages; i++) {
    pageContainer.innerHTML += `
      <li class="page__item" aria-label="${i} 페이지 이동">
        <a href="#" class="page-number" data-page="${i}">${i}</a>
      </li>
    `;
  }

  pageContainer.innerHTML += `
    <li class="page__item" aria-label="다음 페이지 이동">
      <a href="#" class="next-page"><span class="move-icon__right"></span></a>
    </li>
    <li class="page__item" aria-label="마지막 페이지 이동">
      <a href="#" class="last-page"><span class="move-icon__last"></span></a>
    </li>
  `;

  // 버튼 상태 업데이트
  updateButtonStates();

  addPaginationEventListeners();
}

function updateButtonStates() {
  const previousButton = document.querySelector(".previous-page");
  const nextButton = document.querySelector(".next-page");
  const firstButton = document.querySelector(".first-page");
  const lastButton = document.querySelector(".last-page");
  const pageButtons = document.querySelectorAll(".page-number");

  previousButton.parentElement.classList.toggle("disabled", currentPage === 1);
  nextButton.parentElement.classList.toggle(
    "disabled",
    currentPage === totalPages
  );
  firstButton.parentElement.classList.toggle("disabled", currentPage === 1);
  lastButton.parentElement.classList.toggle(
    "disabled",
    currentPage === totalPages
  );

  pageButtons.forEach((button) => {
    button.parentElement.classList.remove("active");
    if (parseInt(button.getAttribute("data-page")) === currentPage) {
      button.parentElement.classList.add("active");
    }
  });
}

function addPaginationEventListeners() {
  const firstButton = document.querySelector(".first-page");
  const previousButton = document.querySelector(".previous-page");
  const nextButton = document.querySelector(".next-page");
  const lastButton = document.querySelector(".last-page");

  firstButton.addEventListener("click", () => {
    currentPage = 1;
    renderProductList();
    renderPaginationButtons();
  });

  previousButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderProductList();
      renderPaginationButtons();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderProductList();
      renderPaginationButtons();
    }
  });

  lastButton.addEventListener("click", () => {
    currentPage = totalPages;
    renderProductList();
    renderPaginationButtons();
  });
}

// 페이지 번호 버튼 이벤트 리스너 추가
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("page-number")) {
    e.preventDefault(); // 기본 링크 동작 방지
    currentPage = parseInt(e.target.getAttribute("data-page"));
    renderProductList();
    renderPaginationButtons();
  }
});

fetchProducts();

function countTotalProduct(items) {
  let count = 0;

  items.forEach((i) => {
    count++;
  });

  return `총 ${count} 건`;
}
