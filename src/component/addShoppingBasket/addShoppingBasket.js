const counterButton = document.querySelector(".price_counter");
const productPrice = document.getElementById("product__price");
const countProductNum = document.getElementById("product__num");
const totalProduct = document.getElementById("total");

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

counterButton.addEventListener("click", handleCounterProduct);
