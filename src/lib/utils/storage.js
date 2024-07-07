import { isString } from './type.js';

const { localStorage: storage } = window;

export async function setStorage(key, value) {
  // return new Promise((resolve, reject) => {
  //   if (isString(key)) {
  //     resolve(storage.setItem(key, JSON.stringify(value)));
  //   } else {
  //     reject();
  //   }
  // });

  if (isString(key)) {
    await storage.setItem(key, JSON.stringify(value));
  }
}

export async function getStorage(key) {
  // return new Promise((resolve, reject) => {
  //   if (isString(key)) {
  //     resolve(JSON.parse(storage.getItem(key)));
  //   } else {
  //     reject();
  //   }
  // });

  if (isString(key)) {
    return await JSON.parse(storage.getItem(key));
  }
}

const data = await getStorage('user');

export function deleteStorage(key) {
  return new Promise((resolve) => {
    !key ? storage.clear() : storage.removeItem(key);
    resolve();
  });
}
