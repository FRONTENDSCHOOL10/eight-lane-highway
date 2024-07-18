import { insertLast, formatPrice } from "/src/lib/index";
import getPbImageURL from "/src/api/getPbImageURL";

export async function renderProductItem(className, collectionName) {
  let productsData = await collectionName.getFullList();
  productsData.forEach((item) => {

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
}
