import { getNode, addClass } from "/src/lib/index.js";

const TopBanner = getNode(".top-banner");
const closeButton = getNode(".top-banner > button");

async function isPopupLoading() {
  let now = new Date();
  now = now.setTime(now.getTime());
  let hideToday = (await localStorage.getItem("topBannerExp")) > now;

  if (TopBanner) {
    if (hideToday) {
      TopBanner.style.display = "none";
    }
  } else {
    console.warn("Popup element not found.");
  }
}

//페이지 로딩시 팝업창 띄울지 여부 확인
document.addEventListener("DOMContentLoaded", isPopupLoading);

// 팝업 하루동안 안보이기
function HidePopupToday() {
  if (TopBanner) {
    addClass(TopBanner, "is__hide");
    setStorage("topBannerExp", 1);
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

if (closeButton) {
  closeButton.addEventListener("click", HidePopupToday);
} else {
  console.warn("Hide button element not found.");
}
