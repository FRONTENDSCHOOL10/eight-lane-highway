import{i,a,b as f}from"./type-ux6Gv8tB.js";function o(r,...t){typeof r=="string"&&(r=document.querySelector(r)),t.forEach(s=>{if(i(s)&&(s=Object.values(s)),s.includes(",")&&(s=s.replace(/\s*/g,"").split(",")),a(s))s.forEach(e=>r.classList.add(e));else if(f(s))r.classList.add(s);else throw new TypeError("addClass 함수의 인수는 문자 타입 이어야 합니다.")})}function g(r,t){if(typeof r=="string"&&(r=document.querySelector(r)),!t){r.className="";return}if(typeof t!="string")throw new TypeError("removeClass 함수의 두 번째 인수는 문자 타입 이어야 합니다.");r.classList.remove(t)}function u(r,t){if(typeof r=="string"&&(r=document.querySelector(r)),typeof t!="string")throw new TypeError("toggleClass 함수의 두 번째 인수는 문자 타입 이어야 합니다.");return r.classList.toggle(t)}export{o as a,g as r,u as t};