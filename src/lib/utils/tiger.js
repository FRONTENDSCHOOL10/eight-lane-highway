const ENDPOINT = "https://jsonplaceholder.typicode.com/users";

const defaultOptions = {
  method: "GET",
  body: null,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

export const tiger = async (options) => {
  // fetch는 기본값이 get입니다.

  // 객체 합성

  // url은 함수를 실행할때 options에 객체로 전달받음
  // 나머지 옵션들은 객체를 통째로 전달해줄거기 때문에 rest 파라미터 문법으로
  // 나머지 객체들 만들고
  const { url, ...restOptions } = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };
  // 나머지 객체들을 전달 합니다.
  const response = await fetch(url, restOptions);

  //.json()은 json.parse를 해줍니다
  if (response.ok) {
    // response 안에 data라는 이름으로 response.json()을 넣음
    response.data = await response.json();
  }

  return response;
};

tiger.get = (url, options) => {
  return tiger({
    url,
    ...options,
  });
};

tiger.post = (url, body, options) => {
  return tiger({
    method: "POST",
    url,
    body: JSON.stringify(body),
    ...options,
  });
};

tiger.delete = (url, options) => {
  return tiger({
    method: "DELETE",
    url,
    ...options,
  });
};

// DELETE 통신은 전체를 다 삭제할 수 없기때문에 뒤에 ID값을 넣으면 그 ID값이 삭제 됨

tiger.put = (url, body, options) => {
  return tiger({
    method: "PUT",
    url,
    body: JSON.stringify(body),
    ...options,
  });
};

tiger.patch = (url, body, options) => {
  return tiger({
    method: "PATCH",
    url,
    body: JSON.stringify(body),
    ...options,
  });
};
