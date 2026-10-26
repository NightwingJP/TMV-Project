// ==========================================================================
// TMV - Generador Modular de Tarjetas de Producto (productCard.js)
// ==========================================================================

import { formatPrice } from "./productsData.js";

/**
 * Crea e inyecta dinámicamente un elemento DOM de tarjeta de producto.
 * Estructura equivalente a frontend/components/productCard.html.
 *
 * @param {Object} product - Datos del producto
 * @param {number|string} product.id - ID único del producto
 * @param {string} product.title - Nombre comercial del producto
 * @param {string} product.description - Descripción detallada
 * @param {number} product.price - Precio en número
 * @param {string} product.image - Ruta o URL de la imagen
 * @param {string} [product.category] - Categoría opcional
 * @param {Object} [options] - Opciones de configuración del botón o callbacks
 * @param {Function} [options.onDetailsClick] - Callback al hacer clic en "Ver detalle"
 * @returns {HTMLElement} Elemento <article> listo para insertar en el DOM
 */
export function createProductCard(product, options = {}) {
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

    // 5. Botón de Acción ("Ver detalle")
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn-tmv btn-card-action w-100";
    button.setAttribute("data-action", "details");
    button.setAttribute("data-id", String(product.id));
    button.textContent = "Ver detalle";

    button.addEventListener("click", (event) => {
        event.stopPropagation();
        if (typeof options.onDetailsClick === "function") {
            options.onDetailsClick(product);
        } else {
            // Evento personalizado emitido para que cualquier módulo pueda escucharlo
            const detailEvent = new CustomEvent("product:view-detail", {
                bubbles: true,
                detail: { product }
            });
            article.dispatchEvent(detailEvent);
        }
    });

    // Ensamblar la tarjeta
    article.append(imgWrapper, title, desc, price, button);

    return article;
}
