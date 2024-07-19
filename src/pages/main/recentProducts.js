import { getStorage, insertFirst } from "/src/lib/index.js";

export async function recentProducts() {
  try {
    const recentSwiper = document.querySelector(
      ".recent-product-container .swiper-wrapper"
    );
    const data = await getStorage("recent");

    if (!recentSwiper || !data) return;

    data.forEach(({ id, src }) => {
      const template = `
        <div class="swiper-slide">
          <a href="/src/pages/product/product-detail.html?product=${id}" target="_blank" rel="noopener noreferrer">
            <img src="${src}" alt="최근 본 상품" />
          </a>
        </div>`;

      insertFirst(recentSwiper, template);
    });
  } catch (error) {
    console.error("Error rendering recent products:", error);
  }
}
