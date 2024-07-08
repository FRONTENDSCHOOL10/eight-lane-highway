import { getNode } from "../../lib/dom/getNode";
import { insertAfter } from "../../lib/dom/insert";

const upperArrow = getNode(".upper-arrow");
const belowArrow = getNode(".below-arrow");
const product1 = getNode("#product1");
const itemContainer = getNode(".recent-product-item-container");

function handleAddProduct() {
  let item = document.createElement("div");
  item.className = "addedProduct";
  itemContainer.insertAdjacentElement("afterend", item);
  console.log(item);
}

product1.addEventListener("click", handleAddProduct);

// console.log(upperArrow, belowArrow, product1);
