// 전체선택 관련 함수
export default class selectAll {
  constructor(checkAllSelector, checkItemSelector) {
    this.checkAllElement = document.querySelector(checkAllSelector);
    this.checkItemElements = document.getElementsByName(checkItemSelector);

    if (this.checkAllElement && this.checkItemElements.length > 0) {
      this.init();
    } else {
      console.warn(
        "AgreementManager: Required elements are not found on the page."
      );
    }
  }

  //초기설정
  init() {
    this.checkAllElement.addEventListener("change", () => this.checkAll());
    Array.from(this.checkItemElements).forEach((checkItem) => {
      checkItem.addEventListener("change", () => this.updateCheckAll());
    });
  }

  //전체선택 상태 따라 개별 체크박스 선택 변경
  checkAll() {
    Array.from(this.checkItemElements).forEach((checkItem) => {
      checkItem.checked = this.checkAllElement.checked;
    });
  }

  // 모든 체크박스 선택됐을때 전체선택 박스 checked
  updateCheckAll() {
    const allChecked = Array.from(this.checkItemElements).every(
      (checkItem) => checkItem.checked
    );
    this.checkAllElement.checked = allChecked;
  }
}
