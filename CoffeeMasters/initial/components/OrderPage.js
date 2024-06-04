import CartItem from './CartItem.js';

export default class OrderPage extends HTMLElement {

  #user = {
    name: "",
    phone: "",
    email: ""
  }

  constructor() {
      super();
  
      this.root = this.attachShadow({ mode: "open" });    
      const styles = document.createElement("style");
      this.root.appendChild(styles);
      const section = document.createElement("section");
      this.root.appendChild(section);

      async function loadCSS() {
        const request = await fetch("/components/OrderPage.css");
        styles.textContent = await request.text();
      }
      loadCSS();
  }   

  connectedCallback() {
    window.addEventListener("appcartchange", () => {
      this.render();
    })
    this.render();
  }

  render() {
    let section = this.root.querySelector("section");   
    if (app.store.cart.length==0) {     
      section.innerHTML = `
          <p class="empty">Your order is empty</p>
      `;
    } else {
      let html = `
          <h2>Your Order</h2>
          <ul>
          </ul>
      `;
      section.innerHTML = html;

      const template = document.getElementById("order-form-template");
      const content = template.content.cloneNode(true);
      section.appendChild(content);
      this.setFormBindings(this.root.querySelector("form"));

      let total = 0;
      for (let prodInCart of app.store.cart) {      
          const item = document.createElement("cart-item");
            item.dataset.item = JSON.stringify(prodInCart);
          this.root.querySelector("ul").appendChild(item);
        
          total += prodInCart.quantity * prodInCart.product.price;
      }
      this.root.querySelector("ul").innerHTML += `
            <li>
                <p class='total'>Total</p>
                <p class='price-total'>$${total.toFixed(2)}</p>
            </li>                
        `;            
    }
  }
  setFormBindings(form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      alert(`Thanks for your order ${this.#user.name}. ${this.#user.email ? "We will be sending you the receipt over email." : "Ask at the counter for a receipt."}`);
      this.#user.name = "";
      this.#user.email = "";
      this.#user.phone = "";

      // TODO: sent user and cart's details to the server
    });

    // Set double data binding
    Array.from(form.elements).forEach(element => {
      if (element.name) {
        element.addEventListener("change", event => {
          this.#user[element.name] = element.value;
        })
      }
    });
    this.#user = new Proxy(this.#user, {
      set(target, property, value) {
        target[property] = value;
        form.elements[property].value = value;
        return true;
      }
    })
  }
}

customElements.define("order-page", OrderPage);