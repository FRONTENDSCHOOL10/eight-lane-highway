import resetCss from "/src/styles/reset.css?inline";
import srOnlyCss from "/src/styles/sr-only.css?inline";
import headerCss from "/src/styles/style.scss?inline";

const footer = document.querySelector("#footer");
const footerTemplate = document.createElement("template");

footerTemplate.innerHTML = `
<style>${resetCss}${srOnlyCss}${headerCss}</style>
    <section class="footer">
    <h2 class="sr-only">컬리 고객센터 및 회사 소개</h2>
    <article class="footer__wrapper">
      <h3 class="footer__wrapper__title">고객행복센터</h3>
      <article class="footer__customer-service customer-center">
        <h4 class="sr-only">컬리 고객센터 번호 및 운영 시간</h4>
        <p class="customer-service-number">1644-1107</p>
        <p class="customer-service-time">월~토요일 오전 7시 - 오후 6시</p>
      </article>
      <article class="footer__customer-service kakaotalk-inquiry">
        <h4 class="sr-only">카카오톡 문의</h4>
        <button class="customer-service-button">카카오톡 문의</button>
        <div>
          <p class="customer-service-time">
            월~토요일 | 오전 7시 - 오후 6시
          </p>
          <p class="customer-service-time">
            일/공휴일 | 오전 7시 - 오후 1시
          </p>
        </div>
      </article>
      <article class="footer__customer-service">
        <h4 class="sr-only">1:1 문의</h4>
        <button class="customer-service-button one-on-one-inquiry">
          1:1 문의
        </button>
        <p class="customer-service-time">365일</p>
        <p class="customer-service-time">일/공휴일 | 오전 7시 - 오후 1시</p>
      </article>
      <article class="footer__customer-service bulk-order-inquiry">
        <h4 class="sr-only">대량 주문 문의</h4>
        <button class="customer-service-button">대량주문 문의</button>
        <div>
          <p class="customer-service-time">
            월~토요일 | 오전 7시 - 오후 6시
          </p>
          <p class="customer-service-time">
            일/공휴일 | 오전 7시 - 오후 1시
          </p>
        </div>
      </article>
      <article class="footer__customer-service non-member-inquiry">
        <h4 class="sr-only">대량 주문 문의</h4>
        <div>
          <p>비회원 문의 : <a href="">help@karlycorp.com</a></p>
          <p>비회원 대량주문 문의 : <a href="">help@karlycorp.com</a></p>
        </div>
      </article>
    </article>
    <article class="footer__wrapper">
      <h3 class="sr-only">칼리 회사 소개</h3>
      <ul class="footer__navigation">
        <li><a href="">칼리소개</a></li>
        <li><a href="">칼리소개영상</a></li>
        <li><a href="">인재채용</a></li>
        <li><a href="">이용약관</a></li>
        <li><a href="">개인정보처리방침</a></li>
        <li><a href="">이용안내 </a></li>
      </ul>
      <ul class="footer__company-info">
        <li>법인명 (상호) : 주식회사 컬리</li>
        <li>사업자등록번호 : 261-81-23567</li>
        <li><a href="">사업자정보 확인</a></li>
        <li>통신판매업 : 제 2018-서울강남-01646 호</li>
        <li>개인정보보호책임자 : 이원준</li>
        <li>주소 : 서울특별시 강남구 테헤란로 133, 18층(역삼동)</li>
        <li>대표이사 : 김슬아</li>
        <li>입점문의 : 입점문의하기</li>
        <li>제휴문의 : <a href="">business@karlycorp.com</a></li>
        <li>채용문의 : <a href="">recruit@karlycorp.com</a></li>
        <li>팩스 : 070 - 7500 - 6098</li>
      </ul>
      <ul class="footer__link">
        <li><a href="" class="blog" aria-label="네이버 블로그"></a></li>
        <li><a href="" class="facebook" aria-label="페이스북"></a></li>
        <li><a href="" class="insta" aria-label="인스타그램"></a></li>
        <li><a href="" class="post" aria-label="네이버 포스트"></a></li>
        <li><a href="" class="youtube" aria-label="유튜브"></a></li>
      </ul>
    </article>
  </section>
  <article class="footer__disclaimer">
    <h4 class="sr-only">칼리 인증 내역</h4>
    <a href="" target="_blank" rel="noopener noreferrer" class="footer__disclaimer-link" aria-describedby="buttonSecurity">
    <img src="/images/security.svg" alt="보안" />
      <span id="buttonSecurity">
          [인증범위] 마켓칼리 쇼핑몰 서비스 개발 운영<br />
          (심사받지 않은 물리적 인프라 제외) <br />
          [유효기간] 2022.01.19 ~ 2025.01.18
      </span>
    </a>
    <a href="" target="_blank" rel="noopener noreferrer" class="footer__disclaimer-link" aria-describedby="buttonPrivacy">
      <img src="/images/privacy.svg" alt="프라이버시" />
      <span id="buttonPrivacy">
        개인정보보호 우수 웹사이트<br />
        개인정보처리시스템 인증 (ePRIVACY PLUS)
      </span>
    </a>
    <a href="" target="_blank" rel="noopener noreferrer" class="footer__disclaimer-link" aria-describedby="buttonTossPayments">
      <img src="/images/tossPayments.svg" alt="토스페이먼츠" />
      <span id="buttonTossPayments">
        토스페이먼츠 구매안전(에스크로) 서비스<br />를 이용하실 수 있습니다.
      </span>
    </a>
    <a href="" target="_blank" rel="noopener noreferrer" class="footer__disclaimer-link" aria-describedby="buttonWooriBank">
      <img src="/images/wooriBank.svg" alt="우리은행" width="36"/>
      <span id="buttonWooriBank">
        고객님이 현금으로 결제한 금액에 대해 우리은행과<br />
        채무지급보증 계약을 체결하여 안전거래를 보장하고 있습니다.
      </span>
    </a>
  </article>
  <p class="footer__copyright">마켓컬리에서 판매되는 상품 중에는 마켓컬리에 입점한 개별 판매자가 판매하는 마켓플레이스(오픈마켓) 상품이 포함되어 있습니다.<br/>
  마켓플레이스(오픈마켓) 상품의 경우 컬리는 통신판매중개자로서 통신판매의 당사자가 아닙니다. 컬리는 해당 상품의 주문, 품질, 교환/환불 등 의무와 책임을 부담하지 않습니다.
  <small>© KURLY CORP. ALL RIGHTS RESERVED</small></p>
  
`;

export class Footer extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(footerTemplate.content.cloneNode(true));
  }
  connectedCallback() {}
}

customElements.define("c-footer", Footer);
const cFooter = document.createElement("c-footer");
footer.append(cFooter);
