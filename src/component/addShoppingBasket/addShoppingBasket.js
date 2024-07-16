import PocketBase from "pocketbase";
import { insertLast } from "/src/lib/dom/index";
import { setStorage, getStorage } from "/src/lib/utils/storage";
import { isArray } from "/src/lib/utils/type";

const pb = new PocketBase("https://eight-lane-highway.pockethost.io/");

const popup = document.querySelector(".modal");
const button = document.getElementById("button");
console.log(button);

// 템플릿 생성 함수
async function renderAddShoppingCart(productId) {
  const productItem = await pb.collection("products").getOne(productId);

  const templete = `
      <section class="basket-container modal_popup">
      <article class="basket-container__product__num__container">
        <p>${productItem.name}</p>
        <div class="basket-container__product__num__container__box">
          <span id="product__price">${productItem.price}원</span>
          <div class="price_counter">
            <button type="button" id="minusBtn">
              <img src="/images/minus-button-black.svg" alt="" />
            </button>
            <span id="product__num">1</span>
            <button type="button" id="plusBtn">
              <img src="/images/plus-button-black.svg" alt="" />
            </button>
          </div>
        </div>
      </article>
      <article class="basket-container__price__container">
        <div class="basket-container__price__container__sum">
          <span>합계</span>
          <span id="total">${productItem.price}원</span>
        </div>
        <div class="basket-container__price__container__bonus badge__group">
          <p class="badge__accent">적립</p>
          <span>구매시 5원 적립</span>
        </div>
      </article>
      <ul class="basket-container__btn_container">
        <li class="basket-container__btn_container__items">
          <button type="button" class="button__stroke__gray button__large__basket cancel">
            취소
          </button>
        </li>
        <li class="basket-container__btn_container__items">
          <button type='submit' class="button__fill button__large__basket add__cart">
            장바구니 담기
          </button>
        </li>
      </ul>
    </section>
  `;
  insertLast(popup, templete);

  const counterButton = document.querySelector(".price_counter");
  const cancelButton = document.querySelector(".cancel");
  const addCartButton = document.querySelector(".add__cart");
  const countProductNum = document.getElementById("product__num");
  const totalProduct = document.getElementById("total");

  counterButton.addEventListener(
    "click",
    handleCounterProduct(countProductNum, productItem.price, totalProduct)
  );
  cancelButton.addEventListener("click", closeCartPopUp);
  addCartButton.addEventListener("click", handleAddCart(productItem.id));
}

// 상품 갯수 별 가격 증가 / 감소 함수
function handleCounterProduct(countNode, price, resultNode) {
  return function (e) {
    const target = e.target.closest("button");

    if (!target) return;

    if (target.id === "plusBtn") {
      countNode.textContent = parseInt(countNode.textContent) + 1;
      resultNode.textContent = parseInt(resultNode.textContent) + price + "원";
    } else if (target.id === "minusBtn") {
      if (parseInt(countNode.textContent) <= 0) {
        alert("상품 개수가 0보다 작으면 안됩니다!");
        countNode.textContent = 1;
        resultNode.textContent = price + "원";
        return;
      }
      countNode.textContent = parseInt(countNode.textContent) - 1;
      resultNode.textContent = parseInt(resultNode.textContent) - price + "원";
    }
  };
}

// 로컬스토리지에 장바구니 항목 추가 함수
export function handleAddCart(id) {
  return async function (e) {
    e.preventDefault();

    let productNum = document.querySelector("#product__num").textContent;

    let cartItems = await getStorage("cartItems");

    if (!isArray(cartItems)) {
      cartItems = [];
    }

    let existedItems = cartItems.find((item) => item.productID === id);

    console.log(existedItems);

    if (existedItems) {
      existedItems.quantity =
        parseInt(existedItems.quantity) + parseInt(productNum);
    } else {
      cartItems.push({ productID: id, quantity: parseInt(productNum) });
    }

    setStorage("cartItems", cartItems);

    closeCartPopUp(e);
  };
}

// 팝업 관련 함수
export function openCartPopUp(productID) {
  return function (e) {
    e.preventDefault();

    renderAddShoppingCart(productID);

    popup.style.display = "flex";
    document.body.style.overflow = "hidden"; // 팝업 모달 여는 동안 스크롤 못하게 하도록 함
  };
}

export function closeCartPopUp(e) {
  e.preventDefault();

  popup.textContent = "";
  popup.style.display = "none";
  document.body.style.overflow = "visible";
}

// button.addEventListener("click", openCartPopUp("uim90v4a3fmb156"));
