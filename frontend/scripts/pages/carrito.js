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
//-------------------------------------------------------------
//-------------------------------------------------------------
//-------------------------------------------------------------
//ANGELA
