import PocketBase from "pocketbase";
import { getStorage, setStorage } from "/src/lib/index.js";
const pb = new PocketBase("https://eight-lane-highway.pockethost.io/");

const deleteAccountButton = document.querySelector("#deleteAccountButton");
const shadowRoot = document.querySelector("c-header").shadowRoot;
const register = shadowRoot.querySelector(".register");
const login = shadowRoot.querySelector(".login");
const addressModal = shadowRoot.querySelector(
  ".nav__user-service__item__address-modal"
);

(async () => {
  // 사용자의 인증 토큰을 가져오는 함수
  async function getAuthId() {
    const userAuth = await getStorage("auth");
    if (!userAuth) return;
    return userAuth.userInfo; // authObject에서 id 반환
  }
  // 회원 탈퇴 함수
  async function deleteAccount() {
    if (confirm("정말 탈퇴 하시겠습니까?")) {
      const { id } = await getAuthId(); // 인증 토큰 가져오기
      try {
        // 서버에 회원 정보 삭제 요청
        await pb.collection("users").delete(id);
        // 인증 정보 클리어
        await pb.authStore.clear();
        // 새로고침 전에 UI 업데이트
        const defaultAuthData = {
          isLogin: false,
          userInfo: { name: null },
        };
        // UI 업데이트
        register.innerHTML = `<a href="/src/component/register/index.html" class="register">회원가입</a>`;
        login.innerHTML = `<a href="/src/component/login/index.html" class="login">로그인</a>`;
        addressModal.innerHTML = `
            <p>
              <span>배송지를 등록하고</span><br />구매 가능한 상품을 확인하세요!
            </p>
            <a href="/" class="modal-link modal-login">로그인</a>
            <a href="" class="modal-link modal-search-address"> 주소 검색 </a>`;
        // 인증 정보 저장
        await setStorage("auth", defaultAuthData);
        window.location.href = "/index.html";
      } catch (error) {
        console.error("Failed to delete account:", error);
      }
    }
  }
  // 삭제 버튼에 클릭 이벤트 리스너 등록
  deleteAccountButton.addEventListener("click", deleteAccount);
})();
