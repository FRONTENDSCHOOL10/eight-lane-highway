import { getNode, getNodes, insertLast } from "../../lib";

// 선택수량 업데이트 함수
export function updateSelectedCount() {
  const checkboxes = Array.from(
    document.querySelectorAll(".cart__accordion__input")
  );
  // 전체 수량 0인경우 전체선택박스 체크해제
  if (checkboxes.length === 0) {
    emptyCartRender();
  }
  const checked = document.querySelectorAll(".checkbox__check-all__label");
  const selectedCount = checkboxes.filter(
    (checkbox) => checkbox.checked
  ).length;
  Array.from(checked).forEach((item) => {
    item.textContent = `전체선택 (${selectedCount}/${checkboxes.length})`;
  });
}

// 장바구니에 상품이 없을경우 '장바구니에 담긴 상품이 없습니다' 띄우는 함수
export function emptyCartRender() {
  const itemContainer = getNode(".food-type__container");
  const checkAll = document.querySelectorAll(".checkbox__check-all__box");
  Array.from(checkAll).forEach((checkAll) => {
    checkAll.checked = false;
    checkAll.disabled = true;
  });
  const removeItem = getNodes(".food-type__item");
  Array.from(removeItem).forEach((removeItem) => {
    removeItem.remove();
  });
  const emptyCart = `<h3 class="food-type__container__empty title__secondary">장바구니에 담긴 상품이 없습니다.</h3>`;
  insertLast(itemContainer, emptyCart);
}

// 전체 상품 갯수 랜더링 및 상품 선택시 선택된 상품 갯수 업데이트
export function countChange() {
  const templates = document.querySelectorAll(".cart__accordion");

  //전체수량 초기설정
  updateSelectedCount();

  // 다음과 같은 이벤트 발생시 선택된 수량 반영
  Array.from(templates).forEach((checkbox) => {
    const inputBox = checkbox.querySelector(".cart__accordion__input");
    inputBox.addEventListener("change", updateSelectedCount);
  });
  const selectAllInput = getNodes(".checkbox__check-all__box");
  Array.from(selectAllInput).forEach((item) => {
    item.addEventListener("change", updateSelectedCount);
  });
}
