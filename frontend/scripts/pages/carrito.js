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

import { formatPrice } from "../catalog/productsData.js";
import { createCartItem } from "../components/cartItem.js";

function initCartPage() {
    const cartProducts = document.getElementById("cart-items-container");
    const cartItemsCount = document.getElementById("summary-count");
    const cartSubtotal = document.getElementById("summary-subtotal");
    const cartTotal = document.getElementById("summary-total");
    const checkoutButton = document.getElementById("summary-checkout-btn") || document.getElementById("checkout-button");

    if (!cartProducts) return;

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
            if (checkoutButton) checkoutButton.disabled = true;
        } else {
            if (checkoutButton) checkoutButton.disabled = false;
        }

        const fragment = document.createDocumentFragment();

        cart.forEach((product) => {
            const quantity = Number(product.quantity) || 1;
            const price = Number(product.price) || 0;
            const subtotal = price * quantity;

            totalUnits += quantity;
            totalPrice += subtotal;

            const itemElement = createCartItem(product, {
                onQuantityChange: (productId, newQuantity) => {
                    changeQuantity(productId, newQuantity);
                },
                onRemove: (productId) => {
                    const updatedCart = getCart().filter(
                        (item) => String(item.id) !== String(productId)
                    );
                    saveCart(updatedCart);
                    renderCart();
                }
            });

            fragment.appendChild(itemElement);
        });

        cartProducts.appendChild(fragment);

        // Actualizar resumen
        if (cartItemsCount) {
            cartItemsCount.textContent = `${cart.length} ${cart.length === 1 ? "artículo" : "artículos"}`;
        }
        if (cartSubtotal) {
            cartSubtotal.textContent = formatPrice(totalPrice);
        }
        if (cartTotal) {
            cartTotal.textContent = formatPrice(totalPrice);
        }
    }

    // Guardar la cantidad modificada
    function changeQuantity(productId, newQuantity) {
        const cart = getCart();

        const product = cart.find((item) => String(item.id) === String(productId));

        if (product) {
            product.quantity = newQuantity;
            saveCart(cart);
            renderCart();
        }
    }

    // Render inicial
    renderCart();

    // Actualizar cuando cambie el carrito
    document.addEventListener("cart:updated", renderCart);

    // Botón para continuar con la compra
    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            const cart = getCart();

            if (cart.length === 0) {
                alert("Tu carrito está vacío.");
                return;
            }

            alert("Tu pedido está listo para continuar con la compra.");
        });
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCartPage);
} else {
    initCartPage();
}
