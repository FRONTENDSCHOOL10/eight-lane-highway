const popup = document.querySelector(".modal");

export function openCartPopUp() {
  popup.style.display = "flex";
  document.body.style.overflow = "hidden"; // 팝업 모달 여는 동안 스크롤 못하게 하도록 함
}
