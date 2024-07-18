export class addToCartBubble extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Create the bubble container
    const productBubble = document.createElement("div");
    productBubble.className = "product__bubble";
    productBubble.innerHTML = `
      <style>
        .product__bubble {
          position: absolute;
          top: 60px;
          right: 10px;
          padding: 20px;
          border: 1px solid #c4c4c4;
          background-color: #fff;
          z-index: 100;
        }
        .product__bubble::after {
          content: "";
          position: absolute;
          top: -13px;
          right: 28px;
          display: block;
          width: 20px;
          height: 17px;
          background-image: url(/images/icon-bubble-tail.svg);
        }
        .bubble__image__container {
          width: 50px;
          background-color: #c4c4c4;
          margin-right: 16px;
        }
        .bubble__image__container img {
            width: 100%;
            height: 100%;
        }
        .bubble__text__container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
          gap: 8px;
        }
        .bubble__text__container h3 {
          color: #a6a6a6;
          font-size: 12px;
          font-weight: 600;
        }
        .bubble__text__container p {
          font-size: 12px;
        }
      </style>
      <div class="bubble__image__container">
        <img id="productImg" src="/" alt="상품 사진"/>
      </div>
      <div class="bubble__text__container">
        <h3 id="productName">상품이름</h3>
        <p>장바구니에 상품을 담았습니다.</p>
      </div>
    `;
    productBubble.style.display = "none";
    shadow.appendChild(productBubble);

    // Store a reference to the bubble element
    this.productBubble = productBubble;
  }

  show(productImage, productName) {
    const img = this.shadowRoot.getElementById("productImg");
    const name = this.shadowRoot.getElementById("productName");

    img.src = productImage;
    img.alt = productName;
    name.textContent = productName;

    this.productBubble.style.display = "flex";

    setTimeout(() => {
      this.productBubble.style.display = "none";
    }, 3000); // Hide after 3 seconds
  }
}

customElements.define("add-to-cart-bubble", addToCartBubble);
