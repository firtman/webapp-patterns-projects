import { getProductById } from "./Menu.js";


export function placeOrder() {
    alert("Your order will be ready under the number " + 
    parseInt(Math.random()*100));
    app.store.menu = [];
}

export async function addToCart(id) {
    const product = await getProductById(id);
    const results = app.store.cart.filter(prodInCart => prodInCart.product.id==id);
    if (results.length == 1) {
        app.store.cart = app.store.cart.map(p =>  p.product.id==id ? {...p, quantity: p.quantity+1} : p)
    } else {
        app.store.cart = [...app.store.cart, {product, quantity: 1}];
    }
}

export function removeFromCart(id) {
    app.store.cart = app.store.cart.filter(prodInCart => prodInCart.product.id!=id);
}

