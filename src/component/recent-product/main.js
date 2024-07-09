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
const itemContainer = getNode(".added-item-container");
const menuContainer = getNode(".product-menu-item");

// 링크 클릭시 해당 상품 아이디를  saveRecentProduct를 통해 로컬스토리지 저장
function handleAddProduct(e) {
  const target = e.target;
  const selectedItem = target.closest("li");
  if (!selectedItem) return;
  // 상품각각의 data-id 값을 데이터베이스 아이디로 임시지정
  const ItemId = selectedItem.dataset.id;
  // 클릭한 상품 id 로컬 스토리지에 저장
  saveRecentProduct(ItemId);
}

menuContainer.addEventListener("click", handleAddProduct);

async function getId() {
  if (await getStorage("recentProducts")) {
    const productValue = await getStorage("recentProducts");
    for (let item of productValue) {
      const data = await pb.collection("products").getOne(item);
      const template = `<div class="added-product">
    <img src="${getPbImageURL(data)}" alt="" />
  </div>`;
      insertLast(itemContainer, template);
    }
  }
}

document.addEventListener("DOMContentLoaded", getId);

// 데이터 불러오는 함수
// itemId => id값
async function setData(itemId) {
  const data = await pb.collection("products").getOne(itemId);
  const { name, subtitle, price, seller, packaging, unit, photo } = data;

  const template = `<div class="added-product">
    <img src="${getPbImageURL(data)}" alt="" />
  </div>`;
  insertLast(itemContainer, template);
}

// setData("agiethsdi3a56uo");

// 최근 상품 저장 함수
async function saveRecentProduct(productId) {
  // recentProducts 키 있는지 확인 , 없으면 배열 생성
  const recentProducts = (await getStorage("recentProducts")) || [];
  // 새로운 요소 추가
  recentProducts.unshift(productId);
  // 5개만 보기
  const recentProductsTrimmed = recentProducts.slice(0, 5);
  // 5개로 정리된 value 로컬 스토리지에 저장
  await setStorage("recentProducts", recentProductsTrimmed);
}
