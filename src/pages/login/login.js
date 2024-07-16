import "/src/component/header/header.js";
import "/src/component/footer/footer.js";

import PocketBase from "pocketbase";

const pb = new PocketBase("https://eight-lane-highway.pockethost.io/");

const loginButton = document.querySelector(".login-form__button");

async function getLocalItems(key) {
  if (typeof key === "string") {
    return await JSON.parse(localStorage.getItem(key));
  }
}

async function setLocalItem(key, value) {
  if (typeof key === "string") {
    localStorage.setItem(key, JSON.stringify(value));
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
        const { model, token } = await getLocalItems("pocketbase_auth");

        setLocalItem("auth", {
          isLogin: model ? true : false,
          userInfo: model,
          token,
        });

        alert("🎉로그인에 성공하셨습니다🎉");
        location.href = "/";
      },
      () => {
        alert("잘못된 로그인 또는 비밀번호 정보입니다!");
      }
    );
}

loginButton.addEventListener("click", handleLogin);
