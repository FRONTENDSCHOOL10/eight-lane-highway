const footer = document.querySelector("#footer");
const footerTemplate = document.createElement("template");
// const addressTemplate = document.createElement("template");

footerTemplate.innerHTML = `
<style>@import url(../../styles/reset.css); @import url(../../styles/style.scss);</style>
     <section>
     <h2 class="sr-only">컬리 고객센터 및 회사 소개</h2>
     <article>
     </article>
     <article>
     </article>
     </section>
`;

export class Footer extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(footerTemplate.content.cloneNode(true));
  }
  connectedCallback() {
    console.log("연결");
  }
}

customElements.define("c-footer", Footer);
const cFooter = document.createElement("c-footer");
footer.append(cFooter);
