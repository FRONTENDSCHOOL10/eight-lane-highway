import PocketBase from "pocketbase";
import "/main.js";
import "/src/pages/register/checkAll.js";
import "/src/pages/register/passwordCheck.js";
import "/src/pages/register/emailCheck.js";
import "/src/pages/register/idCheck.js";
import { sample6_execDaumPostcode } from "/src/pages/register/userAddress.js";
import { setupNameCheck } from "/src/pages/register/nameCheck.js";

const pb = new PocketBase("https://eight-lane-highway.pockethost.io");

document
  .getElementById("registerForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!(await sendit())) {
      return;
    }

    const userId = document.getElementById("idField").value;
    const password = document.getElementById("pwField").value;
    const userName = document.getElementById("nameField").value;
    const userPhone = document.getElementById("phoneField").value;
    const userEmail = document.getElementById("emailField").value;
    const userGender = document.querySelector(
      'input[name="radioGender"]:checked'
    ).value;
    const userBirth = document.getElementById("birthField").value;
    const userChoice = document.querySelector(
      'input[name="radioAddInput"]:checked'
    ).value;
    const adAllow = document.getElementById("adAllow").checked;
    const postCode = document.querySelector("#sample6_postcode").value;
    const userDefaultAddress = document.querySelector("#sample6_address").value;
    const detailAddress = document.querySelector(
      "#sample6_detailAddress"
    ).value;
    const userAddress =
      "(" + postCode + ")" + userDefaultAddress + detailAddress;

    try {
      const data = {
        userEmail: userId,
        password: password,
        name: userName,
        phoneNumber: userPhone,
        email: userEmail,
        passwordConfirm: password,
        gender: userGender,
        birth: userBirth,
        choice: userChoice,
        adAllow: adAllow,
        address: userAddress,
      };

      const record = await pb.collection("users").create(data);

      alert("회원가입 성공");
      window.location.href = "/src/pages/login/index.html";
    } catch (error) {
      console.error("Error:", error);
      alert("회원가입 중 오류 발생: " + error.message);
    }
  });

async function sendit() {
  const userId = document.getElementById("idField");
  const userPw = document.getElementById("pwField");
  const userPwCheck = document.getElementById("pwCheckField");
  const name = document.getElementById("nameField");
  const phone = document.getElementById("phoneField");
  const email = document.getElementById("emailField");

  // 정규 표현식
  const expIdText = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const expPwText =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const expNameText = /^[가-힣]+$/;
  const expPhoneText = /^01[016789][0-9]{3,4}[0-9]{4}$/;

  if (userId.value === "") {
    alert("아이디를 입력하세요");
    userId.focus();
    return false;
  }

  if (!expIdText.test(userId.value)) {
    alert("아이디가 유효하지 않습니다");
    userId.focus();
    return false;
  }

  if (userPw.value === "") {
    alert("비밀번호를 입력하세요");
    userPw.focus();
    return false;
  }

  if (!expPwText.test(userPw.value)) {
    alert("비밀번호가 유효하지 않습니다");
    userPw.focus();
    return false;
  }

  if (userPw.value !== userPwCheck.value) {
    alert("비밀번호가 동일하지 않습니다");
    userPwCheck.focus();
    return false;
  }

  if (!expNameText.test(name.value)) {
    alert("이름은 한글로 입력하세요");
    name.focus();
    return false;
  }

  if (!expPhoneText.test(phone.value)) {
    alert("휴대폰 번호 형식이 올바르지 않습니다.");
    phone.focus();
    return false;
  }

  return true;
}

document.getElementById("phoneField").addEventListener("keydown", function (e) {
  if (!isNumberKey(e)) {
    e.preventDefault();
  }
});

function isNumberKey(event) {
  // 허용할 키 코드: 숫자 키, 백스페이스, 삭제, 화살표 키 등
  const allowedKeys = [8, 9, 37, 38, 39, 40, 46];
  if (allowedKeys.includes(event.keyCode)) {
    return true;
  }
  // 숫자 키(0-9)
  if (event.keyCode >= 48 && event.keyCode <= 57) {
    return true;
  }
  // 숫자 키패드(0-9)
  if (event.keyCode >= 96 && event.keyCode <= 105) {
    return true;
  }
  return false;
}

document.addEventListener("DOMContentLoaded", () => {
  setupNameCheck("nameField", "warningMessage");
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("userAddressButton").addEventListener("click", () => {
    sample6_execDaumPostcode();
  });
});
