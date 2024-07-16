import getPbImageURL from "../../api/getPbImageURL";
import pb from "../../api/pocketbase";
import { getNode, insertFirst, getStorage, addClass } from "../../lib/index";

// 스와이퍼 생성
const swiper = new Swiper(".recent-product-container .swiper-container", {
  direction: "vertical",
  navigation: {
    nextEl: ".recent-product-container .swiper-button-next",
    prevEl: ".recent-product-container .swiper-button-prev",
  },
  slidesPerView: "auto",
  spaceBetween: 6,
});

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

    const productPromises = recentProductsId.map(async (id) => {
      const data = await pb.collection("products").getOne(id);
      return `
        <div class="swiper-slide">
        <a href="${data.url}">
          <img src="${getPbImageURL(data)}" alt="${data.name}" />
        </a>
        </div>`;
    });

    const templates = await Promise.all(productPromises);
    templates.forEach((template) => insertFirst(itemContainer, template));
  }
}

const container = getNode(".recent-product");
const documentHeight = document.documentElement.scrollHeight;
container.style.height = `${documentHeight}px`;
