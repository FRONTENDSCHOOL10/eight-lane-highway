// 선택수량 업데이트 함수
export function updateSelectedCount() {
  const checkboxes = Array.from(
    document.querySelectorAll(".food-type__accordion__input")
  );
  const checked = document.querySelector(".checkbox__check-all__label");
  const selectedCount = checkboxes.filter(
    (checkbox) => checkbox.checked
  ).length;
  checked.textContent = `전체선택 (${selectedCount}/${checkboxes.length})`;
}

// 전체 상품 갯수 랜더링 및 상품 선택시 선택된 상품 갯수 업데이트
export function countChange() {
  const templates = document.querySelectorAll(".food-type__accordion");
  const checkboxes = Array.from(
    document.querySelectorAll(".food-type__accordion__input")
  );
  const checked = document.querySelector(".checkbox__check-all__label");
  // 전체수량 반영
  checked.textContent = `전체선택 (0/${checkboxes.length})`;
  // 선택된 수량 반영
  Array.from(templates).forEach((checkbox) => {
    const inputBox = checkbox.querySelector(".food-type__accordion__input");
    const deleteButton = checkbox.querySelector(
      ".food-type__accordion__delete"
    );
    const checkAllInput = document.querySelector("#selectAll");
    const deleteAllButton = document.querySelector(".checkbox__delete");
    inputBox.addEventListener("change", updateSelectedCount);
    deleteButton.addEventListener("click", updateSelectedCount);
    checkAllInput.addEventListener("change", updateSelectedCount);
    deleteAllButton.addEventListener("click", updateSelectedCount);
  });
}
