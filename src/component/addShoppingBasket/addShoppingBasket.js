const counterButton = document.querySelector(".price_counter");
const productPrice = document.getElementById("product__price");
const countProductNum = document.getElementById("product__num");

function handleCounterProduct(e) {
  e.preventDefault();

  const target = e.target.closest("button");

  if (!target) return;

  if (target.id === "plusBtn") {
    countProductNum.textContent = parseInt(countProductNum.textContent) + 1;
  } else if (target.id === "minusBtn") {
    countProductNum.textContent = parseInt(countProductNum.textContent) - 1;
  }
}

counterButton.addEventListener("click", handleCounterProduct);
