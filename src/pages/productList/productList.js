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

// 상품 아이템 받아오는 함수
async function fetchProducts() {
  productItem = await pb.collection("products").getFullList();
  totalPages = Math.ceil(productItem.length / itemsPerPage); // 페이지네이션을 위해 전체 데이터에서 한 페이지당 아이템을 나눠 총 페이지 구함
  renderPaginationButtons();
  renderProductList();
}

// 헤더에서 각각의 상품 리스트 요소 클릭 시 제목 변경할 수 있도록 해주는 함수
function renderTitleName() {
  const params = new URLSearchParams(location.search); // params로 페이지 이름 받음
  let titleName = params.get("title");

  // 페이지가 영어로 되어있어 영어에 맞는 한글로 변환하기 위한 switch문 사용
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

// 상품 리스트 랜더링 함수
function renderProductList() {
  list.innerHTML = "";
  const startIndex = (currentPage - 1) * itemsPerPage; // 상품 페이지네이션을 위한 시작 인덱스
  const endIndex = startIndex + itemsPerPage; // 상품 페이지네이션을 위한 마지막 인덱스
  const currentPageItems = productItem.slice(startIndex, endIndex); // 현재 페이지에 들어갈 아이템을 구하기 위해 시작인덱스와 마지막 인덱스 사용

  currentPageItems.forEach((items) => {
    const isKarlyOnly = JSON.parse(items.is_karlyOnly.toLowerCase()); // parse를 해야 true/false를 인식 아니면 문자열로 인식해 무조건 true가 나옴
    const isLimited = JSON.parse(items.is_limited.toLowerCase());

    // 할인이 있으면 할인가와 할인율 그리고 원가를 아니면 그냥 원가만 보일수 있도록 조건 처리
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

    // isKarlyOnly가 true면 배지를 넣을 수 있도록 아니면 그냥 비어있게 조건 처리
    const karlyOnlyBadge = isKarlyOnly
      ? `<p class="badge badge__karly">Karly Only</p>`
      : `<p></p>`;

    // isLimited가 true면 배지를 넣을 수 있도록 아니면 그냥 비어있게 조건 처리
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
                  src="${getPbImageURL(items)}" alt="${items.name} 사진"/>
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

  // add cart pop-up을 넣을 수 있도록 처리
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

  // 상품 숫자 넣기 위한 함수 호출
  updateCategoryCounts(productItem);
  updateBrandCounts(productItem);
  updatePriceCounts(productItem);
  updateDeliveryCounts(productItem);
  updateTypeCounts(productItem);
  updateBenefitCounts(productItem);
  updateExeptionCounts(productItem);
}

// 페이지 버튼 랜더링 함수
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

  // 상품의 갯수 만큼 동적으로 숫자를 불러오기 위한 for문
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

// 버튼 상태 함수
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

// 페이지 버튼 이벤트 처리 함수
function addPaginationEventListeners() {
  const firstButton = document.querySelector(".first-page");
  const previousButton = document.querySelector(".previous-page");
  const nextButton = document.querySelector(".next-page");
  const lastButton = document.querySelector(".last-page");

  // 가장 이전 페이지로 이동하는 버튼
  firstButton.addEventListener("click", () => {
    currentPage = 1;
    renderProductList();
    renderPaginationButtons();
  });

  // 이전 페이지로 이동하는 버튼
  previousButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderProductList();
      renderPaginationButtons();
    }
  });

  // 다음 페이지로 이동하는 버튼
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderProductList();
      renderPaginationButtons();
    }
  });

  // 가장 마지막 페이지로 이동하는 버튼
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

// 상품 총 갯수 계산 함수
function countTotalProduct(items) {
  let count = 0;

  items.forEach((i) => {
    count++;
  });

  return `총 ${count} 건`;
}
