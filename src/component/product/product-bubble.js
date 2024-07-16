import { getPbImageURL } from "/src/api/getPbImageURL";

function displayProductDataInBubble(data) {
  const productBubble = document.querySelector(".product__bubble");
  const productImg = productBubble.querySelector("#productImg");
  const productName = productBubble.querySelector("#productName");

  productImg.src = getPbImageURL(data);
  productName.textContent = data.name;
}

displayProductDataInBubble();

class AddToCartBubble extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Create the bubble container
    const bubble = document.createElement("div");
    bubble.className = "product__bubble";
    bubble.innerHTML = `
      <div class="bubble__image__container">
        <img id="productImg" />
      </div>
      <div class="bubble__text__container">
        <h3 id="productName">상품이름</h3>
        <p>장바구니에 상품을 담았습니다.</p>
      </div>
    `;

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

customElements.define("add-to-cart-bubble", AddToCartBubble);

document
  .getElementById("addToCartButton")
  .addEventListener("click", function () {
    const bubble = document.querySelector("add-to-cart-bubble");
    bubble.show("path_to_product_image", "상품 이름"); // Replace with actual product data
  });
