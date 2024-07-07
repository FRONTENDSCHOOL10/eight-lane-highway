import {
  logo,
  readingGlasses,
  address,
  cart,
  heart,
  newSvg,
} from "./assets/index.js";
import { addClass, removeClass, toggleClass } from "../../lib/index.js";

const header = document.querySelector("#header");
const headerTemplate = document.createElement("template");

headerTemplate.innerHTML = `
<style>@import url(../../styles/reset.css); @import url(../../styles/style.scss);</style>
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
       <li class="nav__user-auth-item customer-service">
         <a href="">고객센터</a>
         <ul class="nav__user-auth-notice-list">
           <li class="nav__user-auth-notice-item notice">
             <a href="">공지 사항</a>
           </li>
           <li class="nav__user-auth-notice-item faq">
             <a href="">자주하는 질문</a>
           </li>
           <li class="nav__user-auth-notice-item one-to-one">
             <a href="">1:1 문의</a>
           </li>
           <li class="nav__user-auth-notice-item bulk-order">
             <a href="">대량주문 문의</a>
           </li>
         </ul>
       </li>
     </ul>
     <ul class="nav__page-list">
       <li class="nav__page-item market">
         <button type="button" class="active">마켓칼리</button>
       </li>
       <li class="nav__page-item beauty">
         <button type="button">뷰티칼리</button>
         <img src="${newSvg}" alt="새로 나왔다는 표시" />
       </li>
     </ul>
     <fieldset class="nav__search-box">
       <label for="headerSearch" class="sr-only search-label">
         검색 창</label
       >
       <input
         type="text"
         id="headerSearch"
         class="search-input"
         placeholder="검색어를 입력해주세요" />
       <button type="button" class="search__button">
         <img src="${readingGlasses}" alt="검색 돋보기 이미지" />
       </button>
     </fieldset>
     <ul class="nav__user-service-list">
       <li
         tabindex="0"
         class="nav__user-service-item nav__user-service-item-address">
         <img src="${address}" alt="위치이미지" />
         <dialog class="nav__user-service-item-address-modal">
           <p>
             <span>배송지를 등록하고</span><br />구매 가능한 상품을
             확인하세요!
           </p>
           <button type="button" class="modal-login">로그인</button>
           <button type="button" class="modal-search-address">
             주소 검색
           </button>
         </dialog>
       </li>
       <li class="nav__user-service-item heart">
         <a href=""> <img src="${heart}" alt="돋보기이미지" /></a>
       </li>
       <li class="nav__user-service-item cart">
         <a href=""> <img src="${cart}" alt="카드 이미지" /></a>
       </li>
     </ul>
   </nav>
   <nav class="nav nav__container2">
     <ul class="nav__product-list">
       <li class="nav__product-item category">
         <a href="/">카테고리</a>
         <ul class="category__list">
           <li class="category__item">
             <a href="/"> 선물하기 </a>
           </li>
           <li class="category__item">
             <a href="/"> 채소 </a>
           </li>
           <li class="category__item">
             <a href="/"> 과일·견과·쌀 </a>
           </li>
           <li class="category__item">
             <a href="/"> 수산·해산·건어물 </a>
           </li>
           <li class="category__item">
             <a href="/"> 정육·계란 </a>
           </li>
           <li class="category__item">
             <a href="/"> 국·반찬·메인요리 </a>
           </li>
           <li class="category__item">
             <a href="/"> 샐러드·간편식 </a>
           </li>
           <li class="category__item">
             <a href="/"> 면·양념·오일 </a>
           </li>
           <li class="category__item">
             <a href="/"> 생수·음료·우유·커피 </a>
           </li>
           <li class="category__item">
             <a href="/"> 간식·과자·떡 </a>
           </li>
           <li class="category__item">
             <a href="/"> 베이커리·치즈·델리 </a>
           </li>
           <li class="category__item">
             <a href="/"> 건강식품 </a>
           </li>
           <li class="category__item">
             <a href="/"> 와인 </a>
           </li>
           <li class="category__item">
             <a href="/"> 전통주 </a>
           </li>
           <li class="category__item">
             <a href="/"> 생활용품·리빙·캠핑 </a>
           </li>
           <li class="category__item">
             <a href="/"> 스킨케어·메이크업 </a>
           </li>
           <li class="category__item">
             <a href="/"> 헤어·바디·구강 </a>
           </li>
           <li class="category__item">
             <a href="/"> 주방용품 </a>
           </li>
           <li class="category__item">
             <a href="/"> 가전제품 </a>
           </li>
           <li class="category__item">
             <a href="/"> 반려동물 </a>
           </li>
           <li class="category__item">
             <a href="/"> 베이비·키즈·완구 </a>
           </li>
           <li class="category__item">
             <a href="/"> 여행·티켓 </a>
           </li>
         </ul>
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
    this.nav1 = this.shadowRoot.querySelector(".nav__container1");
    this.nav2 = this.shadowRoot.querySelector(".nav__container2");

    this.customerService = this.nav1.querySelector(".customer-service");
    this.noticeList = this.nav1.querySelector(".nav__user-auth-notice-list");
    this.address = this.nav1.querySelector(".nav__user-service-item-address");
    this.addressModal = this.nav1.querySelector(
      ".nav__user-service-item-address-modal"
    );
    this.pageList = this.nav1.querySelector(".nav__page-list");
    this.productItem = this.nav2.querySelector(".nav__product-item");
    this.catagoryList = this.nav2.querySelector(".category__list");
  }
  connectedCallback() {
    // customerService modal 키보드이벤트, 마우스이벤트
    this.customerService.addEventListener("mouseover", () => {
      addClass(this.noticeList, "active");
    });
    this.customerService.addEventListener("mouseleave", () => {
      removeClass(this.noticeList, "active");
    });

    this.customerService.addEventListener("keydown", (e) => {
      if (e.keyCode == 32) {
        toggleClass(this.noticeList, "active");
      }
    });
    // address modal 키보드이벤트, 마우스이벤트
    this.address.addEventListener("mouseover", () => {
      addClass(this.addressModal, "active");
    });
    this.address.addEventListener("mouseleave", () => {
      removeClass(this.addressModal, "active");
    });
    this.address.addEventListener("keydown", (e) => {
      if (e.keyCode == 32) {
        toggleClass(this.addressModal, "active");
      }
    });
    // page 이벤트
    this.pageList.addEventListener("click", (e) => {
      const liList = e.currentTarget.children;
      if (!liList) return;
      [...liList].forEach((li) => {
        const button = li.querySelector("button");
        removeClass(button, "active");
      });
      if (e.target.closest("li").classList.contains("market")) {
        // location.href = "/market";
      }

      if (e.target.closest("li").classList.contains("beauty")) {
        // location.href = "/beauty";
      }
      addClass(e.target, "active");
    });
    // productItem 사용
    this.productItem.addEventListener("mouseover", () => {
      addClass(this.catagoryList, "active");
    });
    this.productItem.addEventListener("mouseleave", () => {
      removeClass(this.catagoryList, "active");
    });

    this.productItem.addEventListener("keydown", (e) => {
      if (e.keyCode == 32) {
        toggleClass(this.catagoryList, "active");
      }
    });
  }
}

customElements.define("c-header", Header);
const cHeader = document.createElement("c-header");

header.append(cHeader);

window.addEventListener("scroll", () => {
  if (window.scrollY > 30) {
    console.log("이상");
  }
});
