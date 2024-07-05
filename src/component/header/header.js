const app = document.querySelector("#app");
const headerTemplate = document.createElement("template");

headerTemplate.innerHTML = `
<header class="header">
<nav>
  <div>
    <h1 class="header__logo">
      <a href="/">
        <img src="/" alt="컬리로고" />
      </a>
    </h1>
    <ul class="header__user-auth">
      <li class="user-auth__signup"><a href="">회원가입</a></li>
      <li class="user-auth__login"><a href="">로그인</a></li>
      <li class="user-auth__customer-service"><a href="">고객센터</a></li>
      <li class="user-auth__notice-box">
        <ul>
          <li class="user-auth__notice"><a href="">공지 사항</a></li>
          <li class="user-auth__faq"><a href="">자주하는 질문</a></li>
          <li class="user-auth__one-to-one"><a href="">1:1 문의</a></li>
          <li class="user-auth__bulk-order"><a href="">대량주문 문의</a></li>
        </ul>
      </li>
    </ul>
    <ul class="header__page">
      <li class="page-market"><button type="button">마켓칼리</button></li>
      <li class="page-beauty"><button type="button">뷰티칼리</button></li>
    </ul>
    <div class="header__search">
      <label for="headerSearch" class="search__label"></label>
      <input
        type="text"
        id="headerSearch"
        class="search__input"
        placeholder="r검색어를 입력해주세요" />
      <button type="button" class="search__button"></button>
    </div>
    <ul class="header__user-service">
      <li class="user-service__address-box">
        <p class="user-service__address">위치서비스</p>
        <div class="user-service__address-modal">
          <p>
            <span>배송지를 등록하고</span><br />구매 가능한 상품을
            확인하세요!
          </p>
          <button
            type="button"
            class="user-service__address-modal__login">
            로그인
          </button>
          <button
            type="button"
            class="user-service__address-modal__login">
            주소 검색
          </button>
        </div>
      </li>
      <li class="user-service__heart"><a href="">찜목록</a></li>
      <li class="user-service__cart"><a href="">장바구니</a></li>
    </ul>
  </div>
  <div>
    <ul class="header__product">
      <li class="header__product-category"><a href="/">카테고리</a></li>
      <li class="header__product-new"><a href="/">신상품</a></li>
      <li class="header__product-best"><a href="/">베스트</a></li>
      <li class="header__product-budget-shopping">
        <a href="/">알뜰쇼핑</a>
      </li>
      <li class="header__product-benefits"><a href="/">특가/혜택</a></li>
      <li class="header__product-delivery">
        <a href="/"><span>샛별·하루</span> 배송안내</a>
      </li>
    </ul>
  </div>
</nav>
</header>
`;

export class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));
  }
  connectedCallback() {
    console.log("makeHeader.js 연결");
  }
}

customElements.define("c-header", Header);
const header = document.createElement("c-header");

app.append(header);
