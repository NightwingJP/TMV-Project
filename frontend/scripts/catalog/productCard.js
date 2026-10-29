import { formatPrice } from "./productsData.js";
import {
    addToCart,
    getProductQuantity
} from "../pages/carrito.js";

// Crea la tarjeta de producto para el catálogo
export function createProductCard(product) {
    const article = document.createElement("article");
    article.className = "product-card card-tmv-soft";
    article.setAttribute("data-product-id", String(product.id));

    if (product.category) {
        article.setAttribute("data-category", product.category);
    }

    // Imagen del producto
    const imgWrapper = document.createElement("div");
    imgWrapper.className = "product-img-wrapper";

    const img = document.createElement("img");
    img.className = "product-card-img";
    img.src = product.image || "https://placehold.co/300x240?text=TMV";
    img.alt = product.title || "Producto TMV";
    img.loading = "lazy";

    img.onerror = function () {
        this.onerror = null;
        this.src = "https://placehold.co/300x240?text=TMV+Producto";
    };

    imgWrapper.appendChild(img);

    // Información del producto
    const title = document.createElement("h3");
    title.className = "product-card-title";
    title.textContent = product.title || "Producto sin nombre";

    const desc = document.createElement("p");
    desc.className = "product-card-desc";
    desc.textContent = product.description || "Sin descripción disponible.";

    const price = document.createElement("p");
    price.className = "product-card-price";
    const priceStrong = document.createElement("strong");
    priceStrong.textContent = formatPrice(product.price);
    price.appendChild(priceStrong);

    // Fila con botón de agregar al carrito y botón de favoritos
    const actionsRow = document.createElement("div");
    actionsRow.className = "product-card-actions";

    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "btn-tmv btn-card-action btn-add-cart";
    addBtn.setAttribute("data-action", "add-to-cart");
    addBtn.setAttribute("data-id", String(product.id));

    // Muestra en el botón cuántas unidades de este producto hay en el carrito
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

    addBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        addToCart(product);
        syncCardCartState();
    });

    document.addEventListener("cart:updated", () => {
        if (article.isConnected) {
            syncCardCartState();
        }
    });

    syncCardCartState();

    // Icono de corazón para favoritos (solo cambio visual)
    const favBtn = document.createElement("button");
    favBtn.type = "button";
    favBtn.className = "btn-favorite-heart";
    favBtn.setAttribute("data-action", "favorite");
    favBtn.setAttribute("data-id", String(product.id));
    favBtn.setAttribute("aria-label", `Marcar ${product.title} como favorito`);
    favBtn.setAttribute("aria-pressed", "false");
    favBtn.innerHTML = `
        <svg class="heart-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
    `;

    favBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        const isFavorite = favBtn.classList.toggle("is-favorite");
        favBtn.setAttribute("aria-pressed", isFavorite ? "true" : "false");
    });

    actionsRow.append(addBtn, favBtn);

    // Texto "Ver detalle" debajo de los botones
    const detailText = document.createElement("span");
    detailText.className = "product-card-detail-link";
    detailText.setAttribute("role", "button");
    detailText.setAttribute("tabindex", "0");
    detailText.textContent = "Ver detalle";

    article.append(imgWrapper, title, desc, price, actionsRow, detailText);

    return article;
}
