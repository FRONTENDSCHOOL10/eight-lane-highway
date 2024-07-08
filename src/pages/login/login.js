import PocketBase from "pocketbase";

const pb = new PocketBase("https://eight-lane-highway.pockethost.io/");

const loginButton = document.querySelector(".login-form__button");

async function getLocalItems(key) {
  if (typeof key === "string") {
    return await JSON.parse(localStorage.getItem(key));
  }
}

function handleLogin(e) {
  e.preventDefault(e);

  const userId = document.querySelector("#idField").value;
  const userPw = document.querySelector("#pwField").value;

  pb.collection("users")
    .authWithPassword(userId, userPw)
    .then(
      async () => {
        const { model, token } = await JSON.parse(
          localStorage.getItem("pocketbase_auth")
        );

        console.log(model, token);

        localStorage.setItem(
          "auth",
          JSON.stringify({ model: model, token: token })
        );

        alert("🎉로그인에 성공하셨습니다🎉");
        // location.href = "/";
      },
      () => {
        alert("잘못된 로그인 또는 비밀번호 정보입니다!");
      }
    );
}

loginButton.addEventListener("click", handleLogin);
