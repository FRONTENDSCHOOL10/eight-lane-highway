import { getNode } from '../dom/getNode.js';
import { insertLast } from '../dom/insert.js';
import { isNumber, isObject } from './type.js';
import { xhrPromise } from './xhr.js';

function delay(callback, timeout = 1000) {
  setTimeout(callback, timeout);
}

const first = getNode('.first');
const second = getNode('.second');

// delay(() => {
//   first.style.top = '-100px';
//   second.style.top = '100px';
//   delay(() => {
//     first.style.rotate = '360deg';
//     second.style.rotate = '-360deg';
//     delay(() => {
//       first.style.left = '-100px';
//       second.style.left = '100px';
//       delay(() => {
//         first.style.left = '0px';
//         second.style.left = '0px';
//         delay(() => {
//           first.style.rotate = '-360deg';
//           second.style.rotate = '360deg';
//           delay(() => {
//             first.style.top = '0px';
//             second.style.top = '0px';
//           }, 1000);
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

const shouldRejected = false;

// 순서는 무조건 첫번째가 성공

const p = new Promise((성공, 실패) => {
  if (!shouldRejected) {
    성공('성공');
  } else {
    실패('실패');
  }
});

// console.log(p);

// 객체 합성
const defaultOptions = {
  shouldRejected: false,
  data: '성공!',
  errorMessage: '알 수 없는 오류!',
  timeout: 1000,
};

export function delayP(options) {
  let config = { ...defaultOptions };

  if (isNumber(options)) {
    config.timeout = options;
  }

  if (isObject(options)) {
    config = { ...defaultOptions, ...options }; // 오브젝트 합성
  }

  const { shouldRejected, data, errorMessage, timeout } = config;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!shouldRejected) {
        resolve(data);
      } else {
        reject({ message: errorMessage });
      }
    }, timeout);
  });
}

// delayP(3000).then(console.log);

// <Promise>
// delayP(500) // then은 두개의 함수를 받는데 첫번째는 성공함수, 두번째는 실패함수
//   .then((res) => {
//     console.log(res);
//     first.style.top = '-100px';
//     second.style.top = '100px';

//     return delayP();
//   })
//   .then((res) => {
//     console.log(res);
//     first.style.transform = 'rotate(360deg)';
//     second.style.transform = 'rotate(-360deg)';

//     return delayP();
//   })
//   .then((res) => {
//     console.log(res);
//     first.style.top = '0px';
//     second.style.top = '0px';
//   });

// async 함수는 무조건 Promise object를 반환한다.
// await 2가지 기능 수행
//       1. result 꺼내오기
//       2. 코드 실행 흐름 제어
async function delayA() {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('성공');
    }, 2000);
  });
  // await을 사용해서 p의 data를 가져옴
  // await을 사용해서 코드가 실행되기 전까지 밑에 실행을 멈춤
  const result = await p;
  console.log(result);
}

// delayA();

// top-level-await
// await 뒤에 promise 객체여야지만 await으로 data를 꺼낼수 있음

async function 라면끓이기() {
  const a = await delayP({ data: '물' });
  console.log(a);

  const b = await delayP({ data: '스프' });
  console.log(b);

  const c = await delayP({ data: '면' });
  console.log(c);

  const d = await delayP({ data: '그릇' });
  console.log(d);
}
// 라면끓이기();

async function getData() {
  const data = await xhrPromise.get('https://pokeapi.co/api/v2/pokemon/149');

  insertLast(
    document.body,
    `<img src="${data.sprites.other.showdown['front_default']}" alt="" />`
  );
}

// getData();
