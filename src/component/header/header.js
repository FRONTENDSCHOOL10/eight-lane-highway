const app = document.querySelector("#app");
const headerTemplate = document.createElement("template");

headerTemplate.innerHTML = `
<style>@import url(./header.scss);</style>
<style>@import url(../../styles/reset.css);</style>
  <header class="header">
  <nav>
    <div class="header__container">
      <h1 class="header__logo">
        <a href="/"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="82"
            height="42"
            viewBox="0 0 82 42"
            fill="none">
            <g clip-path="url(#clip0_42_1137)">
              <path
                d="M62.5002 0.964993C63.5262 0.407993 64.9662 0.246993 65.8562 1.07199C66.7462 1.89699 66.5322 3.11999 65.8562 5.04499C65.8562 5.04499 64.3512 9.11099 62.8012 13.307L62.4032 14.387C60.9892 18.217 59.6412 21.874 59.4762 22.35C57.9782 26.595 61.4432 26.472 63.5002 22.198C64.6592 19.804 66.1442 15.841 66.1442 15.841C66.6682 14.278 66.8262 13.337 66.5032 13.013C66.3962 12.9 66.5482 12.761 66.6832 12.69C68.9522 11.541 71.3132 12.618 70.0192 16L69.9652 16.138C69.5782 17.116 67.2852 22.871 67.2852 22.871C66.6092 24.531 66.6902 26.107 67.7032 26.107C68.3892 26.103 69.1632 25.722 70.0072 25.019C71.8252 23.515 73.2292 20.707 73.7342 19.565C73.9642 19.057 74.8212 17.145 75.5002 15.204C75.7362 14.539 75.8692 13.844 75.8952 13.139C75.8778 13.0519 75.887 12.9615 75.9216 12.8796C75.9562 12.7978 76.0146 12.7282 76.0892 12.68C76.6034 12.4061 77.1767 12.262 77.7592 12.26C78.0416 12.2547 78.3212 12.3158 78.5756 12.4382C78.83 12.5607 79.0522 12.7411 79.2242 12.965C79.6672 13.563 79.7902 14.544 79.3272 15.773C79.2072 16.093 75.5522 25.731 75.5522 25.731V25.757C77.5932 24.534 79.4222 24.444 80.5052 24.903L80.5022 24.89C81.9972 25.537 82.4922 27.33 81.4402 28.449C81.3372 28.559 81.0782 28.533 81.0782 28.359C80.9842 27.106 78.5612 24.864 74.9692 27.284L74.8242 27.669L73.7562 30.477C71.1362 37.495 68.3532 42.613 64.3412 41.477C61.6532 40.717 61.9642 36.87 64.8562 33.687C66.8588 31.5511 69.0291 29.5788 71.3462 27.789C71.4142 27.601 71.4762 27.439 71.5342 27.278C71.8122 26.498 72.0252 25.844 72.3262 25.013L72.4852 24.495C72.3072 24.695 71.9872 25.068 71.7732 25.307C71.0612 26.107 69.2792 28.064 66.4442 27.514L66.2102 27.462C64.1602 26.954 63.6022 25.476 63.5552 24.185C61.4132 26.841 59.2042 27.611 57.7482 27.575C55.8002 27.527 54.3702 26.061 55.3212 23.285C56.3792 20.179 60.8212 7.95299 62.1162 4.28499C62.6012 2.70499 62.7822 1.70499 62.3002 1.31099C62.1772 1.20799 62.3522 1.04599 62.5002 0.964993ZM70.8642 29.743C69.7612 30.623 65.3382 34.273 64.1122 37.184C63.6072 38.381 63.7362 39.333 64.6002 39.417C66.5602 39.611 68.6122 35.599 70.8282 29.905L70.8642 29.743ZM16.0282 5.35199C15.9412 5.68399 14.7092 9.21199 13.3272 13.101L13.1182 13.687L12.9082 14.276L12.6932 14.88C17.3842 13.757 25.7572 8.30999 26.7282 4.79499C26.8482 4.63399 27.0182 4.57499 27.2942 4.75999C27.7892 5.08999 27.9802 5.91499 27.7892 6.67799C27.0252 9.71599 21.3732 14.019 16.4102 16.232C17.0222 17.869 19.0922 22.499 20.6162 25.343C22.2792 28.462 24.0362 29.918 26.7632 30.08C28.2232 30.165 29.7772 29.633 30.6562 28.86L30.8042 28.72L30.7912 28.75C30.9852 28.546 31.3022 28.827 31.1572 29.073C30.6012 29.9021 29.8616 30.5921 28.9959 31.0893C28.1302 31.5865 27.1616 31.8776 26.1652 31.94C19.8202 32.367 17.3912 28.07 12.8612 17.446C12.4952 17.572 12.0522 17.734 11.6062 17.896C11.5312 18.083 9.53624 23.538 9.47624 23.719C8.53224 26.589 8.47124 28.161 9.11824 28.614C9.26324 28.704 9.19224 28.947 8.94024 29.028C6.41324 29.824 4.08724 28.332 5.38124 24.586C6.54224 21.27 11.0712 8.40599 12.2952 4.95999C12.7222 3.66599 12.4922 2.83499 11.8032 2.65399C8.50624 1.77999 0.877239 8.74899 1.97124 15.184C2.16124 16.304 2.95124 16.931 3.34924 16.847C3.37092 16.8427 3.39335 16.8438 3.41448 16.8503C3.43562 16.8568 3.4548 16.8685 3.47028 16.8843C3.48577 16.9 3.49708 16.9194 3.50318 16.9407C3.50929 16.962 3.50999 16.9844 3.50524 17.006C3.39441 17.3855 3.13894 17.7064 2.79385 17.8994C2.44876 18.0924 2.04166 18.1422 1.66024 18.038C0.490239 17.782 0.107239 16.527 0.0432389 15.88C-0.600761 9.21999 6.14824 1.22999 12.3892 0.579993C14.7672 0.329993 16.9982 1.53999 16.0282 5.35199ZM40.0682 15.265L40.0082 15.472L37.1782 23.632C36.8742 24.482 37.0782 25.369 37.6792 25.534C39.4362 26.016 41.7072 23.389 42.8102 20.801C43.3405 19.5445 43.8327 18.2722 44.2862 16.986C44.8682 15.343 45.3922 13.803 45.0692 13.078C44.9942 12.91 45.1142 12.822 45.2922 12.728C45.7972 12.473 47.5182 11.903 48.4332 12.796C49.1282 13.47 49.0422 14.567 48.4032 16.233L48.3072 16.475L48.5272 16.202C51.2302 12.902 53.3192 11.91 55.0902 12.605L55.2372 12.667C57.6182 13.741 56.3832 17.882 53.1212 18.147C52.9212 18.164 52.7652 18.021 52.9632 17.74C53.3582 17.135 53.3192 15.831 52.1672 15.718C51.0152 15.605 49.3372 16.925 48.1292 18.562C47.0452 20.012 45.9292 22.473 44.8072 25.835C44.5352 26.653 44.6642 26.847 44.6972 26.902C44.7049 26.9165 44.709 26.9326 44.709 26.949C44.709 26.9654 44.7049 26.9815 44.6972 26.996C44.5542 27.268 43.7322 27.592 42.9372 27.592C41.3122 27.585 40.6462 26.647 40.9702 25.155C39.1222 26.919 37.2592 27.769 35.6152 27.621C35.2535 27.5896 34.9029 27.4805 34.5872 27.3012C34.2715 27.1219 33.9982 26.8766 33.7859 26.582C33.5737 26.2875 33.4275 25.9506 33.3573 25.5944C33.2871 25.2382 33.2946 24.871 33.3792 24.518C31.9532 26.327 29.8372 27.786 27.6822 27.585C25.5272 27.385 24.1822 25.919 24.8802 22.797C25.4702 20.199 28.2197 13.687 31.5002 11.5C33.0002 10.5 34.6659 10.678 35.0002 10.5C36.5002 11 36.7234 11.4523 36.2072 12.9468C34.0002 13 32.5002 14.5 31.1572 16.202C29.2559 18.1878 28.1561 21.5192 28.0002 22C27.2632 24.287 28.3652 25.709 29.4102 25.766C30.4552 25.826 31.8402 24.806 32.8302 23.263C34.5902 20.739 35.4112 17.578 36.2072 15.381C36.4112 14.821 37.0002 13.5 36.2072 12.9468C35.9902 13.0425 34.7922 10.614 35.0002 10.5C37.0002 9.99998 40.9512 12.017 40.0682 15.265Z"
                fill="#5F0080" />
            </g>
            <defs>
              <clipPath id="clip0_42_1137">
                <rect width="82" height="42" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </a>
      </h1>
      <ul class="header__user-auth-list">
        <li class="header__user-auth-item header__user-auth-item-signup">
          <a href="">회원가입</a>
        </li>
        <li class="header__user-auth-item header__user-auth-item-login">
          <a href="">로그인</a>
        </li>
        <li
          class="header__user-auth-item header__user-auth-item-customer-service">
          <a href="">고객센터</a>
          <ul class="header__user-auth-notice-list">
            <li
              class="header__user-auth-notice-item header__user-auth-notice-item-notice">
              <a href="">공지 사항</a>
            </li>
            <li
              class="header__user-auth-notice-item header__user-auth-notice-item-faq">
              <a href="">자주하는 질문</a>
            </li>
            <li
              class="header__user-auth-notice-item header__user-auth-notice-item-one-to-one">
              <a href="">1:1 문의</a>
            </li>
            <li
              class="header__user-auth-notice-item header__user-auth-notice-item-bulk-order">
              <a href="">대량주문 문의</a>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="header__page-list">
        <li class="header__page-item header__page-item-market">
          <button type="button">마켓칼리</button>
        </li>
        <li class="header__page-item header__page-item-beauty">
          <button type="button">뷰티칼리</button>
          <span><svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
          <g clip-path="url(#clip0_42_1146)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.1079 7V6.993L1.9109 2.577V7H0.0458984V0H1.9129L5.1089 4.419V0H6.9759V7H5.1079Z" fill="#FA622F"/>
          </g>
          <defs>
            <clipPath id="clip0_42_1146">
              <rect width="7" height="7" fill="white"/>
            </clipPath>
          </defs>
        </svg></span>
        </li>
      </ul>
      <div class="header__search-box">
        <label for="headerSearch" class="sr-only header__search-label"></label>
        <input
          type="text"
          id="headerSearch"
          class="header__search-input"
          placeholder="검색어를 입력해주세요" />
        <button type="button" class="header__search__button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none">
            <path
              d="M18.0811 18.081L13.9611 13.961M8.4671 15.334C9.36888 15.334 10.2618 15.1564 11.095 14.8113C11.9281 14.4662 12.6851 13.9604 13.3228 13.3227C13.9605 12.685 14.4663 11.928 14.8114 11.0949C15.1565 10.2617 15.3341 9.36879 15.3341 8.467C15.3341 7.56522 15.1565 6.67226 14.8114 5.83912C14.4663 5.00598 13.9605 4.24896 13.3228 3.6113C12.6851 2.97364 11.9281 2.46782 11.095 2.12272C10.2618 1.77763 9.36888 1.60001 8.4671 1.60001C6.64585 1.60001 4.89921 2.32349 3.61139 3.6113C2.32358 4.89912 1.6001 6.64576 1.6001 8.467C1.6001 10.2882 2.32358 12.0349 3.61139 13.3227C4.89921 14.6105 6.64585 15.334 8.4671 15.334V15.334Z"
              stroke="#5F0080"
              stroke-width="1.7"
              stroke-linecap="round" />
          </svg>
        </button>
      </div>
      <ul class="header__user-service-list">
        <li
          class="header__user-service-item header__user-service-item-address"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="user-service__address"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.0062 30C18.0062 30 8.7002 22.544 8.7002 15.306C8.7002 12.8379 9.68065 10.4709 11.4259 8.72566C13.1711 6.98045 15.5381 6 18.0062 6C20.4743 6 22.8413 6.98045 24.5865 8.72566C26.3317 10.4709 27.3122 12.8379 27.3122 15.306C27.3122 22.544 18.0062 30 18.0062 30Z"
              stroke="#333333"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M17.9124 17.907C19.45 17.907 20.6964 16.6606 20.6964 15.123C20.6964 13.5854 19.45 12.339 17.9124 12.339C16.3749 12.339 15.1284 13.5854 15.1284 15.123C15.1284 16.6606 16.3749 17.907 17.9124 17.907Z"
              stroke="#333333"
              stroke-width="1.7"
              stroke-linecap="square"
              stroke-linejoin="round" />
          </svg>
          <div class="header__user-service-item-address-modal">
            <p>
              <span>배송지를 등록하고</span><br />구매 가능한 상품을
              확인하세요!
            </p>
            <button
              type="button"
              class="header__user-service-item-address-modal-login">
              로그인
            </button>
            <button
              type="button"
              class="header__user-service-item-address-modal-search-address">
              주소 검색
            </button>
          </div>
        </li>
        <li
          class="header__user-service-item header__user-service-item-heart">
          <a href=""
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M28.9269 8.89299C28.3269 8.29265 27.6146 7.81641 26.8305 7.49148C26.0465 7.16656 25.2061 6.99931 24.3574 6.99931C23.5086 6.99931 22.6682 7.16656 21.8842 7.49148C21.1001 7.81641 20.3878 8.29265 19.7879 8.89299L17.9589 10.721L16.1319 8.89299C14.9201 7.68095 13.2765 6.99993 11.5626 6.99975C9.84867 6.99956 8.2049 7.68022 6.99286 8.89199C5.78082 10.1038 5.0998 11.7474 5.09961 13.4613C5.09942 15.1752 5.78008 16.819 6.99186 18.031L8.81986 19.86L17.2519 28.294C17.4394 28.4815 17.6937 28.5868 17.9589 28.5868C18.224 28.5868 18.4783 28.4815 18.6659 28.294L27.0989 19.86L28.9269 18.032C29.5271 17.4321 30.0032 16.7198 30.328 15.9358C30.6528 15.1519 30.82 14.3116 30.82 13.463C30.82 12.6144 30.6528 11.7741 30.328 10.9901C30.0032 10.2062 29.5271 9.4939 28.9269 8.89399V8.89299Z"
                stroke="#333333"
                stroke-width="1.7"
                stroke-linecap="round" /></svg></a>
        </li>
        <li
          class="header__user-service-item header__user-service-item-cart">
          <a href=""><svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M30.8442 10.207L28.1242 21.777H12.5342L9.82422 10.207H30.8442Z"
                stroke="#333333"
                stroke-width="1.7"
                stroke-linecap="square"
                stroke-linejoin="round" />
              <path
                d="M25.6839 29.467C26.8658 29.467 27.8239 28.5089 27.8239 27.327C27.8239 26.1451 26.8658 25.187 25.6839 25.187C24.5021 25.187 23.5439 26.1451 23.5439 27.327C23.5439 28.5089 24.5021 29.467 25.6839 29.467Z"
                stroke="#333333"
                stroke-width="1.7"
                stroke-linecap="square"
                stroke-linejoin="round" />
              <path
                d="M14.974 29.467C16.1559 29.467 17.114 28.5089 17.114 27.327C17.114 26.1451 16.1559 25.187 14.974 25.187C13.7921 25.187 12.834 26.1451 12.834 27.327C12.834 28.5089 13.7921 29.467 14.974 29.467Z"
                stroke="#333333"
                stroke-width="1.7"
                stroke-linecap="square"
                stroke-linejoin="round" />
              <path
                d="M5.16406 6.547H8.96406L10.7241 14.047"
                stroke="#333333"
                stroke-width="1.7"
                stroke-linecap="square"
                stroke-linejoin="round" /></svg></a>
        </li>
      </ul>
    </div>
      <ul class="header__product-list">
        <li class="header__product-item header__product-item-category">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
  <g clip-path="url(#clip0_7901_162)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H16V1.7H0V0ZM0 6.15H16V7.85H0V6.15ZM0 12.3H16V14H0V12.3Z" fill="#333333"/>
  </g>
  <defs>
    <clipPath id="clip0_7901_162">
      <rect width="16" height="14" fill="white"/>
    </clipPath>
  </defs>
</svg>
          <a href="/">카테고리</a>
        </li>
        <li class="header__product-item header__product-item-new">
          <a href="/">신상품</a>
        </li>
        <li class="header__product-item header__product-item-best">
          <a href="/">베스트</a>
        </li>
        <li class="header__product-item header__product-item-shopping">
          <a href="/">알뜰쇼핑</a>
        </li>
        <li class="header__product-item header__product-item-benefits">
          <a href="/">특가/혜택</a>
        </li>
        <li class="header__product-item header__product-item-delivery">
          <a href="/"><span>샛별·하루</span> 배송안내</a>
        </li>
      </ul>
  </nav>
</header>
`;

export class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));
    this.header = this.shadowRoot.querySelector(".header");
    this.headerContainer = this.header.querySelector(".header__container");
    this.userAuth = this.headerContainer.querySelector(
      ".header__user-auth-list"
    );
    this.customerService = this.userAuth.querySelector(
      ".header__user-auth-item-customer-service"
    );
    this.noticeList = this.userAuth.querySelector(
      ".header__user-auth-item-notice"
    );
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

app.append(header);
