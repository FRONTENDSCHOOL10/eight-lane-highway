export function updateCategoryCounts(items) {
  const categoryCounts = {};

  items.forEach((item) => {
    if (categoryCounts[item.category]) {
      categoryCounts[item.category]++;
    } else {
      categoryCounts[item.category] = 1;
    }
  });

  for (const [category, count] of Object.entries(categoryCounts)) {
    const span = document.querySelector(`span[data-category="${category}"]`);
    if (span) {
      span.textContent = count;
    }
  }
}

export function updateBrandCounts(items) {
  const brandCounts = {};

  items.forEach((item) => {
    if (brandCounts[item.brand]) {
      brandCounts[item.brand]++;
    } else {
      brandCounts[item.brand] = 1;
    }
  });

  for (const [brand, count] of Object.entries(brandCounts)) {
    const span = document.querySelector(`span[data-brand="${brand}"]`);
    if (span) {
      span.textContent = count;
    }
  }
}

export function updatePriceCounts(items) {
  const priceRanges = {
    "6,900원 미만": 0,
    "6,900원 ~ 9,900원": 0,
    "9,900원 ~ 14,500원": 0,
    "14,500원 이상": 0,
  };

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

  document.getElementById("price1").textContent = priceRanges["6,900원 미만"];
  document.getElementById("price2").textContent =
    priceRanges["6,900원 ~ 9,900원"];
  document.getElementById("price3").textContent =
    priceRanges["9,900원 ~ 14,500원"];
  document.getElementById("price4").textContent = priceRanges["14,500원 이상"];
}

export function updateDeliveryCounts(items) {
  const deliveryKinds = {
    샛별: 0,
    판매자: 0,
  };

  items.forEach((item) => {
    if (item.delivery === "샛별배송") {
      deliveryKinds["샛별"]++;
    } else if (item.price >= 6900 && item.price <= 9900) {
      deliveryKinds["판매자"]++;
    }
  });

  document.getElementById("deli1").textContent = deliveryKinds["샛별"];
  document.getElementById("deli2").textContent = deliveryKinds["판매자"];
}

export function updateTypeCounts(items) {
  const typeKinds = {
    KurlyOnly: 0,
    희소: 0,
  };

  items.forEach((item) => {
    if (JSON.parse(item.is_karlyOnly.toLowerCase())) {
      typeKinds["KurlyOnly"]++;
    } else {
      typeKinds["희소"]++;
    }
  });

  document.getElementById("type1").textContent = typeKinds["KurlyOnly"];
  document.getElementById("type2").textContent = typeKinds["희소"];
}

export function updateBenefitCounts(items) {
  const Benefits = {
    할인: 0,
    한정: 0,
  };

  items.forEach((item) => {
    if (item.discount !== 0) {
      Benefits["할인"]++;
    }
    if (JSON.parse(item.is_limited.toLowerCase())) {
      Benefits["한정"]++;
    }
  });

  document.getElementById("bene1").textContent = Benefits["할인"];
  document.getElementById("bene2").textContent = Benefits["한정"];
}

export function updateExeptionCounts(items) {
  let count = 0;

  items.forEach((item) => {
    if (item.exeption === true) {
      count++;
    }
  });

  document.getElementById("exeption").textContent = count;
}
