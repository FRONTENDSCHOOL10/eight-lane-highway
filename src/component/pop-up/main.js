const popup = document.querySelector(".pop-up-wrapper");
const hideButton = document.querySelector("#hidePopup");
const closeButton = document.querySelector("#closePopup");

// 팝업창 닫기
function closePopup() {
  popup.style.display = "none";
}

//storage 값을 가져왔을때 현재시간보다 크면 visibilty hidden

async function compare() {
  let now = new Date();
  now = now.setTime(now.getTime());
  let hideToday = (await localStorage.getItem("popupExp")) > now;
  if (hideToday) {
    popup.style.visibility = "hidden";
  }
}

//페이지 로딩후 팝업 로딩 여부
document.addEventListener("DOMContentLoaded", compare);

// 팝업 하루동안 안보이기
function hidePopup() {
  popup.style.display = "none";
  setStorage("popupExp", 1);
}

// 오늘 하루 안 보기 만료 시간 storage 저장

function setStorage(name, exp) {
  // 만료 시간 구하기(exp를 ms단위로 변경)
  let date = new Date();
  date = date.setTime(date.getTime() + exp * 60 * 1000);

  // 로컬 스토리지에 저장하기
  localStorage.setItem(name, date);
}

hideButton.addEventListener("click", hidePopup);
closeButton.addEventListener("click", closePopup);
