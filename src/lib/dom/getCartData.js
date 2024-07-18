import { getStorage, addClass } from "/src/lib/index.js";

// c-header 요소가 로드될 때까지 기다립니다
export async function getCartData() {
  const cartItems = await getStorage("cartItems");
  if (!cartItems) return;

  const cHeader = document.querySelector("c-header");
  if (!cHeader) {
    console.error("c-header element not found");
    return;
  }

  const shadowRoot = cHeader.shadowRoot;
  if (!shadowRoot) {
    console.error("shadowRoot not found in c-header");
    return;
  }

  const cartCount = shadowRoot.querySelector("#cartCount");
  if (!cartCount) {
    console.error("#cartCount element not found in shadowRoot");
    return;
  }

  addClass(cartCount, "is__active");
  cartCount.innerHTML = cartItems.length;

  if (cartItems.length === 0) {
    addClass(cartCount, "is__active");
  }
}
