import { addClass, removeClass } from './css.js';
import { isString } from '../utils/type.js';
import { getNode } from './getNode.js';

/**
 *
 * @param {HTMLElement | string} node
 * @param {String} message
 * @param {Number} timeout
 * @returns {void} // 어떠한 값도 내보내지 않겠다
 */
export function showAlert(node, message, timeout = 1000) {
  if (isString(node)) node = getNode(node);
  node.textContent = message;

  addClass(node, 'is-active');
  setTimeout(() => {
    removeClass(node, 'is-active');
  }, timeout);
}
