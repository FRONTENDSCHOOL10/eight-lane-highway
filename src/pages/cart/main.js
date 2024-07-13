import getPbImageURL from "../../api/getPbImageURL";
import pb from "../../api/pocketbase";
import {
  addClass,
  formatPrice,
  getNode,
  getStorage,
  insertAfter,
  insertLast,
  isString,
  toggleClass,
} from "../../lib";

const foodTypeNav = getNode(".food-type__container");
const AccordCold = getNode("#foodTypeCold");
const AccordFrozen = getNode("#foodTypeFrozen");
const AccordRoomTemp = getNode("#foodTypeRoomTemp");

// 버튼 클릭시 아코디언 오픈
function toggleHandler(e) {
  const target = e.target;
  const toggleButton = target.closest(".food-type__button");
  if (!toggleButton) return;
  const accordion = toggleButton.closest(".food-type__item");
  toggleClass(accordion, "is__show");
}
foodTypeNav.addEventListener("click", toggleHandler);

// 로컬스토리지 저장된 아이디 값으로 DB에서 상품정보 불러오기
async function getCartAddedProducts() {
  if (await getStorage("recentProducts")) {
    const productValue = await getStorage("recentProducts");
    for (let item of productValue) {
      const data = await pb.collection("products").getOne(item);
      const type = data.packaging.slice(0, 2);
      const templete = ` <div class="food-type__accordion" ><input
      type="checkbox"
      id="cartAddedSelect"
      class="food-type__accordion__input" />
    <img src="${getPbImageURL(
      data
    )}" alt="" class="food-type__accordion__img" />
    <label for="cartAddedSelect" class="food-type__accordion__name"
      >${data.name}</label
    >
    <div class="food-type__accordion__count price_counter">
      <button>
        <img src="/images/minus-button-black.svg" alt="" />
      </button>
      <span>0</span>
      <button>
        <img src="/images/plus-button-black.svg" alt="" />
      </button>
    </div>

    <span class="food-type__accordion__price">
    <span class="food-type__accordion__price__value">${formatPrice(
      data.price * ((100 - data.discount) / 100)
    )}원</span>
    <span class="food-type__accordion__price__discount">${formatPrice(
      data.price
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
  }
}

getCartAddedProducts();

// document.addEventListener("DOMContentLoaded", getCartAddedProducts);

formatPrice;
