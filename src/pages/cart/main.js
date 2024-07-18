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
  toggleClass,
} from "../../lib";
import { countChange, emptyCartRender } from "./countedItem";
import { deleteItem, deleteSelected } from "./delete";
import { hidePrice } from "./hidePrice";
import selectAll from "./selectAll";
import { priceChange } from "./sumAllPrice";
import { syncCheckBox } from "./syncCheckBox";
import { countNumber } from "./updatePrice";
import "/src/component/footer/footer.js";
import "/src/component/header/header.js";

const AccordCold = getNode("#foodTypeCold");
const AccordFrozen = getNode("#foodTypeFrozen");
const AccordRoomTemp = getNode("#foodTypeRoomTemp");
const adressBox = getNode(".adress__container");
const orderButton = getNode(".adress-payment__button");
const foodTypeNav = getNode(".food-type__container");

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

// 로컬스토리지 저장된 상품정보 pb에서 랜더링
async function getCartAddedProductsNew() {
  if (await getStorage("cartItems")) {
    const product = await getStorage("cartItems");
    if (product.length === 0) {
      emptyCartRender();
    } else {
      for (let item of product) {
        const data = await pb.collection("products").getOne(item.productID);
        const type = data.packaging.slice(0, 2);
        const quantity = item.quantity;
        const templete = ` <div class="cart__accordion" >
      <input
      type="checkbox"
      id="cartAddedSelect"
      class="cart__accordion__input"  name="accordion__input" />
      <a href="/src/pages/product/product-detail.html?product=${data.id}">
      <img src="${getPbImageURL(data)}" alt="${
          data.name
        }" class="cart__accordion__img" />
    <label for="cartAddedSelect" class="cart__accordion__name"
      >${data.name}</label
    >
    </a>
    <div class="cart__accordion__count price_counter">
      <button type="button" class="minus-button">
        <img src="/images/minus-button-black.svg" alt="수량 감소 버튼" />
      </button>
      <span class="counter">${quantity}</span>
      <button type="button" class="plus-button">
        <img src="/images/plus-button-black.svg" alt="수량 추가 버튼" />
      </button>
    </div>

    <span class="cart__accordion__price">
    <span class="cart__accordion__price__discount">${formatPrice(
      data.price * ((100 - data.discount) / 100) * quantity
    )}원</span>
    <span class="cart__accordion__price__value">${formatPrice(
      data.price * quantity
    )}원</span>
    </span>
    <button
      type="button"
      class="cart__accordion__delete"></button>
  
      </div>`;

        // 보관 타입에 따라 구분하여 랜더링
        if (type === "냉장") {
          insertAfter(AccordCold, templete);
        } else if (type === "냉동") {
          insertAfter(AccordFrozen, templete);
        } else if (type === "상온") {
          insertAfter(AccordRoomTemp, templete);
        }
      }
      // 장바구니 품목 랜더링 후 실행될 함수들
      // 선택한 품목 동기화 위 아래
      new selectAll("#selectAll", "accordion__input");
      new selectAll("#selectAll2", "accordion__input");
      // 수량 반영 함수
      countNumber();
      // 선택 삭제 함수
      deleteSelected();
      // 개별 삭제 함수
      deleteItem();
      // 수량변경에 따른 가격변경 함수
      countChange();
      // 결제 영역 가격변경 함수
      priceChange();
      // 할인율 0 hide 조건처리 함수
      hidePrice();
    }
  }
}

// 로그인 상태에 따른 UI 변경
// 로그아웃 상태 => 주소 x 로그인버튼 o 적립관련 멘트 변경
// 로그인 상태 => 고객 주소 o 주문하기버튼 o 적립관련 멘트 변경
async function isLogin() {
  const auth = await getStorage("auth");

  if (auth && auth.isLogin) {
    addClass(adressBox, "is__show");
    getNode(".adress__client-adress").textContent = `${auth.userInfo.address}`;
    addClass(getNode(".point-badge"), "is__show");
    addClass(getNode(".point-rate"), "is__show");
    addClass(getNode(".point-rate__unlogin"), "is__hide");
    addClass(getNode(".payment__button__unlogin"), "is__hide");
    addClass(getNode(".payment__button"), "is__show");
  }
}

document.addEventListener("DOMContentLoaded", getCartAddedProductsNew);
document.addEventListener("DOMContentLoaded", isLogin);
document.addEventListener(
  "DOMContentLoaded",
  syncCheckBox(".checkbox__check-all__box")
);
