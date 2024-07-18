import { getNode, removeClass, addClass } from "/src/lib/index.js";
import axios from "axios";

const swiperContainer = getNode(".banner");

if (swiperContainer) {
  const swiper = new Swiper(".banner .swiper", {
    loop: true,
    autoplay: true,
    navigation: {
      prevEl: ".banner .swiper-button-prev",
      nextEl: ".banner .swiper-button-next",
    },
    pagination: {
      el: ".banner .swiper-pagination",
      type: "fraction",
    },
  });
  swiperContainer.addEventListener("mouseenter", () => {
    addClass(buttonContainer, "is__show");
  });
  swiperContainer.addEventListener("mouseleave", () => {
    removeClass(buttonContainer, "is__show");
  });
}
const buttonContainer = getNode(".banner__button-container");

async function fetchBannerImages() {
  const baseURL = "https://eight-lane-highway.pockethost.io/api/files";

  try {
    const authResponse = await axios.post(
      "https://eight-lane-highway.pockethost.io/api/admins/auth-with-password",
      {
        identity: "vanillajs.eightlanehighway@gmail.com",
        password: "admin0000",
      }
    );
    const data = authResponse.data;
    console.log(data);

    const token = authResponse.data.token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(
      "https://eight-lane-highway.pockethost.io/api/collections/banner/records"
    );

    // 포켓베이스 API에서 반환한 데이터를 기반으로 이미지 URL 배열 생성
    const bannerImages = response.data.items.map((item) => {
      return `${baseURL}/${item.collectionId}/${item.id}/${item.banner}`;
    });

    // 이미지 URL을 각 배너 요소에 설정
    bannerImages.forEach((url, index) => {
      const imgElement = document.getElementById(`banner${index + 1}`);
      if (imgElement) {
        imgElement.src = url;
      }
    });
  } catch (error) {
    console.error("Error fetching banner images:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchBannerImages);
