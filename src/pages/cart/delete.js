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
    });
  });
}

// 선택항목 삭제 함수
export function deleteItem() {
  const deleteButton = document.querySelector(".checkbox__delete");
  const checkboxes = document.getElementsByName("accordion__input");

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
        }
      }
    });

    if (itemsToDelete.length > 0) {
      await removeLocalStorageItems(itemsToDelete);
    }
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
