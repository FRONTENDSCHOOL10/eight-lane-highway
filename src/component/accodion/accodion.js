import { toggleClass } from "/src/lib";

const titles = document.querySelectorAll(".accodian__menu__main__items__title");
const itemLists = document.querySelectorAll(".accodian__sub__items__info");

titles.forEach((item) => {
  item.addEventListener("click", toggleTitle);
});

itemLists.forEach((item) => {
  item.addEventListener("click", handleClickedItems);
});

// 아코디언 토글 함수
export function toggleTitle(e) {
  const titleElement = e.currentTarget;

  const subMenu = titleElement.nextElementSibling; // 버튼 클릭 시 ul을 펼치게 하기 위해 버튼의 형제인 ul을 부르기 위해 사용

  const svgElement = titleElement.querySelector("img");

  if (!subMenu) return;

  toggleClass(subMenu, "accodion_is__clicked"); // 버튼을 클릭하면 아코디언에 해당 클래스를 추가해 클래스를 넣다뺏다 할 수 있도록 토글
  svgElement.classList.toggle("rotate"); // svg를 회전할 수 있도록 rotate 클래스 토글
}

// export const selectedFilters = {
//   categories: [],
//   brands: [],
//   prices: [],
//   delivery: [],
//   types: [],
//   benefits: [],
//   exceptions: [],
// };

document.querySelectorAll(".input__checkbox").forEach((input) => {
  input.addEventListener("change", handleClickedItems);

  // 라벨에 클릭 이벤트 추가
  const label = input.nextElementSibling;
  label.addEventListener("click", (e) => {
    e.preventDefault(); // 기본 동작 방지
    input.checked = !input.checked; // 체크박스 상태 토글
    handleClickedItems({ target: input }); // 필터 처리
  });
});

export function handleClickedItems(e) {
  const target = e.target.closest("input");

  if (!target) return;

  const isChecked = target.checked;
  const labelElement = target.nextElementSibling.textContent;

  // if (target.checked) {
  //   addToFilters(labelElement, target);
  // } else {
  //   removeFilter(labelElement);
  // }
}

// function addToFilters(label, target) {
//   if (target.closest("ul").parentElement.textContent.includes("카테고리")) {
//     if (!selectedFilters.categories.includes(label)) {
//       selectedFilters.categories.push(label);
//     }
//   } else if (
//     target.closest("ul").parentElement.textContent.includes("브랜드")
//   ) {
//     if (!selectedFilters.brands.includes(label)) {
//       selectedFilters.brands.push(label);
//     }
//   } else if (target.closest("ul").parentElement.textContent.includes("가격")) {
//     if (!selectedFilters.prices.includes(label)) {
//       selectedFilters.prices.push(label);
//     }
//   } else if (target.closest("ul").parentElement.textContent.includes("배송")) {
//     if (!selectedFilters.delivery.includes(label)) {
//       selectedFilters.delivery.push(label);
//     }
//   } else if (target.closest("ul").parentElement.textContent.includes("유형")) {
//     if (!selectedFilters.types.includes(label)) {
//       selectedFilters.types.push(label);
//     }
//   } else if (target.closest("ul").parentElement.textContent.includes("혜택")) {
//     if (!selectedFilters.benefits.includes(label)) {
//       selectedFilters.benefits.push(label);
//     }
//   } else if (
//     target.closest("ul").parentElement.textContent.includes("특정상품 제외")
//   ) {
//     if (!selectedFilters.exceptions.includes(label)) {
//       selectedFilters.exceptions.push(label);
//     }
//   }
//   console.log(selectedFilters);
// }

// function removeFilter(label) {
//   Object.keys(selectedFilters).forEach((key) => {
//     selectedFilters[key] = selectedFilters[key].filter(
//       (item) => item !== label
//     );
//   });

//   console.log(selectedFilters);
// }

// function checkPriceFilter(price) {
//   if (selectedFilters.prices.includes("6,900원 미만")) {
//     if (price < 6900) return true;
//   }
//   if (selectedFilters.prices.includes("6,900원 ~ 9,900원")) {
//     if (price >= 6900 && price <= 9900) return true;
//   }
//   if (selectedFilters.prices.includes("9,900원 ~ 14,500원")) {
//     if (price > 9900 && price <= 14500) return true;
//   }
//   if (selectedFilters.prices.includes("14,500원 이상")) {
//     if (price > 14500) return true;
//   }
//   return false;
// }

// export function filterProducts(data) {
//   const allProducts = data;
//   console.log(allProducts);
//   const filteredItems = allProducts.filter((item) => {
//     const matchesCategory =
//       selectedFilters.categories.length === 0 ||
//       selectedFilters.categories.includes(item.category);
//     const matchesBrand =
//       selectedFilters.brands.length === 0 ||
//       selectedFilters.brands.includes(item.brand);
//     const matchesPrice = checkPriceFilter(item.price);
//     const matchesDelivery =
//       selectedFilters.delivery.length === 0 ||
//       selectedFilters.delivery.includes(item.delivery);
//     const matchesType =
//       selectedFilters.types.length === 0 ||
//       selectedFilters.types.includes(item.type);
//     const matchesBenefit =
//       selectedFilters.benefits.length === 0 ||
//       selectedFilters.benefits.includes(item.benefit);
//     const matchesException =
//       selectedFilters.exceptions.length === 0 ||
//       !selectedFilters.exceptions.includes(item.exception);

//     return (
//       matchesCategory &&
//       matchesBrand &&
//       matchesPrice &&
//       matchesDelivery &&
//       matchesType &&
//       matchesBenefit &&
//       matchesException
//     );
//   });

//   renderFilteredProductList(filteredItems);
// }

// function renderFilteredProductList(filteredItems) {
//   console.log(filteredItems);
// }
