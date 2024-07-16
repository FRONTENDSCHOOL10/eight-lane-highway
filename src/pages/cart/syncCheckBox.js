// 위아래 전체선택 체크 박스 동기화
export function syncCheckBox(checkBox) {
  const checkAllBoxes = document.querySelectorAll(checkBox);

  checkAllBoxes.forEach((box) => {
    box.addEventListener("change", () => {
      syncCheckAllBoxes(box.checked);
    });
  });

  function syncCheckAllBoxes(isChecked) {
    checkAllBoxes.forEach((box) => {
      box.checked = isChecked;
    });
  }
}
