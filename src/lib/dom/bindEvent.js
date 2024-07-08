import { getNode } from "./getNode.js";
import { isString } from "../utils/type.js";



export function bindEvent(node,type,handler){
  
  if(isString(node)) node = getNode(node);

  node.addEventListener(type,handler);

  return () => node.removeEventListener(type,handler);

}



