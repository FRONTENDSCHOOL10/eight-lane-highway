import"./modulepreload-polyfill-9p4a8sJU.js";/* empty css              */import{C as s}from"./pocketbase.es-knC2my0u.js";import{b as c}from"./type-ux6Gv8tB.js";function o(t,e=document){return e.nodeType!==9&&(e=document.querySelector(e)),e.querySelector(t)}function d(t,e){c(t)&&(t=o(t)),t.insertAdjacentHTML("beforeend",e)}const{localStorage:a}=window;async function u(t,e){c(t)&&await a.setItem(t,JSON.stringify(e))}async function i(t){if(c(t))return await JSON.parse(a.getItem(t))}function p(t,e="photo"){return`https://eight-lane-highway.pockethost.io/api/files/${t.collectionId}/${t.id}/${t[e]}`}const l=new s("https://eight-lane-highway.pockethost.io");o(".upper-arrow");o(".below-arrow");o("#product1");const w=o(".swiper-wrapper"),f=o(".product-menu-item"),g=new Swiper(".swiper-container",{direction:"vertical",navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},slidesPerView:"auto",spaceBetween:6});function m(t){const n=t.target.closest("li");if(!n)return;const r=n.dataset.id;v(r)}f.addEventListener("click",m);async function h(){if(await i("recentProducts")){const t=await i("recentProducts");for(let e of t){const n=await l.collection("products").getOne(e),r=`<div class="swiper-slide">
    <img src="${p(n)}" alt="" />
  </div>`;d(w,r)}g.update()}}document.addEventListener("DOMContentLoaded",h);async function v(t){const e=await i("recentProducts")||[];e.unshift(t);const n=e.slice(0,10);await u("recentProducts",n)}