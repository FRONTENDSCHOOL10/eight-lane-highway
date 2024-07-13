class AgreementManager {
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
  }

  checkAll() {
    Array.from(this.checkItemElements).forEach((checkItem) => {
      checkItem.checked = this.checkAllElement.checked;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new AgreementManager("#checkAllAgreement", "checkAgreement");
});
