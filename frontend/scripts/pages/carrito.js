// Clave en localStorage donde se guarda el arreglo de productos del carrito.
// Estructura de cada item para usar en la página del carrito:
// { id, title, description, price, image, category, quantity }
export const CART_STORAGE_KEY = "tmvCarrito";

// Obtiene los productos actuales del carrito desde localStorage
export function getCart() {
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (!stored) return [];
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.warn("Error al leer el carrito:", error);
        return [];
    }
}

// Guarda el carrito en localStorage y avisa a los demás componentes
export function saveCart(cartItems) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        notifyCartUpdated();
    } catch (error) {
        console.error("No se pudo guardar el carrito:", error);
    }
}

// Agrega un producto al carrito o incrementa su cantidad (+1) si ya existe
export function addToCart(product) {
    if (!product || product.id === undefined || product.id === null) return getCart();

    const cart = getCart();
    const productIdStr = String(product.id);
    const existingIndex = cart.findIndex((item) => String(item.id) === productIdStr);

    if (existingIndex !== -1) {
        cart[existingIndex].quantity = (Number(cart[existingIndex].quantity) || 1) + 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title || "Producto TMV",
            description: product.description || "",
            price: Number(product.price) || 0,
            image: product.image || "https://placehold.co/300x240?text=TMV",
            category: product.category || "General",
            quantity: 1
        });
    }

    saveCart(cart);
    return cart;
}

// Devuelve cuántas unidades de un producto específico hay en el carrito
export function getProductQuantity(productId) {
    const cart = getCart();
    const found = cart.find((item) => String(item.id) === String(productId));
    return found ? Number(found.quantity) || 0 : 0;
}

// Suma el total de unidades en el carrito para el contador del navbar
export function getTotalCartCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
}

// Emite el evento 'cart:updated' para actualizar el navbar y las tarjetas
export function notifyCartUpdated() {
    const cart = getCart();
    const totalCount = getTotalCartCount();
    const event = new CustomEvent("cart:updated", {
        bubbles: true,
        detail: {
            cart,
            totalCount
        }
    });
    document.dispatchEvent(event);
    window.dispatchEvent(event);
}

if (typeof window !== "undefined") {
    window.addEventListener("storage", (event) => {
        if (event.key === CART_STORAGE_KEY) {
            notifyCartUpdated();
        }
    });
}

//JUAN

import { formatPrice } from "../catalog/productsData.js";

const cartProducts = document.getElementById("cart-products");
const cartItemsCount = document.getElementById("cart-items-count");
const cartTotalUnits = document.getElementById("cart-total-units");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartTotal = document.getElementById("cart-total");

if (cartProducts && cartItemsCount && cartTotalUnits &&
    cartSubtotal && cartTotal) {

// Mostrar los productos del carrito
function renderCart() {
    const cart = getCart();

    cartProducts.innerHTML = "";

    let totalUnits = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
        cartProducts.innerHTML = `
            <p class="cart-empty">
                Tu carrito está vacío.
            </p>
        `;
    }

    cart.forEach((product) => {
        const quantity = Number(product.quantity) || 1;
        const price = Number(product.price) || 0;
        const subtotal = price * quantity;

        totalUnits += quantity;
        totalPrice += subtotal;

        const productElement = document.createElement("article");
        productElement.classList.add("cart-product");

        productElement.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.title}"
                class="cart-product-image"
            >

            <div class="cart-product-info">
                <h3 class="cart-product-title">${product.title}</h3>

                <p class="cart-product-description">
                    ${product.description}
                </p>

                <p class="cart-product-price">
                    Precio unitario: ${formatPrice(price)}
                </p>

                <div class="cart-quantity-controls">
                    <button
                        type="button"
                        class="quantity-decrease"
                        aria-label="Disminuir cantidad"
                    >−</button>

                    <input
                        type="number"
                        class="quantity-input"
                        min="1"
                        step="1"
                        value="${quantity}"
                        aria-label="Cantidad de ${product.title}"
                    >

                    <button
                        type="button"
                        class="quantity-increase"
                        aria-label="Aumentar cantidad"
                    >+</button>

                    <button
                        type="button"
                        class="cart-remove-button"
                    >Eliminar</button>
                </div>

                <p class="cart-product-subtotal">
                    Subtotal: <strong>${formatPrice(subtotal)}</strong>
                </p>
            </div>
        `;

        // Aumentar cantidad
        productElement
            .querySelector(".quantity-increase")
            .addEventListener("click", () => {
                changeQuantity(product.id, quantity + 1);
            });

        // Disminuir cantidad
        productElement
            .querySelector(".quantity-decrease")
            .addEventListener("click", () => {
                if (quantity > 1) {
                    changeQuantity(product.id, quantity - 1);
                }
            });

        // Cambiar cantidad escribiendo en el campo numérico
        productElement
            .querySelector(".quantity-input")
            .addEventListener("change", (event) => {
                const newQuantity = Number(event.target.value);

                if (Number.isInteger(newQuantity) && newQuantity >= 1) {
                    changeQuantity(product.id, newQuantity);
                } else {
                    renderCart();
                }
            });

        // Eliminar producto
        productElement
            .querySelector(".cart-remove-button")
            .addEventListener("click", () => {
                const updatedCart = getCart().filter(
                    (item) => String(item.id) !== String(product.id)
                );

                saveCart(updatedCart);
                renderCart();
            });

        cartProducts.appendChild(productElement);
    });

    // Actualizar resumen
    cartItemsCount.textContent =
        `${cart.length} ${cart.length === 1 ? "artículo" : "artículos"}`;

    cartTotalUnits.textContent =
        `${totalUnits} ${totalUnits === 1 ? "unidad" : "unidades"}`;

    cartSubtotal.textContent = formatPrice(totalPrice);
    cartTotal.textContent = formatPrice(totalPrice);
}

// Guardar la cantidad modificada
function changeQuantity(productId, newQuantity) {
    const cart = getCart();

    const product = cart.find(
        (item) => String(item.id) === String(productId)
    );

    if (product) {
        product.quantity = newQuantity;
        saveCart(cart);
        renderCart();
    }
}

// Actualizar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", renderCart);

// Actualizar cuando cambie el carrito
document.addEventListener("cart:updated", renderCart);

// Botón para continuar con la compra
document.getElementById("checkout-button").addEventListener("click", () => {
    const cart = getCart();

    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    alert("Tu pedido está listo para continuar con la compra.");
});
}

//-------------------------------------------------------------
//-------------------------------------------------------------
//-------------------------------------------------------------
//ANGELA
