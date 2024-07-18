export function openCartPopUp() {
  const popup = document.querySelector(".modal");

  if (!popup) {
    console.warn("Popup modal not found.");
    return;
  }

  popup.style.display = "flex";
  document.body.style.overflow = "hidden"; // 팝업 모달 여는 동안 스크롤 못하게 함
}
