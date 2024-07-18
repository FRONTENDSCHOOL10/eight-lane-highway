import pb from "../../api/pocketbase";
import { deleteStorage, getStorage, isArray, setStorage } from "../../lib";
import { updateSelectedCount } from "./countedItem";
import { updateSumAllPrice } from "./sumAllPrice";

// 상품 개별 삭제 함수
export function deleteSelected() {
  const templates = document.querySelectorAll(".cart__accordion");

  templates.forEach((item) => {
    const deleteButton = item.querySelector(".cart__accordion__delete");
    deleteButton.addEventListener("click", async () => {
      const value = item.querySelector(".cart__accordion__name");
      await removeLocalStorageItems(value.textContent);
      item.remove();
      // 결제영역 가격 업데이트
      updateSumAllPrice();
      // 선택/전체 수량 업데이트
      updateSelectedCount();
      //
      hideFoodType();
    });
  });
}

// 선택항목 삭제 함수
export function deleteItem() {
  const deleteButtons = document.querySelectorAll(".checkbox__delete");
  const checkboxes = document.getElementsByName("accordion__input");

  Array.from(deleteButtons).forEach((deleteButton) => {
    deleteButton.addEventListener("click", async () => {
      // 배열만들어서 삭제할(체크된) 아이템 이름 추가
      let itemsToDelete = [];

      Array.from(checkboxes).forEach((checkBox) => {
        if (checkBox.checked) {
          const item = checkBox.closest(".cart__accordion");
          if (item) {
            const value = item.querySelector(".cart__accordion__name");
            // 체크된 아이템 이름 배열에 추가
            itemsToDelete.push(value.textContent);
            // 해당 아이템 태그 삭제
            item.remove();
            // 결제영역 가격 업데이트
            updateSumAllPrice();
            // 선택/전체 수량 업데이트
            updateSelectedCount();
            //
            hideFoodType();
          }
        }
      });

      if (itemsToDelete.length > 0) {
        await removeLocalStorageItems(itemsToDelete);
      }
    });
  });
}

// 로컬스토리지에서 항목 삭제 및 여러 항목 삭제
async function removeLocalStorageItems(names) {
  // names을 배열로 받을경우 (선택삭제)
  if (isArray(names)) {
    const datas = await pb.collection("products").getFullList({
      filter: names.map((name) => `name="${name}"`).join(" || "),
    });
    const deleteIds = datas.map((item) => item.id);

    const originProducts = await getStorage("cartItems");

    const filteredProducts = originProducts.filter(
      (product) => !deleteIds.includes(product.productID)
    );

    setStorage("cartItems", filteredProducts);
  } else {
    // names가 배열이 아니고 1개인 경우 (상품 개별 삭제)
    const data = await pb
      .collection("products")
      .getFullList({ filter: `name ="${names}"` });
    const deleteId = data[0].id;

    const originItems = await getStorage("cartItems");
    const filteredItems = originItems.filter(
      (product) => product.productID !== deleteId
    );

    setStorage("cartItems", filteredItems);
  }
}

// 상온,냉장,냉동 각 카테고리에 해당 하는 상품이 없을 경우 해당 UI 삭제하기
export function hideFoodType() {
  const foodItems = document.querySelectorAll(".food-type__item");

  foodItems.forEach((foodItem) => {
    // 각 food-type__item 요소 내에 cart__accordion 요소가 있는지 확인
    const hasCartAccordion =
      foodItem.querySelector(".cart__accordion") !== null;

    // cart__accordion 요소가 있으면 해당 food-type__item 요소를 삭제
    if (!hasCartAccordion) {
      foodItem.remove();
    }
  });
}
