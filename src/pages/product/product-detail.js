import getPbImageURL from "/src/api/getPbImageURL";
import PocketBase from "pocketbase";

// 포켓베이스 설정
const pb = new PocketBase("https://eight-lane-highway.pockethost.io");

// URL 매개변수에서 상품 ID 추출
function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("product");
  console.log("Product ID from URL:", productId); // 콘솔에 제품 ID 출력
  return productId;
}

// 포켓베이스에서 상품 데이터를 가져오는 함수
async function fetchProductData(productId) {
  try {
    const data = await pb.collection("products").getOne(productId);
    displayProductData(data);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

// 상품 데이터를 HTML에 표시하는 함수
function displayProductData(data) {
  const productImgContainer = document.getElementById("product__image");
  const productInfoContainer = document.querySelector(
    ".product__info__container"
  );

  // 상품 이미지 URL 설정 (포켓베이스에서 이미지 URL 구성 방식에 따라 수정)
  // productImgContainer.src = getPbImageURL(data.photo);
  // productImgContainer.alt = data.name; // 상품 이름을 이미지 alt 속성에 설정

  productInfoContainer.querySelector(".title__secondary").textContent =
    data.subtitle;
  productInfoContainer.querySelector(".price__emphasis").textContent =
    data.price.toLocaleString();

  document.querySelectorAll(".title__product").forEach((element) => {
    element.textContent = data.name;
  });
  document.querySelectorAll(".product__delivery").forEach((element) => {
    element.textContent = data.delivery;
  });
  document.getElementById("product__seller").textContent = data.seller;
  document.querySelector(".product__packiging__detail").textContent =
    data.packaging;
  document.getElementById("product__packiging__unit").textContent = data.unit;
  document.getElementById("product__packiging__weight").textContent =
    data.weight;
  document.getElementById("product__allergic").textContent = data.allergic;
}

// 초기화 함수
async function initializeProductDetail() {
  try {
    await pb.admins.authWithPassword(
      "vanillajs.eightlanehighway@gmail.com",
      "admin0000"
    );

    const productId = getProductIdFromUrl();
    if (productId) {
      await fetchProductData(productId);
    } else {
      console.error("No product ID found in URL");
    }
  } catch (error) {
    console.error("Error during initialization:", error);
  }
}

document.addEventListener("DOMContentLoaded", initializeProductDetail);
