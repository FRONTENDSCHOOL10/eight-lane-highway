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
      </style>
      <link rel="stylesheet" href="/src/styles/style.scss" />
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
