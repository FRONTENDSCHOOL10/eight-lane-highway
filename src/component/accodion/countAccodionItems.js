// 카테고리 아이템 계산 함수
export function updateCategoryCounts(items) {
  const categoryCounts = {};

  // 아이템을 돌면서 categoryCounts에 들어있는 값과 일치하는 것이 있으면 값의 갯수를 증가해주고 아니면 갯수를 1 추가해줌
  items.forEach((item) => {
    if (categoryCounts[item.category]) {
      categoryCounts[item.category]++;
    } else {
      categoryCounts[item.category] = 1;
    }
  });

  // 위에서 구한 정보들을 가지고 아코디언과 비교하여 해당 span이 있다면 span에 값을 넣어줌
  for (const [category, count] of Object.entries(categoryCounts)) {
    const span = document.querySelector(`span[data-category="${category}"]`);
    if (span) {
      span.textContent = count;
    }
  }
}

// 브랜드 별 아이템 계산 함수
export function updateBrandCounts(items) {
  const brandCounts = {};

  // 아이템을 돌면서 brandCounts에 들어있는 값과 일치하는 것이 있으면 값의 갯수를 증가해주고 아니면 갯수를 1 추가해줌
  items.forEach((item) => {
    if (brandCounts[item.brand]) {
      brandCounts[item.brand]++;
    } else {
      brandCounts[item.brand] = 1;
    }
  });

  // 위에서 구한 정보들을 가지고 아코디언과 비교하여 해당 span이 있다면 span에 값을 넣어줌
  for (const [brand, count] of Object.entries(brandCounts)) {
    const span = document.querySelector(`span[data-brand="${brand}"]`);
    if (span) {
      span.textContent = count;
    }
  }
}

// 가격별 상품 계산 함수
export function updatePriceCounts(items) {
  // 가격 관련 객체
  const priceRanges = {
    "6,900원 미만": 0,
    "6,900원 ~ 9,900원": 0,
    "9,900원 ~ 14,500원": 0,
    "14,500원 이상": 0,
  };

  // item들의 가격과 비교하여 일치하는 것이 있으면 각각 개수 증가시킴
  items.forEach((item) => {
    if (item.price < 6900) {
      priceRanges["6,900원 미만"]++;
    } else if (item.price >= 6900 && item.price <= 9900) {
      priceRanges["6,900원 ~ 9,900원"]++;
    } else if (item.price > 9900 && item.price <= 14500) {
      priceRanges["9,900원 ~ 14,500원"]++;
    } else if (item.price > 14500) {
      priceRanges["14,500원 이상"]++;
    }
  });

  // 각각에 일치하는 요소에 위에서 구한 값 넣어줌
  document.getElementById("price1").textContent = priceRanges["6,900원 미만"];
  document.getElementById("price2").textContent =
    priceRanges["6,900원 ~ 9,900원"];
  document.getElementById("price3").textContent =
    priceRanges["9,900원 ~ 14,500원"];
  document.getElementById("price4").textContent = priceRanges["14,500원 이상"];
}

// 배달 유형별 상품 계산 함수
export function updateDeliveryCounts(items) {
  // 배달 유형 관련 객체
  const deliveryKinds = {
    샛별: 0,
    판매자: 0,
  };

  // item들의 배달 유형과 비교하여 일치하는 것이 있으면 각각 개수 증가시킴
  items.forEach((item) => {
    if (item.delivery === "샛별배송") {
      deliveryKinds["샛별"]++;
    } else if (item.delivery === "판매자배송") {
      deliveryKinds["판매자"]++;
    }
  });

  // 각각에 일치하는 요소에 위에서 구한 값 넣어줌
  document.getElementById("deli1").textContent = deliveryKinds["샛별"];
  document.getElementById("deli2").textContent = deliveryKinds["판매자"];
}

// 유형별 상품 계산 함수
export function updateTypeCounts(items) {
  // 유형 관련 객체
  const typeKinds = {
    KurlyOnly: 0,
    희소: 0,
  };

  // item들의 유형과 비교하여 일치하는 것이 있으면 각각 개수 증가시킴
  items.forEach((item) => {
    // 역시 여기서도 위 조건을 넣지 않으면 무조건 참으로 인식함으로 parse를 넣어줘야 함
    if (JSON.parse(item.is_karlyOnly.toLowerCase())) {
      typeKinds["KurlyOnly"]++;
    } else {
      typeKinds["희소"]++;
    }
  });

  // 각각에 일치하는 요소에 위에서 구한 값 넣어줌
  document.getElementById("type1").textContent = typeKinds["KurlyOnly"];
  document.getElementById("type2").textContent = typeKinds["희소"];
}

// 가격별 혜택 계산 함수
export function updateBenefitCounts(items) {
  // 혜택 관련 객체
  const Benefits = {
    할인: 0,
    한정: 0,
  };

  // item들의 혜택과 비교하여 일치하는 것이 있으면 각각 개수 증가시킴
  items.forEach((item) => {
    if (item.discount !== 0) {
      Benefits["할인"]++;
    }
    if (JSON.parse(item.is_limited.toLowerCase())) {
      Benefits["한정"]++;
    }
  });

  // 각각에 일치하는 요소에 위에서 구한 값 넣어줌
  document.getElementById("bene1").textContent = Benefits["할인"];
  document.getElementById("bene2").textContent = Benefits["한정"];
}

// 특정상품 제외 조건 계산 함수
export function updateExeptionCounts(items) {
  let count = 0;

  // item들의 특정 상품 제외 조건과 비교하여 일치하는 것이 있으면 각각 개수 증가시킴
  items.forEach((item) => {
    if (item.exeption === true) {
      count++;
    }
  });

  // 각각에 일치하는 요소에 위에서 구한 값 넣어줌
  document.getElementById("exeption").textContent = count;
}
