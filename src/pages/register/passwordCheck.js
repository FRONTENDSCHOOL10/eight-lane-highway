class PasswordMatcher {
  constructor(passwordFieldId, confirmPasswordFieldId, messageFieldId) {
    this.passwordField = document.getElementById(passwordFieldId);
    this.confirmPasswordField = document.getElementById(confirmPasswordFieldId);
    this.messageField = document.getElementById(messageFieldId);

    if (this.passwordField && this.confirmPasswordField && this.messageField) {
      this.addEventListeners();
    }
  }

  addEventListeners() {
    this.passwordField.addEventListener("input", () => this.checkPasswords());
    this.confirmPasswordField.addEventListener("input", () =>
      this.checkPasswords()
    );
    this.passwordField.addEventListener("focusout", () =>
      this.checkPasswords()
    );
    this.confirmPasswordField.addEventListener("focusout", () =>
      this.checkPasswords()
    );
  }

  checkPasswords() {
    const password = this.passwordField.value;
    const confirmPassword = this.confirmPasswordField.value;

    if (password === confirmPassword) {
      this.messageField.textContent = "비밀번호가 일치합니다.";
      this.messageField.style.color = "green";
    } else {
      this.messageField.textContent = "비밀번호가 일치하지 않습니다.";
      this.messageField.style.color = "red";
    }
  }
}

// DOM이 완전히 로드된 후에 PasswordMatcher 인스턴스를 생성합니다.
document.addEventListener("DOMContentLoaded", () => {
  new PasswordMatcher("pwField", "pwCheckField", "passwordCheckMessage");
});
