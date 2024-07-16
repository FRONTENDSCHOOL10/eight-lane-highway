import { formatPrice } from "../../lib";
import { valueTrimmed } from "./sumAllPrice";

// 수량 변경 및 가격변경 함수
export function countNumber() {
  const counterSets = document.querySelectorAll(".food-type__accordion");

  counterSets.forEach((set) => {
    const counterElement = set.querySelector(".counter");
    const minusButton = set.querySelector(".minus-button");
    const plusButton = set.querySelector(".plus-button");
    const priceValue = set.querySelector(".food-type__accordion__price__value");
    const priceDiscount = set.querySelector(
      ".food-type__accordion__price__discount"
    );
    let count = Number(counterElement.textContent);
    const dataPrice = valueTrimmed(priceValue) / count;
    const dataDiscount = valueTrimmed(priceDiscount) / count;

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
