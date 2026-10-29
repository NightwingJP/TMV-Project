// ==========================================================================
// TMV - Generador Modular de Tarjetas de Producto (productCard.js)
// ==========================================================================

import { formatPrice } from "./productsData.js";
import {
    addToCart,
    getProductQuantity
} from "../pages/carrito.js";

/**
 * Crea e inyecta dinámicamente un elemento DOM de tarjeta de producto.
 * Estructura equivalente a frontend/components/productCard.html.
 *
 * Incluye:
 * - Botón "Agregar al carrito" (+1 unidad en localStorage por cada clic).
 * - Texto interactivo "Ver detalle" debajo del botón (solo visual con animación hover).
 *
 * @param {Object} product - Datos del producto
 * @param {number|string} product.id - ID único del producto
 * @param {string} product.title - Nombre comercial del producto
 * @param {string} product.description - Descripción detallada
 * @param {number} product.price - Precio en número
 * @param {string} product.image - Ruta o URL de la imagen
 * @param {string} [product.category] - Categoría opcional
 * @returns {HTMLElement} Elemento <article> listo para insertar en el DOM
 */
export function createProductCard(product) {
    const article = document.createElement("article");
    article.className = "product-card card-tmv-soft";
    article.setAttribute("data-product-id", String(product.id));

    if (product.category) {
        article.setAttribute("data-category", product.category);
    }

    // 1. Contenedor de Imagen
    const imgWrapper = document.createElement("div");
    imgWrapper.className = "product-img-wrapper";

    const img = document.createElement("img");
    img.className = "product-card-img";
    img.src = product.image || "https://placehold.co/300x240?text=TMV";
    img.alt = product.title || "Producto TMV";
    img.loading = "lazy";

    // Respaldo por si la imagen local no carga o falla la ruta
    img.onerror = function () {
        this.onerror = null;
        this.src = "https://placehold.co/300x240?text=TMV+Producto";
    };

    imgWrapper.appendChild(img);

    // 2. Título
    const title = document.createElement("h3");
    title.className = "product-card-title";
    title.textContent = product.title || "Producto sin nombre";

    // 3. Descripción
    const desc = document.createElement("p");
    desc.className = "product-card-desc";
    desc.textContent = product.description || "Sin descripción disponible.";

    // 4. Precio
    const price = document.createElement("p");
    price.className = "product-card-price";
    const priceStrong = document.createElement("strong");
    priceStrong.textContent = formatPrice(product.price);
    price.appendChild(priceStrong);

    // 5. Botón "Agregar al carrito" (incrementa +1 cada vez que se hace clic)
    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "btn-tmv btn-card-action btn-add-cart w-100";
    addBtn.setAttribute("data-action", "add-to-cart");
    addBtn.setAttribute("data-id", String(product.id));

    // Función interna para sincronizar el estado visual del botón según la cantidad en localStorage
    function syncCardCartState() {
        const currentQty = getProductQuantity(product.id);

        if (currentQty > 0) {
            addBtn.textContent = `Agregar al carrito (${currentQty})`;
            addBtn.classList.add("in-cart");
        } else {
            addBtn.textContent = "Agregar al carrito";
            addBtn.classList.remove("in-cart");
        }
    }

    // Evento para agregar (+1) al carrito en localStorage
    addBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        addToCart(product);
        syncCardCartState();
    });

    // Mantener la tarjeta sincronizada si el carrito se actualiza desde otro lugar
    document.addEventListener("cart:updated", () => {
        if (article.isConnected) {
            syncCardCartState();
        }
    });

    // Inicializar estado según lo que ya exista en localStorage
    syncCardCartState();

    // 6. Texto "Ver detalle" debajo del botón (solo visual con animación hover, sin lógica por ahora)
    const detailText = document.createElement("span");
    detailText.className = "product-card-detail-link";
    detailText.setAttribute("role", "button");
    detailText.setAttribute("tabindex", "0");
    detailText.textContent = "Ver detalle";

    // Ensamblar la tarjeta
    article.append(imgWrapper, title, desc, price, addBtn, detailText);

    return article;
}
