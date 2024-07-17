import PocketBase from "pocketbase";
import { insertLast } from "/src/lib/dom/index";
import getPbImageURL from "/src/api/getPbImageURL";
import { formatPrice } from "/src/lib/utils/price";
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

const pb = new PocketBase("https://eight-lane-highway.pockethost.io/");

const list = document.querySelector(".product__lists__container__items");
const totals = document.querySelector(".product__lists__container__totals");
const popup = document.querySelector(".modal");

async function renderProductList() {
  const productItem = await pb.collection("products").getFullList();

  const countTotal = countTotalProduct(productItem);

  productItem.forEach((items) => {
    const isKarlyOnly = JSON.parse(items.is_karlyOnly.toLowerCase());
    const isLimited = JSON.parse(items.is_limited.toLowerCase());

    const discountSection =
      items.discount !== 0
        ? `<p class="info__product__price">
            <span class="info__sale__price">${
              items.discount
            }%</span> ${formatPrice(
            items.price - items.price * (items.discount / 100)
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
    <article class="product product-list-items">
        <h3 class="sr-only">제품 상세</h3>
        <div class="visual">
          <a href="/src/pages/product/product-detail.html?product=${
            items.id
          }" class="visual__link">
            <img
              src="${getPbImageURL(items)}" />
          </a>
          <a href="" class="visual__add-cart">
            <img
              src="https://eight-lane-highway.pockethost.io/api/files/gvvvhy46u0pq19y/ddn8bpfq6fsglu8/cart_sfurEEgmWu.svg"
              alt="장바구니 담기" />
          </a>
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
    `;
    insertLast(list, template);
  });
  insertLast(totals, countTotal);
  updateCategoryCounts(productItem);
  updateBrandCounts(productItem);
  updatePriceCounts(productItem);
  updateDeliveryCounts(productItem);
  updateTypeCounts(productItem);
  updateBenefitCounts(productItem);
  updateExeptionCounts(productItem);
}

renderProductList();

function countTotalProduct(items) {
  let count = 0;

  items.forEach((i) => {
    count++;
  });

  return `총 ${count} 건`;
}
