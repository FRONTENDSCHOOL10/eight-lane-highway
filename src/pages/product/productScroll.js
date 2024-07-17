document.addEventListener("DOMContentLoaded", () => {
  const targetElement = document.querySelector(".product__detail__menu"); // 고정할 요소
  const offset = targetElement.offsetTop - 192; // 요소의 초기 위치

  const productDescriptionBtn = document.getElementById(
    "productDescriptionBtn"
  );
  const productDetailBtn = document.getElementById("productDetailBtn");
  const productReviewBtn = document.getElementById("productReviewBtn");
  const productQnABtn = document.getElementById("productQnABtn");

  const productDescriptionArticle = document.getElementById(
    "productDescriptionArticle"
  );
  const productDetailArticle = document.getElementById("productDetailArticle");
  const productReviewArticle = document.getElementById("productReviewArticle");
  const productQnaArticle = document.getElementById("productQnaArticle");

  const scrollToElement = (element) => {
    const yOffset = -100; // 원하는 오프셋 크기
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  productDescriptionBtn.addEventListener("click", () => {
    scrollToElement(productDescriptionArticle);
  });

  productDetailBtn.addEventListener("click", () => {
    scrollToElement(productDetailArticle);
  });

  productReviewBtn.addEventListener("click", () => {
    scrollToElement(productReviewArticle);
  });

  productQnABtn.addEventListener("click", () => {
    scrollToElement(productQnaArticle);
  });

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > offset) {
      targetElement.classList.add("fixed");
    } else {
      targetElement.classList.remove("fixed");
    }
  });
});
