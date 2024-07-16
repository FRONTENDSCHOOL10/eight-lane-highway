const popup = document.querySelector(".pop-up-container");
import { addClass, removeClass } from "/src/lib/dom/css.js";
const hideButton = document.querySelector("#hidePopup");
const closeButton = document.querySelector("#closePopup");
const buttonGroup = document.querySelector(".button-container");

// 팝업창 닫기
// 모달창 close함수로 닫고 display none으로 보이지 않게 처리
function closePopup() {
  if (popup) {
    addClass(popup, "is__hide");
  } else {
    console.warn("Popup element not found.");
  }
}

// 현재시간과 로컬스토리지에 저장된 시간값 비교 => 현재시간이 더 크다면 팝업창 열지않기
async function isPopupLoading() {
  let now = new Date();
  now = now.setTime(now.getTime());
  let hideToday = (await localStorage.getItem("popupExp")) > now;

  if (popup) {
    if (hideToday) {
      addClass(popup, "is__hide");
    } else {
      removeClass(popup, "is__hide");
    }
  } else {
    console.warn("Popup element not found.");
  }
}

//페이지 로딩시 팝업창 띄울지 여부 확인
document.addEventListener("DOMContentLoaded", isPopupLoading);

// 팝업 하루동안 안보이기
function HidePopupToday() {
  if (popup) {
    addClass(popup, "is__hide");
    setStorage("popupExp", 1);
  } else {
    console.warn("Popup element not found.");
  }
}

// 오늘 하루 안 보기 만료 시간 storage 저장
function setStorage(name, exp) {
  // 만료 시간 구하기(exp를 ms단위로 변경)
  let date = new Date();
  date = date.setTime(date.getTime() + exp * 60 * 60 * 24 * 1000);

  // 로컬 스토리지에 저장하기
  localStorage.setItem(name, date);
}

if (hideButton) {
  hideButton.addEventListener("click", HidePopupToday);
} else {
  console.warn("Hide button element not found.");
}

if (closeButton) {
  closeButton.addEventListener("click", closePopup);
} else {
  console.warn("Close button element not found.");
}
