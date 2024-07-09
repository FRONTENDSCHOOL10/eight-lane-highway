import { isString } from "./type.js";

const { localStorage: storage } = window;

export async function setStorage(key, value) {
  if (isString(key)) {
    await storage.setItem(key, JSON.stringify(value));
  }
}

export async function getStorage(key) {
  if (isString(key)) {
    return await JSON.parse(storage.getItem(key));
  }
}

export function deleteStorage(key) {
  return new Promise((resolve) => {
    !key ? storage.clear() : storage.removeItem(key);
    resolve();
  });
}
