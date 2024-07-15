import getPbImageURL from "../../api/getPbImageURL";
import pb from "../../api/pocketbase";
import {
  addClass,
  formatPrice,
  getNode,
  getNodes,
  getStorage,
  insertAfter,
  insertLast,
  isString,
  removeClass,
  toggleClass,
} from "../../lib";
import { countChange, updateSelectedCount } from "./countedItem";
import { deleteItem, deleteSelected } from "./delete";
import selectAll from "./selectAll";
import { priceChange } from "./sumAllPrice";
import { syncCheckBox } from "./syncCheckBox";
import { countNumber } from "./updatePrice";

const foodTypeNav = getNode(".food-type__container");
const AccordCold = getNode("#foodTypeCold");
const AccordFrozen = getNode("#foodTypeFrozen");
const AccordRoomTemp = getNode("#foodTypeRoomTemp");
const adressBox = getNode(".adress__container");
const orderButton = getNode(".adress-payment__order");

// 버튼 클릭시 아코디언 오픈
function toggleHandler(e) {
  const target = e.target;
  const toggleButton = target.closest(".food-type__button");
  if (!toggleButton) return;
  const accordion = toggleButton.closest(".food-type__item");
  toggleClass(accordion, "is__show");
  toggleClass(toggleButton, "is__active");
}
foodTypeNav.addEventListener("click", toggleHandler);

async function getCardAddedProductsNew() {
  if (await getStorage("cartItems")) {
    const product = await getStorage("cartItems");

    for (let item of product) {
      const data = await pb.collection("products").getOne(item.productID);
      const type = data.packaging.slice(0, 2);
      const quantity = item.quantity;
      const templete = ` <div class="food-type__accordion" ><input
      type="checkbox"
      id="cartAddedSelect"
      class="food-type__accordion__input"  name="accordion__input" />
    <img src="${getPbImageURL(
      data
    )}" alt="" class="food-type__accordion__img" />
    <label for="cartAddedSelect" class="food-type__accordion__name"
      >${data.name}</label
    >
    <div class="food-type__accordion__count price_counter">
      <button type="button" class="minus-button">
        <img src="/images/minus-button-black.svg" alt="수량 감소 버튼" />
      </button>
      <span class="counter">${quantity}</span>
      <button type="button" class="plus-button">
        <img src="/images/plus-button-black.svg" alt="수량 추가 버튼" />
      </button>
    </div>

    <span class="food-type__accordion__price">
    <span class="food-type__accordion__price__discount">${formatPrice(
      data.price * ((100 - data.discount) / 100) * quantity
    )}원</span>
    <span class="food-type__accordion__price__value">${formatPrice(
      data.price * quantity
    )}원</span>
    </span>
    <button
      type="button"
      class="food-type__accordion__delete"></button></div>`;
      if (type === "냉장") {
        insertAfter(AccordCold, templete);
      } else if (type === "냉동") {
        insertAfter(AccordFrozen, templete);
      } else if (type === "상온") {
        insertAfter(AccordRoomTemp, templete);
      }
    }
    new selectAll("#selectAll", "accordion__input");
    new selectAll("#selectAll2", "accordion__input");
    countNumber();
    deleteSelected();
    deleteItem();
    countChange();
    priceChange();
  }
}

document.addEventListener("DOMContentLoaded", getCardAddedProductsNew);

// 로그인 상태에 따른 UI 변경
async function isLogin() {
  const auth = await getStorage("auth");
  const adress = getNode(".adress__client-adress");
  const badge = getNode(".point-badge");
  const rate = getNode(".point-rate");
  const rateUnlogin = getNode(".point-rate__unlogin");

  if (auth && auth.isLogin) {
    addClass(adressBox, "is__show");
    orderButton.textContent = "주문하기";
    adress.textContent = `${auth.userInfo.address}`;
    addClass(badge, "is__show");
    addClass(rate, "is__show");
    addClass(rateUnlogin, "is__hide");
  }
}

document.addEventListener("DOMContentLoaded", isLogin);
document.addEventListener(
  "DOMContentLoaded",
  syncCheckBox(".checkbox__check-all__box")
);

// 받은 가격 원단위, 숫자단위 떼기
function valueTrimmed(value) {
  return value.textContent
    .substr(0, value.textContent.length - 1)
    .replace(",", "");
}
