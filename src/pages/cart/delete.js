// 선택항목 삭제 함수
export function deleteSelected() {
  const templates = document.querySelectorAll(".food-type__accordion");

  templates.forEach((item) => {
    const deleteButton = item.querySelector(".food-type__accordion__delete");
    deleteButton.addEventListener("click", () => {
      item.remove();
    });
  });
}

// 상품 개별 삭제함수
export function deleteItem() {
  const deleteButton = document.querySelector(".checkbox__delete");
  const checkboxes = document.getElementsByName("accordion__input");
  deleteButton.addEventListener("click", () => {
    Array.from(checkboxes).forEach((checkBox) => {
      if (checkBox.checked) {
        const item = checkBox.closest(".food-type__accordion");
        if (item) {
          item.remove();
        }
      }
    });
  });
}
