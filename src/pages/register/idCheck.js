import PocketBase from "pocketbase";

class IdChecker {
  constructor(url, email, password, idFieldId, buttonId, messageId) {
    this.pb = new PocketBase(url);
    this.email = email;
    this.password = password;
    this.idField = document.getElementById(idFieldId);
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
      this.button.addEventListener("click", async () => this.checkId());
    }
  }

  async checkId() {
    const id = this.idField.value;

    if (id === "") {
      this.updateMessage("아이디를 입력해주세요.", "red");
      return;
    }

    const isUnique = await this.isIdUnique(id);
    if (isUnique) {
      this.updateMessage("사용 가능한 아이디입니다.", "green");
    } else {
      this.updateMessage("이미 사용중인 아이디입니다.", "red");
    }
  }

  async isIdUnique(id) {
    try {
      await this.pb.collection("users").getFirstListItem("", {
        filter: `email="${id}"`,
      });
      return false; // 아이디가 있으면 사용 중
    } catch (error) {
      if (error.status === 404) {
        return true; // 아이디가 없으면 사용 가능
      }
      console.error("Error checking id uniqueness:", error);
      return false;
    }
  }

  updateMessage(message, color) {
    if (this.message) {
      this.message.textContent = message;
      this.message.style.color = color;
    }
  }
}

// DOM이 완전히 로드된 후에 IdChecker 인스턴스를 생성합니다.
document.addEventListener("DOMContentLoaded", () => {
  new IdChecker(
    "https://eight-lane-highway.pockethost.io/",
    "vanillajs.eightlanehighway@gmail.com",
    "admin0000",
    "idField",
    "idCheckDuplicateButton",
    "idResultMessage"
  );
});
