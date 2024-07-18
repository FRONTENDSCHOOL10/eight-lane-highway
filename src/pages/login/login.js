import "/src/component/header/header.js";
import "/src/component/footer/footer.js";

import PocketBase from "pocketbase";

const pb = new PocketBase("https://eight-lane-highway.pockethost.io/");

const loginButton = document.querySelector(".login-form__button");

// 로컬스토리지로부터 아이템을 가져오는 함수(like getStorage)
async function getLocalItems(key) {
  if (typeof key === "string") {
    return await JSON.parse(localStorage.getItem(key));
  }
}

// 로컬스토리지로부터 아이템을 가져오는 함수(like setStorage)
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
        const { model, token } = await getLocalItems("pocketbase_auth"); // 구조 할당으로 model과 token 추출

        setLocalItem("auth", {
          isLogin: model ? true : false, // model이 있으면 true를 없으면 false를 저장하도록 지정
          userInfo: model,
          token,
        });

        alert("🎉로그인에 성공하셨습니다🎉");
        location.href = "/"; // 로그인 성공 시 메인 화면으로 이동할 수 있도록 설정
      },
      () => {
        alert("잘못된 로그인 또는 비밀번호 정보입니다!"); // 틀렸을 시 alert 창 띄우고 페이지 리로드
        location.reload();
      }
    );
}

loginButton.addEventListener("click", handleLogin);
