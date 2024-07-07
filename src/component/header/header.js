import logo from "./assets/logo.svg";
import readingGlasses from "./assets/reading-glasses.svg";
import address from "./assets/address.svg";
import cart from "./assets/cart.svg";
import heart from "./assets/heart.svg";
import newSvg from "./assets/new.svg";
import category from "./assets/category.svg";

const header = document.querySelector("#header");
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
        <li class="nav__page-item market ">
          <button type="button" class="active">마켓칼리</button>
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
    this.nav = this.shadowRoot.querySelector(".nav__container1");

    this.customerService = this.nav.querySelector(".customer-service");
    this.noticeList = this.nav.querySelector(".nav__user-auth-notice-list");
    this.address = this.nav.querySelector(".nav__user-service-item-address");
    this.addressModal = this.nav.querySelector(
      ".nav__user-service-item-address-modal"
    );
    this.pageList = this.nav.querySelector(".nav__page-list");
  }
  connectedCallback() {
    console.log("makeHeader.js 연결");

    this.customerService.addEventListener("mouseover", () => {
      this.add(this.noticeList, "active");
    });
    this.customerService.addEventListener("mouseleave", () => {
      this.remove(this.noticeList, "active");
    });

    this.address.addEventListener("mouseover", () => {
      this.add(this.addressModal, "active");
    });
    this.address.addEventListener("mouseleave", () => {
      this.remove(this.addressModal, "active");
    });

    this.pageList.addEventListener("click", (e) => {
      const liList = e.currentTarget.children;
      [...liList].forEach((li) => {
        const button = li.querySelector("button");
        button.classList.remove("active");
      });
      this.add(e.target, "active");
      // location.href = "../../../index.html";
    });
  }
  add(node, className) {
    if (typeof node === "string") node = document.querySelector(node);

    if (!className) {
      node.className = "";
      return;
    }

    if (typeof className !== "string") {
      throw new TypeError(
        "removeClass 함수의 두 번째 인수는 문자 타입 이어야 합니다."
      );
    }

    node.classList.add(className);
  }
  remove(node, className) {
    if (typeof node === "string") node = document.querySelector(node);

    if (!className) {
      node.className = "";
      return;
    }

    if (typeof className !== "string") {
      throw new TypeError(
        "removeClass 함수의 두 번째 인수는 문자 타입 이어야 합니다."
      );
    }

    node.classList.remove(className);
  }
}

customElements.define("c-header", Header);
const cHeader = document.createElement("c-header");

header.append(cHeader);
