# 멋쟁이사자처럼 테킷 프론트엔드 스쿨 10기 8조 바닐라 프로젝트 저장소

## CHANGELOG

### 2024-07-05

**최소현**

- component/pop-up/index.html: `index.html` 생성 및 마크업
- component/pop-up/main.js: `main.js` 생성 및 팝업 닫기, 오늘 하루 안 보기 기능 구현

**오성훈**

- login/index.html: 로그인 페이지 마크업
- login/login.scss: 로그인 페이지 기본 스타일링
- styles/sr-only.css: label 요소 보이지 않게 하기 위한 `sr-only.css` 파일 작성

**김한울**

- signup.html: 회원가입 페이지 구현
- styles/style.scss: 컴포넌트 scss import
- component/assets/mixin.scss: 믹스인 scss 생성
- component/assets/forms.scss: form 컴포넌트 scss 생성
- component/assets/inputs.scss: input 컴포넌트 scss 생성
- component/assets/layout.scss: layout 컴포넌트 scss 생성

---

### 2024-07-06

**이희재**

- component/header/header.js: pages 클릭시 클래스 토글
- component/header/header.scss: header.scss 전반적인 수정

**최소현**

- component/pop-up/main.js : `div`에서 `dialog`로 기능 수정
- component/pop-up/index.html : `div`에서 `dialog`로 마크업 수정
- component/pop-up/style.scss : popup 기본 스타일링

**오성훈**

- login/index.html
  - 아이디와 비밀번호 input 요소에 require 속성 추가
  - 로그인과 회원가입 바로 가기 버튼 클래스 네이밍 수정
  - ul요소에 aria-labelledbyId attribute를 주었음으로 그에 해당하는 각각의 li에게 동일한 id를 부여
  - button 태그와 a태그의 차이로 인한 클래스 추가
- login/login.scss: 새로 추가된 a태그 class 스타일링
- component/assets/buttons.scss: 버튼 컴포넌트 스타일 작성

**김한울**

- component/assets/mixin.scss: input 믹스인 수정
- component/assets/inputs.scss: input 믹스인 수정에 따른 네이밍 수정
- component/assets/character.scss: character 컴포넌트 scss 생성
- component/assets/style.scss: character 컴포넌트 import
- component/assets/layout.scss: p 요소 스타일 지정
- signup.html: 이슈 사항 수정

---

## 2024-07-07

**최소현**

- component/pop-up/index.html : 클래스명 수정
- component/pop-up/style.scss : popup 스타일링 추가
- component/recent-product/index.html: 최근 본 상품 마크업
- component/recent-product/main.js: 최근 본 상품 스크립트 생성
- component/assets/\_recentproduct.scss: 최근 본 상품 기본 스타일링
- component/recent-product/index.html: `span`태그 `button`태그로 변경
- component/header/header.css: 불필요한 파일 삭제
- component/pop-up/index.html : scss 경로 수정

**이희재**

- component/header/header.js : pages 클릭시 클래스 토글 코드 수정
- component/header/header.js : category 메뉴 추가 및 클래스 토글 코드 구현
- component/header/assets : category svg 파일 추가
- component/header/assets/index.js : assets img들을 export 하기 위해 index.js로 담아서 export
- component/assets/header.scss : scss 경로변경
- component/assets/header.scss : category 메뉴 디자인
- component/assets/variables.scss : variables 변수 추가
- styles/style.scss : header.scss import
- component/header/header.css : 불필요한 css 파일 삭제

  **오성훈**

- component/assets/buttons.scss : 파일 명 변경
- component/assets/login.scss :
  - 파일 명 변경
  - 아이디 찾기와 비번 찾기 링크 모음 스타일링
- component/assets/mixins.scss : button요소 믹스인 추가
- component/assets/variables.scss : 색 변수 추가

## 2024-07-08

**이희재**

- component/header/header.js : 클래스 네이밍 수정
- component/header/header.scss : 선택자 수정
- component/assets/mixins.scss : absolute,width,height mixin 생성
- component/header/header.scss : absolute,width,height mixin 사용
- component/header/header.js : img alt 수정
- lib추가

**최소현**

- component/recent-product/index.html: 마크업 수정
- component/recent-product/main.js: 기능 구현중
- component/assets/\_recentproduct.scss: 스타일링 수정
- component/assets/\_popup.scss : 파일명 수정
- component/pop-up/main.js : 인라인 스타일에서 클래스 토글로 수정

**오성훈**

- login/login.js: 로그인 기능 추가
  - 포켓호스트 SDK를 활용하여 로그인 여부 확인
  - 받아온 로그인 정보를 로컬스토리지에 저장
  - 스토리지에서 값을 받아오고 저장하기 위한 함수 생성
  - 잘못된 아이디 비밀번호 값 입력 시 alert창으로 경고
  - 로그인 성공 시 메인 페이지로 이동
- component/variables.scss: 잘못된 변수 값 수정
- component/header.scss: 충돌이 발생한 헤더 마진 영역 수정

**김한울**

- feature: 회원가입 마크업 및 스크립트 작업
- feature: product 컴포넌트 생성
- refactor: input width 값 수정
- component/assets/badges.scss: 뱃지 작업
- component/assets/buttons.scss: icon 버튼 작업
- component/assets/character.scss: text 컴포넌트 작업
- component/assets/products.scss: products 스타일링
- component/assets/variables.scss: 강조 컬러, 그레이100 추가
- product/product.html: 마크업 작업 및 포켓베이스 이미지 연결

## 2024-07-09

**이희재**

- component/header/header.js : 마크업 및 이벤트 추가
- component/header/header.scss : 그리드 레이아웃 구현
- component/footer/footer.js : 마크업
- component/footer/footer.scss : 디자인 작업
- component/footer/assets : 필요한 svg 파일 삽입

**최소현**

- component/recent-product/main.js: 데이터 받아오기 구현
- component/recent-product/index.html: 마크업 일부 수정
- component/recent-product/main.js: 클래스명 수정
- component/recent-product/index.html: 클래스명 수정
- component/assets/\_recentproduct.scss: 클래스명 수정
- api/getPbImageURL.js: getPbImageURL API 생성
- api/pocketbase.js: pocketbase api 생성
- component/recent-product/main.js: 로컬스토리지 저장 및 데이터 불러오기 구현
- component/recent-product/index.html: 태그 속성 수정

**오성훈**

- 브랜치 네임 변경 (bug) : addShoppingBasket -> add-shopping-basket
- component/addShoppingBasket/addShoppingBasket.html : 장바구니 추가 마크업 어제에 이어 추가
- component/assets/mixins.scss: flexAll 믹스인 수정
  - 기본값 설정 및 gap 속성 추가
- component/assets/addShoppingBasket.scss:
  - 장바구니 추가 컴포넌트 중 물품 개수 설정 부분 스타일링
  - 버튼 모음 영역 스타일링
- component/assets/buttons.scss: 회색 선 버튼 스타일과 새로운 버튼 크기 스타일 추가
- component/product/product-detail.html: 물품 세부정보 하단 컴포넌트 마크업
- component/assets/product-detail.scss: 물품 세부 정보 하단 컴포넌트 스타일링 중 네비게이션 부분 스타일링, `is__clicked` 스타일 추가
- lib/utils/tiger.js: async 없이 사용된 await문 제거 (build 생성시 오류 발생하므로)
- lib/utils/storage.js: async 없이 사용된 await문 제거 (build 생성시 오류 발생하므로)

**김한울**

- 기본-이슈-템플릿.md: 이슈 템플릿 내용 수정
- component/product/product-info.html: 상세페이지 정보 부분 마크업 및 스타일링, 배포 빌드 내용 수정
- component/product/product.html: 배포 빌드 내용 수정
- src/pages/signup/checkAll.js -> src/pages/register/checkAll.js: 배포 빌드 내용 수정
- src/pages/signup/index.html -> src/pages/register/index.html: 배포 빌드 내용 수정
- src/pages/signup/signup.js -> src/pages/register/register.js: 배포 빌드 내용 수정
- .github/workflows/main/yml: 배포 관련 yml 작성

## 2024-07-10

**최소현**

- component/recent-product/main.js: 스와이퍼 기능 추가
- component/recent-product/index.html: 스와이퍼 관련 마크업 구조 수정
- component/assets/\_recentproduct.scss: 스와이퍼 관련 스타일링 수정

**이희재**

- component/product/product-slide.html: product-slide 마크업
- component/assets/product-slide.scss: product-slide 디자인
- component/product/product-slide.js: 스와이퍼 기능 추가
- component/header/header-slide.js: build시 scss 경로 수정
- component/footer/footer-slide.js: build시 scss 경로 수정

**오성훈**

- product/product-detail.html: 상품 세부 하단 컴포넌트 중 karly's point 부분 전체와 why karly 일부 마크업
- assets/products-detail.scss: 상품 세부 하단 컴포넌트 karly's point 부분 전체와 why karly 일부 스타일링
- public/images: checkpoint.png, jjolmeon-detail-info.png, jjolmeon.png 추가

**김한울**

- **김한울**

- public/images/icon-minus-active.svg,
  public/images/icon-minus-disabled.svg,
  public/images/icon-plus-active.svg,
  public/images/icon-plus-disabled.svg,
  public/images/icon-bell.svg,
  public/images/icon-heart.svg: 이미지 파일 추가
- src/component/assets/\_mixins.scss: 믹스인 속성 수정
- src/component/assets/\_badges.scss: 뱃지 스타일 추가
- src/component/assets/\_buttons.scss: 버튼 스타일 추가
- src/component/assets/\_products.scss: 상품 정보 스타일링
- src/component/assets/\_typography.scss: 타이포 스타일 추가
- src/component/assets/\_products-detail.scss: 변수명 수정
- src/component/product/product-info.html: 상품 정보 스타일링 및 구조 디테일 작업
- src/styles/reset.css: 버튼 reset 속성 추가
- .github/workflows/main.yml: 빌드 파일 생성
- index.html: 스타일 파일 경로 변경
- main.js: 스타일 파일 경로 변경

---

## 2024-07-11

**최소현**

- src/style/style.scss cart.scss추가
- src/pages/cart 기본 마크업
- component/assets/\_typography 수정
- public/images `sun`, `frozen`, `water` svg 파일 추가

**오성훈**

- product/product-detail.html: 상품 세부 하단 컴포넌트 마크업 마무리
- assets/products-detail.scss: 상품 세부 하단 컴포넌트 스타일 마무리
- assets/mixins.scss: font 믹스인에 사용자가 글자색을 추가할 수 있도록 추가
- pakage.json: 빌드 파일을 지우는 `clean` script를 `rm -rf docs`를 통해 작성
- public/images: `icon-k-box`, `icon-check-list`, `icon-recycle`, `icon-truck`, `icon-won` svg 파일 추가
- src/style/style.scss 장바구니 기본 스타일링
- vite.config.js 장바구니 페이지 추가

---

## 2024-07-13

**김한울**

- input 경로 수정
- checkAll 함수 클래스 함수로 변경
- register/index.html: 아이디 빈값 삭제
- register 포켓베이스 데이터 연결 (함수 분리 필요)
- 주소 API 추가
- 핸드폰 번호 유효성 검사
- 이메일 검사
- 회원가입 페이지 스타일링 수정

**이희재**

- main 페이지 레이아웃 및 전반적인 js추가

## 2024-07-14

**오성훈**

- component/addShoppingBasket/addShoppingBasket.html: 팝업을 위한 일부 마크업 수정
- assets/addShoppingBasket.scss:
  - 믹스인 안에 있는 font 믹스인으로 폰트 수정
  - 팝업을 위한 스타일링 추가
- component/addShoppingBasket/addShoppingBasket.js
  - 장바구니 추가에 + / - 버튼 클릭 시 숫자가 변동되도록 함
  - 장바구니 추가에 + / - 버튼 클릭 시 숫자 변동에 따른 총 합 변동하게 하기
  - 팝업을 열고 닫는 함수 추가
  - 포켓호스트 SDK를 사용하여 상품 정보를 서버에서 받아올 수 있도록 수정

**이희재**

- header.scss에서 호버시 svg 컬러 바뀌는 작업

## 2024-07-15

**김한울**

- src/pages/product-detail/product-detail.html: 상품 상세페이지 추가
- src/component/header/header.js: 주석 추가
- src/pages/register/emailCheck.js: 이메일 체크 함수 분리
- src/pages/register/idCheck.js: 아이디 체크 함수 분리
- src/pages/register/passwordCheck.js: 비번 체크 함수 분리
- src/pages/register/index.html: 회원가입 페이지 컨테이너 클래스 추가
- src/pages/register/register.js: 함수 분리
- src/component/assets/\_register.scss: 회원가입 스타일링
  **이희재**

- src/component/footer/footer.js: footer안에 to-top버튼 추가
- src/component/banner/banner.js: banner에 button, pagination 추가
- src/component/product/product-slide1.js: 상품 클릭시 장바구니 팝업 생성
- src/component/product/product-slide1.js: 상품 클릭시 최근 본 상품에 추가

**오성훈**

- component/accodian/accodian.html: 아코디언 마크업 진행
- assets/accodian.scss: 아코디언 스타일링 진행
- component/accodian/accodian.js: 아코디언 접었다 펼쳤다 하는 기능 추가
- component/addShoppingBasket/addShoppingBasket.js: 새로운 상품 추가 시 로컬스토리지에 저장되어지는 것이 새로운 것으로 대체되는 문제를 누적되는 것으로 변경
