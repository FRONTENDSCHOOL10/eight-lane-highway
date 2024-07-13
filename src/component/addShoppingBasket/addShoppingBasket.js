import PocketBase from 'pocketbase';
import {insertLast} from '/src/lib/dom/index'

const pb = new PocketBase('https://eight-lane-highway.pockethost.io/');

const counterButton = document.querySelector(".price_counter");
const productPrice = document.getElementById("product__price");
const countProductNum = document.getElementById("product__num");
const totalProduct = document.getElementById("total");

const popup = document.querySelector('.modal');
const cancelButton = document.querySelector('.cancel');
const button = document.getElementById('button');


async function renderAddShoppingCart(){
  const productItem = await pb.collection('products').getOne('4tswqr13jklyoem');

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
        <div class="basket-container__price__container__bonus">
          <span>구매시 5원 적립</span>
        </div>
      </article>
      <ul class="basket-container__btn_container">
        <li class="basket-container__btn_container__items">
          <button class="button__stroke__gray button__large__basket cancel">
            취소
          </button>
        </li>
        <li class="basket-container__btn_container__items">
          <button class="button__fill button__large__basket">
            장바구니 담기
          </button>
        </li>
      </ul>
    </section>
  `
  insertLast(popup, templete);
}

renderAddShoppingCart()


// function handleCounterProduct(e) {
//   e.preventDefault();

//   const target = e.target.closest("button");

//   if (!target) return;

//   if (target.id === "plusBtn") {
//     countProductNum.textContent = parseInt(countProductNum.textContent) + 1;
//     totalProduct.textContent = parseInt(totalProduct.textContent) + parseInt(productPrice.textContent) + "원";
//   } 
//   else if (target.id === "minusBtn") {
//     if(parseInt(countProductNum.textContent) <= 0 )
//       {
//         alert('상품 개수가 0보다 작으면 안됩니다!');
//         countProductNum.textContent = 1;
//         totalProduct.textContent = 4980 + '원';
//         return;
//       }
//     countProductNum.textContent = parseInt(countProductNum.textContent) - 1;
//     totalProduct.textContent = parseInt(totalProduct.textContent) - parseInt(productPrice.textContent) + '원';
//   }
// }

// 팝업 관련 함수
function openCartPopUp(e){
  e.preventDefault();

  popup.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // 팝업 모달 여는 동안 스크롤 못하게 하도록 함
}

function closeCartPopUp(e){
  e.preventDefault();

  popup.style.display = 'none';
  document.body.style.overflow = 'visible';
}

// counterButton.addEventListener("click", handleCounterProduct);
button.addEventListener('click', openCartPopUp);
cancelButton.addEventListener('click', closeCartPopUp);
