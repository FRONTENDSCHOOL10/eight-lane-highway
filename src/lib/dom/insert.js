import { getNode } from "./getNode.js";
import { isString } from "../utils/type.js";

export function insertBefore(node,text){
  if(isString(node)) node = getNode(node);
  node.insertAdjacentHTML('beforebegin',text)
}

export function insertFirst(node,text){
  if(isString(node)) node = getNode(node);
  node.insertAdjacentHTML('afterbegin',text)
}

export function insertLast(node,text){
  if(isString(node)) node = getNode(node);
  node.insertAdjacentHTML('beforeend',text)
}

export function insertAfter(node,text){
  if(isString(node)) node = getNode(node);
  node.insertAdjacentHTML('afterend',text)
}
