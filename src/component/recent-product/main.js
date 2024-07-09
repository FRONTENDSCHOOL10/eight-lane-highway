import { getNode, insertAfter, setStorage, insertLast } from "../../lib/index";

import PocketBase from "pocketbase";

const pb = new PocketBase("https://eight-lane-highway.pockethost.io");
const url = "https://eight-lane-highway.pockethost.io";

const upperArrow = getNode(".upper-arrow");
const belowArrow = getNode(".below-arrow");
const product1 = getNode("#product1");
const itemContainer = getNode(".recent-product-item-container");

// function handleAddProduct() {
//   let item = document.createElement("div");
//   item.className = "addedProduct";
//   itemContainer.insertAdjacentElement("afterend", item);
//   console.log(item);

//   setStorage("key", "product1");
// }

// product1.addEventListener("click", handleAddProduct);

function getPbImageURL(item, fileName = "photo") {
  return `${url}/api/files/${item.collectionId}/${item.id}/${item[fileName]}`;
}

// async function getData() {
//   const data = await pb.collection("products").getOne("agiethsdi3a56uo");
//   const { name, subtitle, price, seller, packaging, unit } = data;
//   const photo = getPbImageURL(data);
//   console.log(name, photo);
// }
// getData();

async function setData() {
  const data = await pb.collection("products").getOne("agiethsdi3a56uo");
  const { name, subtitle, price, seller, packaging, unit, photo } = data;

  const template = `<div class="addedProduct">
    <img src="${getPbImageURL(data)}" alt="" />
  </div>`;

  insertLast(".recent-product-item-container", template);

  console.log(getPbImageURL(data));
}

setData();
