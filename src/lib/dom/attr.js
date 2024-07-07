
import { getNode } from "./getNode.js";
import { isString } from "../utils/type.js";

function getAttr(node,prop){

  if(isString(node)) node = getNode(node);
  // if(typeof node === 'string') node = document.querySelector(node);

  if(!isString(prop)) throw new TypeError('getAttr 함수의 두 번째 인수는 문자 타입 이어야 합니다.')

  return node.getAttribute(prop);

}

function typeError(message){
  return new TypeError(message + '문자 타입 이어야 합니다.');
}

function setAttr (node,prop,value){
  
  if(isString(node)) node = getNode(node);

  if(!isString(prop)){
    typeError('setAttr 함수의 두 번째 인수는')
  }

  if(value === ''){
    node.removeAttribute(prop);
    return;
  }

  if(prop.startsWith('data')){
    prop = prop.slice(5)
    node.dataset[prop] = value;
    return;
  }


  if(!value) throw new ReferenceError('setAttr 함수의 세 번째 인수는 필수 입력값 입니다.');

  node.setAttribute(prop,value);
}


// function attr(node,prop,value){
//   if(!value){
//     return getAttr(node,prop)
//   }else{
//     setAttr(node,prop,value)
//   }
// }

 export const attr = (node,prop,value) => !value ? getAttr(node,prop) : setAttr(node,prop,value)

 
