import PocketBase from "pocketbase";

const pb = new PocketBase("https://eight-lane-highway.pockethost.io/");

const loginButton = document.querySelector(".login-form__button");

function handleLogin(e) {
  e.preventDefault(e);

  const userId = document.querySelector("#idField").value;
  const userPw = document.querySelector("#pwField").value;

  pb.collection("users")
    .authWithPassword(userId, userPw)
    .then(
      async () => {
        const { record, token } = await pb
          .collection("users")
          .authWithPassword(userId, userPw);

        alert("🎉로그인에 성공하셨습니다🎉");
        location.href = "/";
      },
      () => {
        alert("잘못된 로그인 또는 비밀번호 정보입니다!");
      }
    );
}

loginButton.addEventListener("click", handleLogin);
