import logo from "./assets/logo.svg";
import readingGlasses from "./assets/reading-glasses.svg";
import address from "./assets/address.svg";
import cart from "./assets/cart.svg";
import heart from "./assets/heart.svg";
import newSvg from "./assets/new.svg";
import category from "./assets/category.svg";

const headerContainer = document.querySelector("#header");
const headerTemplate = document.createElement("template");

headerTemplate.innerHTML = `
<style>@import url(../../styles/reset.css); @import url(./header.scss);</style>
    <nav class="nav nav__container1">
      <h1 class="nav__logo">
        <a href="/">
          <img src="${logo}" alt="로고 이미지" />
        </a>
      </h1>
      <ul class="nav__user-auth-list">
        <li class="nav__user-auth-item signup">
          <a href="">회원가입</a>
        </li>
        <li class="nav__user-auth-item login">
          <a href="">로그인</a>
        </li>
        <li
          class="nav__user-auth-item customer-service">
          <a href="">고객센터</a>
          <ul class="nav__user-auth-notice-list">
            <li
              class="nav__user-auth-notice-item notice">
              <a href="">공지 사항</a>
            </li>
            <li
              class="nav__user-auth-notice-item faq">
              <a href="">자주하는 질문</a>
            </li>
            <li
              class="nav__user-auth-notice-item one-to-one">
              <a href="">1:1 문의</a>
            </li>
            <li
              class="nav__user-auth-notice-item bulk-order">
              <a href="">대량주문 문의</a>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="nav__page-list">
        <li class="nav__page-item market">
          <button type="button">마켓칼리</button>
        </li>
        <li class="nav__page-item beauty">
          <button type="button">뷰티칼리</button>
          <img src="${newSvg}" alt="새로 나왔다는 표시" />
        </li>
      </ul>
      <fieldset class="nav__search-box">
        <label
          for="headerSearch"
          class="sr-only search-label">
          검색 창</label>
        <input
          type="text"
          id="headerSearch"
          class="search-input"
          placeholder="검색어를 입력해주세요" />
        <button type="button" class="search__button">
        <img src="${readingGlasses}" alt="검색 돋보기 이미지" /></button>
      </fieldset>
      <ul class="nav__user-service-list">
        <li
          class="nav__user-service-item nav__user-service-item-address">
          <img src="${address}" alt="위치이미지" />
          <div class="nav__user-service-item-address-modal">
            <p>
              <span>배송지를 등록하고</span><br />구매 가능한 상품을
              확인하세요!
            </p>
            <button
              type="button"
              class="modal-login">
              로그인
            </button>
            <button
              type="button"
              class="modal-search-address">
              주소 검색
            </button>
          </div>
        </li>
        <li
          class="nav__user-service-item heart">
          <a href="">
          <img src="${heart}" alt="돋보기이미지" /></a>
        </li>
        <li
          class="nav__user-service-item cart">
          <a href="">
          <img src="${cart}" alt="카드 이미지" /></a>
        </li>
      </ul>
    </nav>
    <nav class="nav nav__container2">
    <ul class="nav__product-list">
      <li class="nav__product-item category">
        <a href="/"><img src="${category}" alt="" />카테고리</a>
      </li>
      <li class="nav__product-item new">
        <a href="/">신상품</a>
      </li>
      <li class="nav__product-item best">
        <a href="/">베스트</a>
      </li>
      <li class="nav__product-item shopping">
        <a href="/">알뜰쇼핑</a>
      </li>
      <li class="nav__product-item benefits">
        <a href="/">특가/혜택</a>
      </li>
      <li class="nav__product-item delivery">
        <a href="/"><span>샛별·하루</span> 배송안내</a>
      </li>
    </ul>
    </nav> 
`;

export class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));
    // this.nav = this.shadowRoot.querySelector("nav");
    // this.headerContainer = this.nav.querySelector(".nav__container");
    // this.userAuth = this.headerContainer.querySelector(
    //   ".nav__user-auth-list"
    // );
    // this.customerService = this.userAuth.querySelector(
    //   ".nav__user-auth-item-customer-service"
    // );
    // this.noticeList = this.userAuth.querySelector(
    //   ".nav__user-auth-item-notice"
    // );
  }
  connectedCallback() {
    console.log("makeHeader.js 연결");

    // this.customerService.addEventListener("mouseover", () => {
    //   this.noticeList.classList.add("active");
    // });
    // this.customerService.addEventListener("mouseleave", () => {
    //   this.noticeList.classList.remove("active");
    // });
  }
}

customElements.define("c-header", Header);
const header = document.createElement("c-header");

headerContainer.append(header);
