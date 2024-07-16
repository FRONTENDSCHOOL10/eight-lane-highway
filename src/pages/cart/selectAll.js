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

  init() {
    this.checkAllElement.addEventListener("change", () => this.checkAll());
    Array.from(this.checkItemElements).forEach((checkItem) => {
      checkItem.addEventListener("change", () => this.updateCheckAll());
    });
  }

  checkAll() {
    Array.from(this.checkItemElements).forEach((checkItem) => {
      checkItem.checked = this.checkAllElement.checked;
    });
  }

  updateCheckAll() {
    const allChecked = Array.from(this.checkItemElements).every(
      (checkItem) => checkItem.checked
    );
    this.checkAllElement.checked = allChecked;
  }
}
