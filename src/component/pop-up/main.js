let popup = document.querySelector(".pop-up-container");
const hideButton = document.querySelector("#hidePopup");
const closeButton = document.querySelector("#closePopup");
const buttonGroup = document.querySelector(".close-hide-btn");

popup.showModal();

// 팝업창 닫기
function closePopup() {
  popup.close();
  popup.style.display = "none";
}

//storage 값을 가져왔을때 현재시간보다 크면 visibilty hidden
// style 인라인 속성 => 클래스로 스타일값 주기

async function compare() {
  let now = new Date();
  now = now.setTime(now.getTime());
  let hideToday = (await localStorage.getItem("popupExp")) > now;
  if (hideToday) {
    popup.close();
    popup.style.display = "none";
  }
}

//페이지 로딩후 팝업 로딩 여부
document.addEventListener("DOMContentLoaded", compare);

// 팝업 하루동안 안보이기
function hidePopup() {
  popup.close();
  popup.style.display = "none";
  setStorage("popupExp", 1);
}

// 오늘 하루 안 보기 만료 시간 storage 저장

function setStorage(name, exp) {
  // 만료 시간 구하기(exp를 ms단위로 변경) // 시간 수정 필요
  let date = new Date();
  date = date.setTime(date.getTime() + exp * 60 * 60 * 24 * 1000);

  // 로컬 스토리지에 저장하기
  localStorage.setItem(name, date);
}

// hideButton.addEventListener("click", hidePopup);
// closeButton.addEventListener("click", closePopup);

buttonGroup.addEventListener("click", (e) => {
  const target = e.target;
  const result = target.closest("button");
  const name = result.getAttribute("id");
  if (!name) return;

  if (name == "hidePopup") {
    hidePopup();
  } else {
    closePopup();
  }
});
