import { formatPrice, getNode, getNodes } from "../../lib";

// 수량 변경시 총액 변경
export function updateSumAllPrice() {
  const templates = getNodes(".cart__accordion");
  // 체크된 상품 원가 합치기
  const priceArray = Array.from(templates)
    .filter((item) => {
      const checkBox = item.querySelector(".cart__accordion__input");
      return checkBox.checked;
    })
    .map((item) => {
      const price = item.querySelector(".cart__accordion__price__value");
      return Number(valueTrimmed(price));
    });
  // 상품 총 금액
  const valueResult = Array.from(priceArray).reduce(function (
    accumulator,
    currentValue
  ) {
    return accumulator + currentValue;
  },
  0);

  // 체크된 상품 할인 적용된값 합치기
  const discountArray = Array.from(templates)
    .filter((item) => {
      const checkBox = item.querySelector(".cart__accordion__input");
      return checkBox.checked;
    })
    .map((item) => {
      const price = item.querySelector(".cart__accordion__price__discount");
      return Number(valueTrimmed(price));
    });
  // 결제예정금액
  const estimatedPrice = Array.from(discountArray).reduce(function (
    accumulator,
    currentValue
  ) {
    return accumulator + currentValue;
  },
  0);
  // 상품할인금액
  const discountResult = valueResult - estimatedPrice;

  if (valueResult == 0) {
    document.querySelector(".price__group__delivery").textContent = `0 원`;
  }
  // 상품금액
  document.querySelector(".price__group__value").textContent = `${formatPrice(
    valueResult
  )} 원`;
  // 상품할인 금액
  document.querySelector(
    ".price__group__discounted"
  ).textContent = `${formatPrice(-discountResult)} 원`;
  // 결제예정 금액
  document.querySelector(
    ".total-price__sum__value"
  ).textContent = `${formatPrice(estimatedPrice)}`;

  // 할인금액이 0일 경우
  if (discountResult === 0) {
    document.querySelector(".price__group__discounted").textContent = `0 원`;
  }
  // 결제금액이 0이 아니고 3만원 미만인 경우 배송비 3천원
  if (0 !== estimatedPrice && estimatedPrice < 30000) {
    document.querySelector(
      ".total-price__sum__value"
    ).textContent = `${formatPrice(estimatedPrice + 3000)}`;
    document.querySelector(
      ".price__group__delivery"
    ).textContent = `+${formatPrice(3000)} 원`;
  } else {
    document.querySelector(".price__group__delivery").textContent = `0 원`;
  }
}

// 선택삭제, 선택, 삭제클릭시 updateSumAllPrice 이벤트 추가
export function priceChange() {
  const templates = getNodes(".cart__accordion");
  Array.from(templates).forEach((checkbox) => {
    const inputBox = checkbox.querySelector(".cart__accordion__input");
    const deleteButton = checkbox.querySelector(".cart__accordion__delete");
    const checkAllInput = document.querySelector("#selectAll");
    const deleteAllButton = getNode(".checkbox__delete");
    const minusButton = checkbox.querySelector(".minus-button");
    const plusButton = checkbox.querySelector(".plus-button");

    inputBox.addEventListener("change", updateSumAllPrice);
    deleteButton.addEventListener("click", updateSumAllPrice);
    checkAllInput.addEventListener("change", updateSumAllPrice);
    deleteAllButton.addEventListener("click", updateSumAllPrice);
    minusButton.addEventListener("click", updateSumAllPrice);
    plusButton.addEventListener("click", updateSumAllPrice);
  });
}

// 금액 숫자로 변경 함수
export function valueTrimmed(value) {
  return value.textContent
    .substr(0, value.textContent.length - 1)
    .replace(",", "");
}
