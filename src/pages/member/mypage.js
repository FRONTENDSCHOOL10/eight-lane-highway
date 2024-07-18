import "/main.js";

import PocketBase from "pocketbase";
import { getStorage, setStorage, insertLast } from "/src/lib/index.js";
const pb = new PocketBase("https://eight-lane-highway.pockethost.io/");
const shadowRoot = document.querySelector("c-header").shadowRoot;
const register = shadowRoot.querySelector(".register");
const login = shadowRoot.querySelector(".login");
const addressModal = shadowRoot.querySelector(
  ".nav__user-service__item__address-modal"
);

async function getUserData() {
  return await pb.collection("users").getFullList();
}

getUserData();
function formatDate(dateString) {
  return dateString.split(" ")[0];
}

async function renderUserData() {
  const userData = await getUserData();
  const {
    name,
    address,
    birth,
    email,
    phoneNumber,
    userEmail,
    created,
    adAllow,
  } = userData[0];

  const formattedBirth = formatDate(birth);
  const formattedCreated = formatDate(created);

  const template = `
  <div class="mypage__sub__container">
  <aside class="member__info">
    <div class="profile__container">
      <div class="text__container">
        <h2 class="text__gradient"><span>반가워요!</span></h2>
        <h2>${name}님</h2>
      </div>
      <div class="user__point">
        <div class="user__save__point">
          <h3>적립금</h3>
          <p>0원</p>
        </div>
        <div class="user__cash__point">
          <h3>컬리캐시</h3>
          <p>0원</p>
        </div>
      </div>
    </div>
    <div class="mypage__menu__container">
      <h4>메뉴</h4>
      <ul class="mypage__menu">
        <li>
          <a href="" id="cancelMember">
            <div class="icon__container">
              <img src="/images/icon-order-list.svg" alt="리스트 아이콘" />
            </div>
            <h3>회원 탈퇴</h3>
          </a>
        </li>
        <li>
          <a href="">
            <div class="icon__container">
              <img src="/images/icon-like-heart.svg" alt="리스트 아이콘" />
            </div>
            <h3>찜한 상품</h3>
          </a>
        </li>
        <li>
          <a href="">
            <div class="icon__container">
              <img src="/images/icon-coupon.svg" alt="리스트 아이콘" />
            </div>
            <h3>상품 후기</h3>
          </a>
        </li>
        <li>
          <a href="">
            <div class="icon__container">
              <img src="/images/icon-product-qna.svg" alt="리스트 아이콘" />
            </div>
            <h3>상품 문의</h3>
          </a>
        </li>
      </ul>
    </div>
  </aside>
  <div class="member__detail">
    <h1>회원 정보</h1>
    <div class="user__info">
      <div class="profile__detail">
        <div class="profile__image">
          <img src="" alt="" />
        </div>
      </div>
      <table>
        <colgroup>
          <col style="width: 120px" />
          <col style="width: auto" />
        </colgroup>
        <tr>
          <th>이름</th>
          <td>${name}</td>
        </tr>
        <tr>
          <th>아이디</th>
          <td>${email}</td>
        </tr>
        <tr>
          <th>이메일</th>
          <td>${userEmail}</td>
        </tr>
        <tr>
          <th>연락처</th>
          <td>${phoneNumber}</td>
        </tr>
        <tr>
          <th>주소</th>
          <td>${address}</td>
        </tr>
        <tr>
          <th>생일</th>
          <td>${formattedBirth}</td>
        </tr>
        <tr>
          <th>가입일자</th>
          <td>${formattedCreated}</td>
        </tr>
        <tr>
          <th>광고 수신 동의</th>
          <td>${adAllow ? "동의" : "거부"}</td>
        </tr>
      </table>
    </div>
  </div>
</div>`;

  insertLast(".mypage__container", template);
}

renderUserData();

(async () => {
  // 사용자의 인증 토큰을 가져오는 함수
  async function getAuthId() {
    const userAuth = await getStorage("auth");
    if (!userAuth) return;
    return userAuth.userInfo; // authObject에서 id 반환
  }
  // 회원 탈퇴 함수
  async function deleteAccount(e) {
    e.preventDefault();
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
  document.body.addEventListener("click", (e) => {
    const target = e.target.closest("#cancelMember");
    if (target) {
      deleteAccount(e);
    }
  });
})();
