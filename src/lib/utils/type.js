const typeOf = (data) =>
  Object.prototype.toString.call(data).slice(8, -1).toLowerCase();

export const isArray = (data) => typeOf(data) === 'array';
export const isNull = (data) => typeOf(data) === 'null';
export const isNumber = (data) => typeOf(data) === 'number';
export const isObject = (data) => typeOf(data) === 'object';
export const isSymbol = (data) => typeOf(data) === 'symbol';
export const isBigInt = (data) => typeOf(data) === 'bigint';
export const isFunction = (data) => typeOf(data) === 'function';
export const isMath = (data) => typeOf(data) === 'math';
export const isString = (data) => typeOf(data) === 'string';
export const isUndefined = (data) => typeOf(data) === 'undefined';
export function isNumericString(data) {
  return isNaN(Number(data));
}
