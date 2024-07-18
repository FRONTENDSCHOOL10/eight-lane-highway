import { getStorage, setStorage } from "/src/lib/index.js";

// 최근 본 상품 리스트를 가져오는 함수
async function getRecentProductsList() {
  return await getStorage("recent");
}

// 최근 본 상품 ID를 제거하는 함수
export async function removeRecentProductsId(e) {
  const url = new URLSearchParams(e.target.closest("a").href);
  let targetId;
  for (const [_, a] of url) targetId = a;
  let src = e.target.closest("img").src;

  let recentProductsList = await getRecentProductsList();
  if (!recentProductsList) return;
  // 중복 상품 삭제
  recentProductsList = recentProductsList.filter(
    (item) => item.id !== targetId
  );

  // 최근 본 상품이 5개 초과일 경우, 가장 오래된 상품 하나를 삭제
  if (recentProductsList.length > 4) {
    recentProductsList.shift(); // 가장 오래된 상품 하나를 삭제
  }
  recentProductsList.push({ id: targetId, src });
  await setStorage("recent", recentProductsList); // 수정된 목록을 저장
}
