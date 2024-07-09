import getPbImageURL from "../../api/getPbImageURL";
import pb from "../../api/pocketbase";
import {
  getNode,
  insertAfter,
  setStorage,
  insertLast,
  getStorage,
} from "../../lib/index";

import PocketBase from "pocketbase";

const upperArrow = getNode(".upper-arrow");
const belowArrow = getNode(".below-arrow");
const product1 = getNode("#product1");
const itemContainer = getNode(".added-item-container");
const menuContainer = getNode(".product-menu-item");

// 링크 클릭스 로컬스토리지에 아이디값 저장
function handleAddProduct(e) {
  const target = e.target;
  const selectedItem = target.closest("li");
  if (!selectedItem) return;
  const ItemId = selectedItem.getAttribute("id");

  // setStorage("key", ItemId);
}

menuContainer.addEventListener("click", handleAddProduct);

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

async function getData() {
  const id = await getStorage("key");
  console.log(id);
}
// getData();

function mola(productId, productName, productImage) {
  if (getStorage(recentProducts))
    // const addItem = recentProducts.unshift({
    //   id: productId,
    //   name: productName,
    //   image: productImage,
    // });
    console.log(setStorage(additem));
}

mola("apple", "사과", "dddk.jpg");
