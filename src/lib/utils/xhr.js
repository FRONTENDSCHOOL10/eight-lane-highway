// XMLHttpRequest

const ENDPOINT = 'https://jsonplaceholder.typicode.com/users';

//  [readyState]
// 0 : uninitialized
// 1 : loading
// 2 : loaded
// 3 : interactive
// 4 : complete

const user = {
  name: 'tiger',
  age: 40,
  gender: 'male',
};

/* -------------------------------------------------------------------------- */
/*                                   get 통신                                 */
/* -------------------------------------------------------------------------- */

// xhr.open('GET', ENDPOINT);

// 비동기적 통신을 하기 위해서
// readystate가 바뀔때마다 알아서 호출해주는
// xhr.addEventListener('readystatechange', () => {
//   const { readyState, status, response } = xhr;
//   // 0~1은 너무 초기 단계라서 인식하지못함
//   if (readyState === 4) {
//     // 성공
//     if (status >= 200 && status < 400) {
//       // console.log(response);
//     } else {
//       // 실패
//     }
//   }
// });

// xhr.send();

/* -------------------------------------------------------------------------- */
/*                                   post 통신                                 */
/* -------------------------------------------------------------------------- */

// xhr.open('POST', ENDPOINT);

// // content-type을 text로 인식하기 때문에
// // json으로 변경해주기위해 setRequestHeader로 변경
// xhr.setRequestHeader('Content-Type', 'application/json');

// // 비동기적 통신을 하기 위해서
// // readystate가 바뀔때마다 알아서 호출해주는
// xhr.addEventListener('readystatechange', () => {
//   const { readyState, status, response } = xhr;
//   if (readyState === 4) {
//     // 성공
//     if (status >= 200 && status < 400) {
//       console.log(response);
//     } else {
//       // 실패
//       console.log('실패');
//     }
//   }
// });

// xhr.send(JSON.stringify(user));

/* -------------------------------------------------------------------------- */
/*                                // xhr 콜백 방식                                */
/* -------------------------------------------------------------------------- */

function xhr({
  method = 'GET',
  url = '',
  body = null,
  onSuccess = null,
  onFail = null,
  headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
}) {
  const xhr = new XMLHttpRequest();

  xhr.open(method, url);

  Object.entries(headers).forEach(([key, value]) => {
    xhr.setRequestHeader(key, value);
  });

  xhr.addEventListener('readystatechange', () => {
    const { readyState, status, response } = xhr;

    if (readyState === 4) {
      if (status >= 200 && status < 400) {
        onSuccess(JSON.parse(response));
      } else {
        onFail('실패');
      }
    }
  });

  xhr.send(JSON.stringify(body));

  // return new Promise((resolve, reject) => {
  //   xhr.addEventListener('readystatechange', () => {
  //     const { readyState, status, response } = xhr;
  //     if (readyState === 4) {
  //       if (status >= 200 && status < 400) {
  //         resolve(JSON.parse(response));
  //       } else {
  //         reject('실패');
  //       }
  //     }
  //   });
  // });
}

// xhr(
//   'GET',
//   ENDPOINT,
//   user,
//   (data) => console.log(data),
//   (err) => console.log(err)
// );

// 함수 호출
xhr({
  method: 'POST',
  url: ENDPOINT,
  body: user,
  onSuccess(data) {
    // console.log(data);
  },
  onFail(err) {
    console.log(err);
  },
});

xhr.get = (url, onSuccess, onFail) => {
  xhr({ url, onSuccess, onFail });
};

xhr.post = (url, body, onSuccess, onFail) => {
  xhr({
    method: 'post',
    body,
    url,
    onSuccess,
    onFail,
  });
};

xhr.put = (url, body, onSuccess, onFail) => {
  xhr({
    method: 'PUT',
    body,
    url,
    onSuccess,
    onFail,
  });
};

xhr.delete = (url, onSuccess, onFail) => {
  xhr({
    method: 'DELETE',
    url,
    onSuccess,
    onFail,
  });
};

// xhr.get(
//   ENDPOINT
//   (data) => console.log(data)
//   (err) => console.log(err)
// );

// 함수 안에 메서드를 정의할 수 없음
// 생성자 함수로만 함수 안에 메서드를 정의 할 수 있음(this바인딩 하기 때문에)

/* -------------------------------------------- */
/*               xhr Promise 방식               */
/* -------------------------------------------- */

const defaultOptions = {
  method: 'GET',
  url: '',
  body: null,
  errorMessage: '서버와의 통신이 원활하지 않습니다.',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

// enumerable => 열거 가능한 => for..of/ for..in
// iterable   => 순환 가능한 => for..of
// immutable  => 불변의

// const arr = [1,2,3];
// const newArr = [...arr,4]

export function xhrPromise(options) {
  const { method, url, body, headers, errorMessage } = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const xhr = new XMLHttpRequest();

  xhr.open(method, url);

  Object.entries(headers).forEach(([key, value]) => {
    xhr.setRequestHeader(key, value);
  });

  xhr.send(JSON.stringify(body));

  return new Promise((resolve, reject) => {
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 400) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject({ message: errorMessage });
        }
      }
    });
  });
}

xhrPromise.get = (url) => {
  return xhrPromise({ url });
};

xhrPromise.post = (url, body) => {
  return xhrPromise({
    url,
    body,
    method: 'POST',
  });
};

xhrPromise.put = (url, body) => {
  return xhrPromise({
    url,
    body,
    method: 'PUT',
  });
};

xhrPromise.delete = (url) => {
  return xhrPromise({
    url,
    method: 'DELETE',
  });
};

/*
xhrPromise.get = (url) => xhrPromise({ url })
xhrPromise.post = (url,body) => xhrPromise({ url, body, method:'POST' })
xhrPromise.put = (url,body) => xhrPromise({ url, body, method:'PUT' })
xhrPromise.delete = url => xhrPromise({ url, method:'DELETE' })
 */
