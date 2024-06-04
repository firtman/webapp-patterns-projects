import API from '../services/API.js';
import ProductItem  from './ProductItem.js';

export default class MenuPage extends HTMLElement {
    constructor() {
        super();
    
        this.root = this.attachShadow({ mode: "open" });
    
        const template = document.getElementById("menu-page-template");
        const content = template.content.cloneNode(true);
        const styles = document.createElement("style");
        this.root.appendChild(content);    
        this.root.appendChild(styles);

        async function loadCSS() {
          const request = await fetch("/components/MenuPage.css");
          styles.textContent = await request.text();
        }
        loadCSS();
    }   

    connectedCallback() {
      this.render();
      window.addEventListener("appmenuchange", () => {
        this.render();
      });
    }

    render() {
      if (app.store.menu) {
        this.root.querySelector("#menu").innerHTML = "";
        for (let category of app.store.menu) {
          const liCategory = document.createElement("li");
          liCategory.innerHTML = `
                <h3>${category.name}</h3>
                <ul class='category'>
                </ul>`;
          this.root.querySelector("#menu").appendChild(liCategory);

          category.products.map(product => {
              const item = document.createElement("product-item");
              item.dataset.product = JSON.stringify(product);
              liCategory.querySelector("ul").appendChild(item);
          });
        }  
      } else {
        this.root.querySelector("#menu").innerHTML = `Loading...`;
      }
    }

}

customElements.define("menu-page", MenuPage);