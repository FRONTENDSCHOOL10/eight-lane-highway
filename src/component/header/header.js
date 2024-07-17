import headerCss from "/src/styles/style.scss?inline";
import {
  addClass,
  removeClass,
  toggleClass,
  getStorage,
  setStorage,
} from "/src/lib/index.js";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://eight-lane-highway.pockethost.io/");
const headerTemplate = document.createElement("template");

headerTemplate.innerHTML = `
<style>${headerCss}</style>
    <header>
      <nav class="nav">
        <h1 class="nav__logo">
          <a href="/">
            <img src="/images/logo.svg" alt="마켓칼리" />
          </a>
        </h1>
        <ul class="nav__user-auth">
          <li class="nav__user-auth__item register" id="register">
            <a href="/src/pages/register/index.html">회원가입</a>
          </li>
          <li class="nav__user-auth__item login" id="login">
            <a href="/src/pages/login/index.html">로그인</a>
          </li>
          <li class="nav__user-auth__item customer-service">
            <a href="/">고객센터</a>
            <ul class="nav__user-auth__notice">
              <li class="nav__user-auth__notice__item notice">
                <a href="/">공지 사항</a>
              </li>
              <li class="nav__user-auth__notice__item faq">
                <a href="/">자주하는 질문</a>
              </li>
              <li class="nav__user-auth__notice__item one-to-one">
                <a href="/">1:1 문의</a>
              </li>
              <li class="nav__user-auth__notice__item bulk-order">
                <a href="/">대량주문 문의</a>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="nav__page">
          <li class="nav__page__item market">
            <a class="is__active">마켓칼리</a>
          </li>
          <li class="nav__page__item beauty">
            <a>뷰티칼리</a>
          </li>
        </ul>
        <fieldset class="nav__search-box">
          <label for="headerSearchInput" class="sr-only nav__search-box__label">
            검색 창</label
          >
          <input
            type="text"
            id="headerSearchInput"
            class="nav__search-box__input"
            placeholder="검색어를 입력해주세요" />
          <button
            type="button"
            class="nav__search-box__button"
            aria-label="검색 버튼"></button>
        </fieldset>
        <ul class="nav__user-service">
          <li class="nav__user-service__item address">
            <button type="button" aria-label="주소 정보 버튼"></button>
            <dialog class="nav__user-service__item__address-modal">
              <p>
                <span>배송지를 등록하고</span><br />구매 가능한 상품을
                확인하세요!
              </p>
              <a
                href="/src/pages/login/index.html"
                class="modal-link modal-login">
                로그인
              </a>
              <a href="" class="modal-link modal-search-address"> 주소 검색 </a>
            </dialog>
          </li>
          <li class="nav__user-service__item heart">
            <a href="/" aria-label="찜 목록"></a>
          </li>
          <li class="nav__user-service__item cart">
            <a href="/src/pages/cart/index.html" aria-label="장바구니"></a>
          </li>
        </ul>
        <div class="nav__product__category" aria-label="제품 카테고리">
          <button type="button">카테고리</button>
          <ul class="nav__product__category__list">
            <li class="nav__product__category__item">
              <a href="/"> 선물하기 </a>
            </li>
            <li class="nav__product__category__item">
              <a href="/"> 채소 </a>
            </li>
            <li class="nav__product__category__item">
              <a href="/"> 과일·견과·쌀 </a>
            </li>
            <li class="nav__product__category__item">
              <a href="/"> 수산·해산·건어물 </a>
            </li>
            <li class="nav__product__category__item">
              <a href="/"> 정육·계란 </a>
            </li>
            <li class="nav__product__category__item">
              <a href="/"> 국·반찬·메인요리 </a>
            </li>
            <li class="nav__product__category__item">
              <a href="/"> 샐러드·간편식 </a>
            </li>
            <li class="nav__product__category__item">
              <a href="/"> 면·양념·오일 </a>
            </li>
            <li class="nav__product__category__item">
              <a href="/"> 생수·음료·우유·커피 </a>
            </li>
            <li class="nav__product__category__item">
              <a href="/"> 간식·과자·떡 </a>
            </li>
            <li class="nav__product__category__item">
              <a href="/"> 베이커리·치즈·델리 </a>
            </li>
            <li class="nav__product__category__item">
              <a href="/"> 건강식품 </a>
            </li>
            <li class="nav__product__category__item">
              <a href="/"> 와인 </a>
            </li>
            <li class="nav__product__category__item">
              <a href="/"> 전통주 </a>
            </li>
            <li class="nav__product__category__item">
              <a href="/"> 생활용품·리빙·캠핑 </a>
            </li>
            <li class="nav__product__category__item">
              <a href="/"> 스킨케어·메이크업 </a>
            </li>
            <li class="nav__product__category__item">
              <a href="/"> 헤어·바디·구강 </a>
            </li>
            <li class="nav__product__category__item">
              <a href="/"> 주방용품 </a>
            </li>
            <li class="nav__product__category__item">
              <a href="/"> 가전제품 </a>
            </li>
            <li class="nav__product__category__item">
              <a href="/"> 반려동물 </a>
            </li>
            <li class="nav__product__category__item">
              <a href="/"> 베이비·키즈·완구 </a>
            </li>
            <li class="nav__product__category__item">
              <a href="/"> 여행·티켓 </a>
            </li>
          </ul>
        </div>
        <a
          href="/src/pages/productList/index.html?title=new"
          class="nav__menu__list new"
          >신상품</a
        >
        <a
          href="/src/pages/productList/index.html?title=best"
          class="nav__menu__list best"
          >베스트</a
        >
        <a
          href="/src/pages/productList/index.html?title=shopping"
          class="nav__menu__list shopping"
          >알뜰쇼핑</a
        >
        <a
          href="/src/pages/productList/index.html?title=benefits"
          class="nav__menu__list benefits"
          >특가/혜택</a
        >
        <p class="delivery"><span>샛별·하루</span> 배송안내</p>
      </nav>
    </header>
`;

class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    // headerTemplate의 콘텐츠를 Shadow DOM의 시작 부분에 추가
    this.shadowRoot.insertBefore(
      headerTemplate.content.cloneNode(true),
      this.shadowRoot.firstChild
    );

    // header
    this.header = this.shadowRoot.querySelector("header");
    // nav
    this.nav = this.header.querySelector(".nav");
    // 마켓칼리, 뷰티칼리 페이지 버튼
    this.pageList = this.header.querySelector(".nav__page");
    // 로그인
    this.login = this.header.querySelector("#login");
    // 모달 로그인
    this.modalLogin = this.header.querySelector(".modal-login");
    // 회원가입
    this.register = this.header.querySelector("#register");
    // 고객 센터
    this.customerService = this.header.querySelector(".customer-service");
    // 고객 센터 호버시 나올 모달창
    this.customerServiceModal = this.header.querySelector(
      ".nav__user-auth__notice"
    );
    // 주소표시 svg
    this.address = this.header.querySelector(".nav__user-service > .address");
    // 주소표시 svg 호버시 나올 모달창
    this.addressModal = this.header.querySelector(
      ".nav__user-service__item__address-modal"
    );

    // 카테고리 메뉴
    this.categoryTitle = this.header.querySelector(".nav__product__category");
    // 카테고리 하단 메뉴
    this.categoryList = this.header.querySelector(
      ".nav__product__category__list"
    );
  }
  connectedCallback() {
    // customerService modal 마우스이벤트
    this.customerService.addEventListener("mouseenter", () => {
      addClass(this.customerServiceModal, "is__show");
    });
    this.customerService.addEventListener("mouseleave", () => {
      removeClass(this.customerServiceModal, "is__show");
    });
    // customerService modal 키보드이벤트
    this.customerService.addEventListener("keydown", (e) => {
      if (e.keyCode == 32) {
        e.preventDefault();
        toggleClass(this.customerServiceModal, "is__show");
      }
    });
    // page 이벤트
    this.pageList.addEventListener("click", (e) => {
      const liList = e.currentTarget.children;
      if (!liList) return;
      [...liList].forEach((li) => {
        const a = li.querySelector("a");
        removeClass(a, "is__active");
      });
      if (e.target.closest("li").classList.contains("market")) {
        // location.href = "/market";
      }
      if (e.target.closest("li").classList.contains("beauty")) {
        // location.href = "/beauty";
      }
      addClass(e.target, "is__active");
    });
    // address modal 마우스이벤트
    this.address.addEventListener("mouseenter", () => {
      this.addressModal.show();
    });
    this.address.addEventListener("mouseleave", () => {
      this.addressModal.close();
    });
    // address modal 키보드이벤트
    this.address.addEventListener("keydown", (e) => {
      if (e.keyCode == 32) {
        e.preventDefault();
        toggleClass(this.addressModal, "is__show");
      }
    });
    // categoryTitle 마우스 이벤트
    this.categoryTitle.addEventListener("mouseenter", () => {
      addClass(this.categoryList, "is__show");
    });
    this.categoryTitle.addEventListener("mouseleave", () => {
      removeClass(this.categoryList, "is__show");
    });
    // categoryTitle 키보드 이벤트
    this.categoryTitle.addEventListener("keydown", (e) => {
      if (e.keyCode == 32) {
        e.preventDefault();
        toggleClass(this.categoryList, "is__show");
      }
    });
    function handleScroll() {
      if (window.scrollY > 30) {
        addClass(this.header, "is__scroll");
      } else if (window.scrollY < 30) {
        removeClass(this.header, "is__scroll");
      }
    }
    window.addEventListener("scroll", handleScroll.bind(this));
    this.handleLogout();
  }
  async handleLogout() {
    const defaultAuthData = {
      isLogin: false,
      userInfo: { name: null },
    };

    if (localStorage.getItem("auth")) {
      const { isLogin, userInfo } = await getStorage("auth");
      console.log(this.modalLogin);
      if (isLogin) {
        this.register.innerHTML = `<a href="/" class="my-page">${userInfo.name}</a>`;
        this.login.innerHTML = `<a href="/" class="logout">로그아웃</a>`;
        this.addressModal.innerHTML = `
          <p>
            <span>배송지를 등록하고</span><br />구매 가능한 상품을 확인하세요!
          </p>
              <a
                href="/"
                class="modal-link modal-logout">
                로그아웃
              </a>
              <a href="" class="modal-link modal-search-address"> 주소 검색 </a>`;
        const logout = this.header.querySelector(".logout");
        const modalLogout = this.header.querySelector(".modal-logout");

        function logOut() {
          if (confirm("정말 로그아웃 하실겁니까?")) {
            pb.authStore.clear();
            setStorage("auth", defaultAuthData);
            location.reload();
          }
        }
        logout.addEventListener("click", logOut);
        logout.addEventListener("keydown", (e) => {
          if (e.keyCode == 32) {
            e.preventDefault();
            logOut();
          }
        });
        modalLogout.addEventListener("click", logOut);
        modalLogout.addEventListener("keydown", (e) => {
          if (e.keyCode == 32) {
            e.preventDefault();
            logOut();
          }
        });
      }
    }
  }
}

// input 입력시 button 클릭하면 input text 초기화 추가하기
customElements.define("c-header", Header);
