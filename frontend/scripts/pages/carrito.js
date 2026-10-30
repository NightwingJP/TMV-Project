// ==========================================================================
// TMV - Lógica y Estado del Carrito de Compras en LocalStorage (carrito.js)
// ==========================================================================
// NOTA PARA EL EQUIPO (Juan / Angela - Página de Carrito):
// Este módulo gestiona los productos guardados en localStorage bajo la clave "tmvCarrito".
// Cada elemento guardado en el arreglo de localStorage tiene la siguiente estructura:
// {
//     id: number | string,      // Identificador único del producto
//     title: string,            // Nombre del producto
//     description: string,      // Descripción del producto
//     price: number,            // Precio unitario en COP (número)
//     image: string,            // Ruta o URL de la imagen del producto
//     category: string,         // Categoría del producto
//     quantity: number          // Cantidad acumulada de este producto en el carrito
// }
//
// Pueden importar y usar directamente las funciones exportadas aquí (getCart, saveCart,
// addToCart, getProductQuantity, getTotalCartCount) para renderizar
// la lista de productos y calcular subtotales/totales en la página carrito.html.
// ==========================================================================

export const CART_STORAGE_KEY = "tmvCarrito";

/**
 * Obtiene el arreglo actual de productos en el carrito desde localStorage.
 * (Para uso en el catálogo, en el badge del navbar y en la futura página de carrito).
 * @returns {Array<Object>} Lista de productos en el carrito
 */
export function getCart() {
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (!stored) return [];
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.warn("[TMV Carrito] Error al leer el carrito desde localStorage:", error);
        return [];
    }
}

/**
 * Guarda el estado del carrito en localStorage y emite el evento global 'cart:updated'
 * para que el navbar y las tarjetas de producto se actualicen en tiempo real.
 * (También útil para re-renderizar la página de carrito cuando cambien las cantidades).
 * @param {Array<Object>} cartItems - Arreglo actualizado del carrito
 */
export function saveCart(cartItems) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        notifyCartUpdated();
    } catch (error) {
        console.error("[TMV Carrito] No se pudo guardar el carrito en localStorage:", error);
    }
}

/**
 * Agrega un producto al carrito en localStorage.
 * Si el producto ya existe en el carrito, incrementa su cantidad (quantity) en +1.
 * Si no existe, lo agrega con quantity = 1 y guarda sus datos completos para que
 * la página del carrito pueda mostrar imagen, título, precio y subtotal directamente.
 *
 * @param {Object} product - Objeto del producto proveniente del catálogo
 * @returns {Array<Object>} Estado actualizado del carrito
 */
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

/**
 * Obtiene la cantidad acumulada de un producto específico dentro del carrito.
 * @param {number|string} productId - ID del producto
 * @returns {number} Cantidad actual en el carrito (0 si no está)
 */
export function getProductQuantity(productId) {
    const cart = getCart();
    const found = cart.find((item) => String(item.id) === String(productId));
    return found ? Number(found.quantity) || 0 : 0;
}

/**
 * Calcula el número total de unidades en el carrito sumando la propiedad 'quantity'
 * de cada producto. Usado por el badge del navbar (#tmvCartBadge) en todas las páginas.
 * @returns {number} Total de unidades en el carrito
 */
export function getTotalCartCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
}

/**
 * Dispara el evento personalizado 'cart:updated' con los detalles del carrito
 * (items y totalCount) para sincronizar componentes en toda la aplicación.
 */
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

// Sincronizar automáticamente si localStorage cambia desde otra pestaña del navegador
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
