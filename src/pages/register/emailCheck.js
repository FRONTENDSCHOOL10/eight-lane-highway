import PocketBase from "pocketbase";

class EmailChecker {
  constructor(url, email, password, emailFieldId, buttonId, messageId) {
    this.pb = new PocketBase(url);
    this.email = email;
    this.password = password;
    this.emailField = document.getElementById(emailFieldId);
    this.button = document.getElementById(buttonId);
    this.message = document.getElementById(messageId);

    this.init();
  }

  async init() {
    try {
      await this.pb.admins.authWithPassword(this.email, this.password);
      this.addEventListeners();
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  }

  addEventListeners() {
    if (this.button) {
      this.button.addEventListener("click", async () => this.checkEmail());
    }
  }

  async checkEmail() {
    const email = this.emailField.value;

    if (email === "") {
      this.setInvalidState("이메일을 입력하세요.");
      return;
    }

    const isUnique = await this.isEmailUnique(email);
    if (isUnique) {
      this.setValidState("사용 가능한 이메일입니다.");
    } else {
      this.setInvalidState("이미 사용중인 이메일입니다.");
    }
  }

  async isEmailUnique(email) {
    try {
      await this.pb.collection("users").getFirstListItem("", {
        filter: `userEmail="${email}"`,
      });
      return false; // 이메일이 있으면 사용 중
    } catch (error) {
      if (error.status === 404) {
        return true; // 이메일이 없으면 사용 가능
      }
      console.error("Error checking email uniqueness:", error);
      return false;
    }
  }

  updateMessage(message, color) {
    if (this.message) {
      this.message.textContent = message;
      this.message.style.color = color;
    }
  }

  setValidState(message) {
    this.updateMessage(message, "#3EF071");
    this.setFieldState(this.emailField, "is__valid");
  }

  setInvalidState(message) {
    this.updateMessage(message, "red");
    this.setFieldState(this.emailField, "is__invalid");
  }

  setFieldState(field, stateClass) {
    field.classList.add(stateClass);

    const removeStateClass = () => field.classList.remove(stateClass);

    field.addEventListener("keydown", removeStateClass, { once: true });
    field.addEventListener("blur", removeStateClass, { once: true });
  }
}

// DOM이 완전히 로드된 후에 EmailChecker 인스턴스를 생성합니다.
document.addEventListener("DOMContentLoaded", () => {
  new EmailChecker(
    "https://eight-lane-highway.pockethost.io/",
    "vanillajs.eightlanehighway@gmail.com",
    "admin0000",
    "emailField",
    "emailCheckDuplicateButton",
    "emailResultMessage"
  );
});
