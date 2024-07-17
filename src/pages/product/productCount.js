import PocketBase from "pocketbase";
import { setStorage, getStorage } from "/src/lib/utils/storage";

const pb = new PocketBase("https://eight-lane-highway.pockethost.io");

async function getProductPrice(productId) {
  try {
    const record = await pb.collection("products").getOne(productId);
    console.log("Product record:", record); // 데이터베이스에서 가져온 제품 정보 로그 출력
    return record.price;
  } catch (error) {
    console.error("Failed to fetch product price:", error);
    return 0;
  }
}

function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("product");
  console.log("Product ID from URL:", productId); // 콘솔에 제품 ID 출력
  return productId;
}

// 상품 갯수 별 가격 증가 / 감소 함수
function handleCounterProduct(countNode, price, resultNode) {
  return function (e) {
    const target = e.target.closest("button");

    if (!target) return;

    let count = parseInt(countNode.textContent);

    if (target.id === "plusBtn") {
      count += 1;
    } else if (target.id === "minusBtn") {
      if (count <= 1) {
        alert("상품 개수가 1보다 작으면 안됩니다!");
        return;
      }
      count -= 1;
    }

    countNode.textContent = count;
    const totalPrice = count * price;
    resultNode.textContent = totalPrice.toLocaleString();

    console.log(
      `Count: ${countNode.textContent}, Total Price: ${resultNode.textContent}`
    );
  };
}

// 로컬스토리지에 장바구니 항목 추가 함수
export function handleAddCart(id) {
  return async function (e) {
    e.preventDefault();

    let productNum = document.querySelector("#count").textContent;

    let cartItems = await getStorage("cartItems");

    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }

    let existedItems = cartItems.find((item) => item.productID === id);

    console.log(existedItems);

    if (existedItems) {
      existedItems.quantity =
        parseInt(existedItems.quantity) + parseInt(productNum);
    } else {
      cartItems.push({ productID: id, quantity: parseInt(productNum) });
    }

    setStorage("cartItems", cartItems);

    // 팝업을 닫는 대신 로그를 남깁니다.
    console.log("Cart updated:", cartItems);
  };
}
function displayProductDataInBubble(data) {
  const bubble = document.querySelector("add-to-cart-bubble");
  const productImageURL = getPbImageURL(data);
  const productName = data.name;

  if (bubble) {
    bubble.show(productImageURL, productName);
  } else {
    console.error("Add to Cart Bubble not found");
  }
}

class AddToCartBubble extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Create the bubble container
    const bubble = document.createElement("div");
    bubble.className = "product__bubble";
    bubble.innerHTML = `
      <style>
        .product__bubble {
          display: none;
          position: fixed;
          bottom: 20px;
          right: 20px;
          padding: 10px;
          background: #fff;
          border: 1px solid #ccc;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          z-index: 1000;
        }
        .bubble__image__container img {
          max-width: 50px;
          max-height: 50px;
        }
      </style>
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
// 초기화 함수
async function initializePage() {
  const countNode = document.getElementById("count");
  const resultNode = document.getElementById("totalPrice");
  const productId = getProductIdFromUrl(); // URL에서 제품 ID 가져오기

  // 가격을 받아와서 이벤트 핸들러 설정
  getProductPrice(productId).then((price) => {
    console.log(`Product Price: ${price}`);

    // 초기 총 가격 설정
    const initialPrice = parseInt(countNode.textContent) * price;
    resultNode.textContent = initialPrice.toLocaleString();

    const handleCounter = handleCounterProduct(countNode, price, resultNode);
    document.getElementById("plusBtn").addEventListener("click", handleCounter);
    document
      .getElementById("minusBtn")
      .addEventListener("click", handleCounter);
  });

  // 장바구니 추가 버튼 이벤트 리스너 설정
  const addCartButton = document.getElementById("addCartBtn");
  if (addCartButton) {
    addCartButton.addEventListener("click", handleAddCart(productId));
  } else {
    console.error("Add to Cart button not found");
  }
}

document.addEventListener("DOMContentLoaded", initializePage);
