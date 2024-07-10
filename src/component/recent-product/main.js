import getPbImageURL from "../../api/getPbImageURL";
import pb from "../../api/pocketbase";
import {
  getNode,
  insertAfter,
  setStorage,
  insertLast,
  getStorage,
} from "../../lib/index";

const upperArrow = getNode(".upper-arrow");
const belowArrow = getNode(".below-arrow");
const product1 = getNode("#product1");
const itemContainer = getNode(".swiper-wrapper");
const menuContainer = getNode(".product-menu-item");

// 스와이퍼 생성
const swiper = new Swiper(".swiper-container", {
  direction: "vertical",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: "auto",
  spaceBetween: 6,
});

/* 아래 부분은 메인 페이지 생성 후 수정 예정 */
/* 링크 뒤에 붙는 상품 아이디값 불러오기와서 로컬스토리지에 저장 */

// 링크 클릭시 해당 상품 아이디를  saveRecentProduct를 통해 로컬스토리지 저장
function handleAddProduct(e) {
  const target = e.target;
  const selectedItem = target.closest("li");
  if (!selectedItem) return;
  // 상품각각의 data-id 값을 데이터베이스 아이디로 임시지정
  const itemId = selectedItem.dataset.id;
  // 클릭한 상품 id 로컬 스토리지에 저장
  saveRecentProduct(itemId);
}

menuContainer.addEventListener("click", handleAddProduct);

// 로컬스토리지에 저장된 id값으로 데이터베이스에서 이미지 불러오기
async function getSavedRecentProduct() {
  if (await getStorage("recentProducts")) {
    const productValue = await getStorage("recentProducts");
    for (let item of productValue) {
      const data = await pb.collection("products").getOne(item);
      const template = `<div class="swiper-slide">
    <img src="${getPbImageURL(data)}" alt="" />
  </div>`;
      insertLast(itemContainer, template);
    }
    swiper.update();
  }
}

document.addEventListener("DOMContentLoaded", getSavedRecentProduct);

// 최근 상품 저장 함수
async function saveRecentProduct(productId) {
  // recentProducts 키 있는지 확인 , 없으면 배열 생성
  const recentProducts = (await getStorage("recentProducts")) || [];
  // 새로운 요소 추가
  recentProducts.unshift(productId);
  // 10개만 보기
  const fiveRecentProducts = recentProducts.slice(0, 10);
  // 5개로 정리된 value 로컬 스토리지에 저장
  await setStorage("recentProducts", fiveRecentProducts);
}
