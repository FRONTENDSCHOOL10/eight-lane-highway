import axios from "axios";
import getPbImageURL from "/src/api/getPbImageURL";
import "/main.js";
import "./productCount.js";
import "./productScroll.js";

// 포켓베이스 API URL
const pbUrl = "https://eight-lane-highway.pockethost.io";

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
    const response = await axios.get(
      `${pbUrl}/api/collections/products/records/${productId}`
    );
    const data = response.data;
    console.log("Fetched product data:", data); // 가져온 데이터 로그 출력
    displayProductData(data);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

// 상품 데이터를 HTML에 표시하는 함수
function displayProductData(data) {
  if (!data) {
    console.error("No data provided to display");
    return;
  }

  const productImgContainer = document.getElementById("product__image");

  // 상품 이미지 URL 설정 (포켓베이스에서 이미지 URL 구성 방식에 따라 수정)
  productImgContainer.src = getPbImageURL(data);
  productImgContainer.alt = data.name; // 상품 이름을 이미지 alt 속성에 설정

  document.querySelectorAll(".title__secondary").forEach((element) => {
    element.textContent = data.subtitle;
  });
  document.querySelectorAll(".price__emphasis").forEach((element) => {
    element.textContent = data.price.toLocaleString();
  });

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
  document.getElementById("productDetailText").textContent = data.detail;

  // 이미지 세팅 함수
  function setImage(elementId, imageUrl, altText) {
    const element = document.getElementById(elementId);
    if (element) {
      element.src = imageUrl;
      element.alt = altText;
    } else {
      console.warn(`Element with ID ${elementId} not found`);
    }
  }

  if (data) {
    setImage(
      "productDetailImage",
      getPbImageURL(data, "productPhoto"),
      data.name
    );
    setImage(
      "productCheckPointImage",
      getPbImageURL(data, "checkpoint"),
      data.name
    );
    setImage(
      "productDetailInfoImage",
      getPbImageURL(data, "detailInfo"),
      data.name
    );
  } else {
    console.error("Data object is missing");
  }
}

// 초기화 함수
async function initializeProductDetail() {
  try {
    const authResponse = await axios.post(
      `${pbUrl}/api/admins/auth-with-password`,
      {
        identity: "vanillajs.eightlanehighway@gmail.com",
        password: "admin0000",
      }
    );

    const token = authResponse.data.token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

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
