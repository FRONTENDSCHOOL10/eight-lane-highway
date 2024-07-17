// 선택수량 업데이트 함수
export function updateSelectedCount() {
  const checkboxes = Array.from(
    document.querySelectorAll(".cart__accordion__input")
  );
  const checked = document.querySelectorAll(".checkbox__check-all__label");
  const selectedCount = checkboxes.filter(
    (checkbox) => checkbox.checked
  ).length;
  Array.from(checked).forEach((item) => {
    item.textContent = `전체선택 (${selectedCount}/${checkboxes.length})`;
  });
}

// 전체 상품 갯수 랜더링 및 상품 선택시 선택된 상품 갯수 업데이트
export function countChange() {
  const templates = document.querySelectorAll(".cart__accordion");

  //전체수량 초기설정
  updateSelectedCount();

  // 다음과 같은 이벤트 발생시 선택된 수량 반영
  Array.from(templates).forEach((checkbox) => {
    const inputBox = checkbox.querySelector(".cart__accordion__input");
    const deleteButton = checkbox.querySelector(".cart__accordion__delete");
    const checkAllInput = document.querySelector("#selectAll");
    const deleteAllButton = document.querySelector(".checkbox__delete");
    inputBox.addEventListener("change", updateSelectedCount);
    deleteButton.addEventListener("click", updateSelectedCount);
    checkAllInput.addEventListener("change", updateSelectedCount);
    deleteAllButton.addEventListener("click", updateSelectedCount);
  });
}
