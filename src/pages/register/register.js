function sendit() {
  const userId = document.getElementById("idField");
  const userPw = document.getElementById("pwField");
  const userPwCheck = document.getElementById("pwCheckField");
  const name = document.getElementById("nameField");
  const email = document.getElementById("email");
  const phone = document.getElementById("phoneField");

  // 정규 표현식
  const expIdText = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const expPwText =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const expNameText = /^[가-힣]+$/; // + 반복
  const expPhoneText = /^\d{3}\d{3,4}\d{4}$/;
  const expEmailText = /^[A-Za-z-0-9\-\.]+@[A-Ja-z-0-9\-\.]+\.[A-Ja-z-0-9]+$/;

  if (userId.value == "") {
    alert("아이디를 입력하세요");
    userId.focus();
    return false;
  }

  if (!expIdText.test(userId.value)) {
    alert("아이디가 유효하지 않습니다");
    userId.focus();
    return false;
  }

  if (userPw.value == "") {
    alert("비밀번호를 입력하세요");
    userPw.focus();
    return false;
  }

  if (!expPwText.test(userPw.value)) {
    alert("비밀번호가 유효하지 않습니다");
    userPw.focus();
    return false;
  }
  if (userPw.value != userPwCheck.value) {
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

  if (!expEmailText.test(email.value)) {
    alert("이메일 형식이 올바르지 않습니다.");
    email.focus();
    return false;
  }

  return true;
}
