import { addClass } from "../../lib";
import { valueTrimmed } from "./sumAllPrice";

// 할인율 0인 상품 할인전 금액 노출 X (중복 반영 X)
export function hidePrice() {
  const price = document.querySelectorAll(".cart__accordion");
  Array.from(price).forEach((item) => {
    const price = item.querySelector(".cart__accordion__price__discount");
    const discounted = item.querySelector(".cart__accordion__price__value");
    if (valueTrimmed(price) == valueTrimmed(discounted)) {
      addClass(discounted, "is__hide");
    }
  });
}
