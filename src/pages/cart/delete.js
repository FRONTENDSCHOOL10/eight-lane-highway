import pb from "../../api/pocketbase";
import { deleteStorage, getStorage, setStorage } from "../../lib";

// 상품 개별 삭제함수
export function deleteSelected() {
  const templates = document.querySelectorAll(".food-type__accordion");

  templates.forEach((item) => {
    const deleteButton = item.querySelector(".food-type__accordion__delete");
    deleteButton.addEventListener("click", () => {
      const value = item.querySelector(".food-type__accordion__name");
      removeLocalStorageItem(value.textContent);
      item.remove();
    });
  });
}

// 선택항목 삭제 함수
export function deleteItem() {
  const deleteButton = document.querySelector(".checkbox__delete");
  const checkboxes = document.getElementsByName("accordion__input");
  deleteButton.addEventListener("click", () => {
    Array.from(checkboxes).forEach((checkBox) => {
      if (checkBox.checked) {
        const item = checkBox.closest(".food-type__accordion");
        if (item) {
          const value = item.querySelector(".food-type__accordion__name");
          removeLocalStorageItem(value.textContent);
          item.remove();
        }
      }
    });
  });
}

// 로컬스토리지에서 삭제
async function removeLocalStorageItem(name) {
  const data = await pb
    .collection("products")
    .getFullList({ filter: `name ="${name}"` });
  const filteredData = data[0].id;

  const originItem = await getStorage("cartItems");
  const filteredProducts = originItem.filter(
    (product) => product.productID !== filteredData
  );

  setStorage("cartItems", filteredProducts);
}
