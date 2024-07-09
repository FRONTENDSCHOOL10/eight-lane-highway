import getPbImageURL from "../../api/getPbImageURL";
import pb from "../../api/pocketbase";
import { getNode, insertAfter, setStorage, insertLast } from "../../lib/index";

import PocketBase from "pocketbase";

const upperArrow = getNode(".upper-arrow");
const belowArrow = getNode(".below-arrow");
const product1 = getNode("#product1");
const itemContainer = getNode(".added-item-container");

// function handleAddProduct() {
//   let item = document.createElement("div");
//   item.className = "addedProduct";
//   itemContainer.insertAdjacentElement("afterend", item);
//   console.log(item);

//   setStorage("key", "product1");
// }

// product1.addEventListener("click", handleAddProduct);

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

  insertLast(itemContainer, template);

  console.log(getPbImageURL(data));
}

setData();
