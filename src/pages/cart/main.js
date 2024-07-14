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
      class="food-type__accordion__input"  name="accordion__input" />
    <img src="${getPbImageURL(
      data
    )}" alt="" class="food-type__accordion__img" />
    <label for="cartAddedSelect" class="food-type__accordion__name"
      >${data.name}</label
    >
    <div class="food-type__accordion__count price_counter">
      <button type="button" class="minus-button">
        <img src="/images/minus-button-black.svg" alt="" />
      </button>
      <span class="counter">0</span>
      <button type="button" class="plus-button">
        <img src="/images/plus-button-black.svg" alt="" />
      </button>
    </div>

    <span class="food-type__accordion__price">
    <span class="food-type__accordion__price__discount">${formatPrice(
      data.price * ((100 - data.discount) / 100)
    )}원</span>
    <span class="food-type__accordion__price__value">${formatPrice(
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
    new AgreementManager("#selectAll", "accordion__input");
    new AgreementManager("#selectAll2", "accordion__input");
    countNumber();
  }
}

document.addEventListener("DOMContentLoaded", getCartAddedProducts);

// 로그인 됐을때 로그인 버튼에서 => 주문하기로 변경
// 로그인 됐을때 배송지 안보임 => 고객 배송지 정보 받아오기
// isAuth = false
if (false) {
  addClass(adressBox, "is__show");
  orderButton.textContent = "주문하기";
}

// 체크박스 전체선택 관련 함수
// 전체선택 관련 함수
class AgreementManager {
  constructor(checkAllSelector, checkItemSelector) {
    this.checkAllElement = document.querySelector(checkAllSelector);
    this.checkItemElements = document.getElementsByName(checkItemSelector);

    if (this.checkAllElement && this.checkItemElements.length > 0) {
      this.init();
    } else {
      console.warn(
        "AgreementManager: Required elements are not found on the page."
      );
    }
  }

  init() {
    this.checkAllElement.addEventListener("change", () => this.checkAll());
    Array.from(this.checkItemElements).forEach((checkItem) => {
      checkItem.addEventListener("change", () => this.updateCheckAll());
    });
  }

  checkAll() {
    Array.from(this.checkItemElements).forEach((checkItem) => {
      checkItem.checked = this.checkAllElement.checked;
    });
  }

  updateCheckAll() {
    const allChecked = Array.from(this.checkItemElements).every(
      (checkItem) => checkItem.checked
    );
    this.checkAllElement.checked = allChecked;
  }
}
// // 위아래 체크 박스 동기화
function syncCheckBox(checkBox) {
  const checkAllBoxes = document.querySelectorAll(checkBox);

  checkAllBoxes.forEach((box) => {
    box.addEventListener("change", () => {
      syncCheckAllBoxes(box.checked);
    });
  });

  function syncCheckAllBoxes(isChecked) {
    checkAllBoxes.forEach((box) => {
      box.checked = isChecked;
    });
  }
}
document.addEventListener(
  "DOMContentLoaded",
  syncCheckBox(".checkbox__check-all__box")
);

// 수량 변경 및 가격변경 함수 (랜더링되고 나서 실행)
function countNumber() {
  const counterSets = document.querySelectorAll(".food-type__accordion");

  counterSets.forEach((set) => {
    const counterElement = set.querySelector(".counter");
    const minusButton = set.querySelector(".minus-button");
    const plusButton = set.querySelector(".plus-button");
    const priceValue = set.querySelector(".food-type__accordion__price__value");
    const priceDiscount = set.querySelector(
      ".food-type__accordion__price__discount"
    );
    // 받은 가격 원단위, 숫자단위 떼기
    function valueTrimmed(value) {
      return value.textContent
        .substr(0, value.textContent.length - 1)
        .replace(",", "");
    }
    const dataPrice = valueTrimmed(priceValue);
    const dataDiscount = valueTrimmed(priceDiscount);

    let count = Number(counterElement.textContent);

    minusButton.addEventListener("click", () => {
      if (count > 0) {
        count--;
        counterElement.textContent = count;
        priceValue.textContent = `${formatPrice(count * dataPrice)}원`;
        priceDiscount.textContent = `${formatPrice(count * dataDiscount)}원`;
      }
    });

    plusButton.addEventListener("click", () => {
      count++;
      counterElement.textContent = count;
      priceValue.textContent = `${formatPrice(count * dataPrice)}원`;
      priceDiscount.textContent = `${formatPrice(count * dataDiscount)}원`;
    });
  });
}
