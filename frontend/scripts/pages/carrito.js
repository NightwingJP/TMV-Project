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
//-------------------------------------------------------------
//-------------------------------------------------------------
//-------------------------------------------------------------
//ANGELA
