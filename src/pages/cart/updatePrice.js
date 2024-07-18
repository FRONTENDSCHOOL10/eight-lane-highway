import { formatPrice, removeClass } from "../../lib";
import { valueTrimmed } from "./sumAllPrice";
import { addClass } from "/src/lib/index.js";

// 수량 변경 및 가격변경 함수
export function countNumber() {
  const counterSets = document.querySelectorAll(".cart__accordion");

  counterSets.forEach((set) => {
    const counterElement = set.querySelector(".counter");
    const minusButton = set.querySelector(".minus-button");
    const plusButton = set.querySelector(".plus-button");
    const priceValue = set.querySelector(".cart__accordion__price__value");
    const priceDiscount = set.querySelector(
      ".cart__accordion__price__discount"
    );
    const minusImg = minusButton.querySelector("img");
    let count = Number(counterElement.textContent);
    if (count <= 1) {
      addClass(minusImg, "is__deactivate");
    }

    const dataPrice = valueTrimmed(priceValue) / count;
    const dataDiscount = valueTrimmed(priceDiscount) / count;

    minusButton.addEventListener("click", () => {
      removeClass(minusImg, "is__deactivate");
      if (count > 1) {
        removeClass(minusImg, "is__deactivate");
        count--;
        counterElement.textContent = count;
        priceValue.textContent = `${formatPrice(count * dataPrice)}원`;
        priceDiscount.textContent = `${formatPrice(count * dataDiscount)}원`;
      }
      addClass(minusImg, "is__deactivate");
    });

    plusButton.addEventListener("click", () => {
      count++;
      removeClass(minusImg, "is__deactivate");
      counterElement.textContent = count;
      priceValue.textContent = `${formatPrice(count * dataPrice)}원`;
      priceDiscount.textContent = `${formatPrice(count * dataDiscount)}원`;
    });
  });
}

// const minusImg = minusButton.querySelector("img");
//     removeClass(minusButton.querySelector("img"), "is__deactivate");
