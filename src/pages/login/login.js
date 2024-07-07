import PocketBase from "pocketbase";

const pb = new PocketBase("https://eight-lane-highway.pockethost.io/");

const loginButton = document.querySelector(".login-form__button");

function handleLogin(e) {
  e.preventDefault(e);

  const userId = document.querySelector("#idField").value;
  const userPw = document.querySelector("#pwField").value;

  console.log(userId, userPw);

  const auth = pb.collection("users").authWithPassword(userId, userPw);

  console.log(auth);
}

loginButton.addEventListener("click", handleLogin);
