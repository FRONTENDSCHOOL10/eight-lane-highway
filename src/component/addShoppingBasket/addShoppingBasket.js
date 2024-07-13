const counterButton = document.querySelector(".price_counter");
const productPrice = document.getElementById("product__price");
const countProductNum = document.getElementById("product__num");
const totalProduct = document.getElementById("total");

const popup = document.querySelector('.modal');
const cancelButton = document.querySelector('.cancel');
const button = document.getElementById('button');


function handleCounterProduct(e) {
  e.preventDefault();

  const target = e.target.closest("button");

  if (!target) return;

  if (target.id === "plusBtn") {
    countProductNum.textContent = parseInt(countProductNum.textContent) + 1;
    totalProduct.textContent = parseInt(totalProduct.textContent) + parseInt(productPrice.textContent) + "원";
  } 
  else if (target.id === "minusBtn") {
    if(parseInt(countProductNum.textContent) <= 0 )
      {
        alert('상품 개수가 0보다 작으면 안됩니다!');
        countProductNum.textContent = 1;
        totalProduct.textContent = 4980 + '원';
        return;
      }
    countProductNum.textContent = parseInt(countProductNum.textContent) - 1;
    totalProduct.textContent = parseInt(totalProduct.textContent) - parseInt(productPrice.textContent) + '원';
  }
}

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

counterButton.addEventListener("click", handleCounterProduct);
button.addEventListener('click', openCartPopUp);
cancelButton.addEventListener('click', closeCartPopUp);
