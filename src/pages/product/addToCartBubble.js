export class addToCartBubble extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Create the bubble container
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.innerHTML = `
    <link rel="stylesheet" href="/src/styles/style.scss" />
    
    <div class="product__bubble">
      <div class="bubble__image__container">
        <img id="productImg" />
      </div>
      <div class="bubble__text__container">
        <h3 id="productName">상품이름</h3>
        <p>장바구니에 상품을 담았습니다.</p>
      </div>
      </div>
    `;
    bubble.style.display = "none";
    shadow.appendChild(bubble);

    // Store a reference to the bubble element
    this.bubble = bubble;
  }

  show(productImage, productName) {
    const img = this.shadowRoot.getElementById("productImg");
    const name = this.shadowRoot.getElementById("productName");

    img.src = productImage;
    img.alt = productName;
    name.textContent = productName;

    this.bubble.style.display = "block";

    setTimeout(() => {
      this.bubble.style.display = "none";
    }, 3000); // Hide after 3 seconds
  }
}

customElements.define("add-to-cart-bubble", addToCartBubble);
