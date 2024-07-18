import "/src/component/footer/footer.js";
import "/src/component/header/header.js";
import {
  addClass,
  formatPrice,
  getNode,
  getStorage,
  insertAfter,
  toggleClass,
} from "/src/lib";
import { countChange, emptyCartRender } from "/src/pages/cart/countedItem";
import { deleteItem, deleteSelected } from "/src/pages/cart/delete";
import { hidePrice } from "/src/pages/cart/hidePrice";
import selectAll from "/src/pages/cart/selectAll";
import { priceChange } from "/src/pages/cart/sumAllPrice";
import { syncCheckBox } from "/src/pages/cart/syncCheckBox";
import { countNumber } from "/src/pages/cart/updatePrice";

const AccordCold = getNode("#foodTypeCold");
const AccordFrozen = getNode("#foodTypeFrozen");
const AccordRoomTemp = getNode("#foodTypeRoomTemp");

// 버튼 클릭시 아코디언 오픈
function toggleHandler(e) {
  const target = e.target;
  const toggleButton = target.closest(".food-type__button");
  if (!toggleButton) return;
  const accordion = toggleButton.closest(".food-type__item");
  toggleClass(accordion, "is__hide");
  toggleClass(toggleButton, "is__deactivate");
}
getNode(".food-type__container").addEventListener("click", toggleHandler);

// 로컬스토리지 저장된 상품정보 랜더링
async function getCartAddedProductsNew() {
  if (await getStorage("cartItems")) {
    const product = await getStorage("cartItems");
    if (product.length === 0) {
      emptyCartRender();
    } else {
      for (let item of product) {
        const pack = item.packaging;
        const type = pack.slice(0, 2);
        const templete = ` <div class="cart__accordion" >
      <input
      type="checkbox"
      id="cartAddedSelect"
      class="cart__accordion__input"  name="accordion__input" />
      <a href="/src/pages/product/product-detail.html?product=${
        item.productID
      }">
      <img src="${item.imgURL}" alt="${
          item.name
        }" class="cart__accordion__img" />
    <label for="cartAddedSelect" class="cart__accordion__name"
      >${item.name}</label
    >
    </a>
    <div class="cart__accordion__count price_counter">
      <button type="button" class="minus-button">
        <img src="/images/minus-button-black.svg" alt="수량 감소 버튼" />
      </button>
      <span class="counter">${item.quantity}</span>
      <button type="button" class="plus-button">
        <img src="/images/plus-button-black.svg" alt="수량 추가 버튼" />
      </button>
    </div>

    <span class="cart__accordion__price">
    <span class="cart__accordion__price__discount">${formatPrice(
      item.price * ((100 - item.discount) / 100) * item.quantity
    )}원</span>
    <span class="cart__accordion__price__value">${formatPrice(
      item.price * item.quantity
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
  const adressBox = getNode(".adress__container");

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
