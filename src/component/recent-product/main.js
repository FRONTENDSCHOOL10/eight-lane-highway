import getPbImageURL from "../../api/getPbImageURL";
import pb from "../../api/pocketbase";
import { getNode, insertFirst, getStorage, addClass } from "../../lib/index";

// 스와이퍼 생성
const swiperContainer = document.querySelector(
  ".recent-product-container .swiper-container"
);
if (swiperContainer) {
  const swiper = new Swiper(swiperContainer, {
    direction: "vertical",
    navigation: {
      nextEl: ".recent-product-container .swiper-button-next",
      prevEl: ".recent-product-container .swiper-button-prev",
    },
    slidesPerView: "auto",
    spaceBetween: 6,
  });
}

const recentContainer = getNode(".recent-product");
const documentHeight = document.documentElement.scrollHeight;
recentContainer.style.height = `${documentHeight - 500}px`;

// 로컬스토리지에 저장된 id값으로 데이터베이스에서 이미지 불러오기
export async function getSavedRecentProduct() {
  const upperArrow = getNode(".recent-product-container .swiper-button-prev");
  const belowArrow = getNode(".recent-product-container .swiper-button-next");
  const itemContainer = getNode(".recent-product-container .swiper-wrapper");

  if (await getStorage("recentProductId")) {
    const recentProductsId = await getStorage("recentProductId");
    if (recentProductsId.length > 2) {
      addClass(upperArrow, "is__active");
      addClass(belowArrow, "is__active");
    }
    itemContainer.innerHTML = "";

    for (const id of recentProductsId) {
      const item = await pb.collection("products").getOne(id);
      const template = `
        <div class="swiper-slide">
        <a href="/src/pages/product/product-detail.html?product=${item.id}">
        <img src="${getPbImageURL(item)}" alt="${item.name}" />
      </a>
        </div>`;
      insertFirst(itemContainer, template);
    }
  }
}
