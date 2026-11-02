import { formatPrice } from "../catalog/productsData.js";

// Crea la tarjeta interactiva de un producto para la lista del carrito
export function createCartItem(product, { onQuantityChange, onRemove } = {}) {
    const quantity = Number(product.quantity) || 1;
    const price = Number(product.price) || 0;
    const subtotal = price * quantity;

    const article = document.createElement("article");
    article.className = "cart-product";
    article.setAttribute("data-product-id", String(product.id));

    // Imagen del producto
    const img = document.createElement("img");
    img.className = "cart-product-image";
    img.src = product.image || "https://placehold.co/150x150?text=TMV";
    img.alt = product.title || "Producto TMV";
    img.loading = "lazy";
    img.onerror = function () {
        this.onerror = null;
        this.src = "https://placehold.co/150x150?text=TMV";
    };

    // Bloque de información
    const info = document.createElement("div");
    info.className = "cart-product-info";

    const title = document.createElement("h3");
    title.className = "cart-product-title";
    title.textContent = product.title || "Producto sin nombre";

    const desc = document.createElement("p");
    desc.className = "cart-product-description";
    desc.textContent = product.description || "";

    const unitPrice = document.createElement("p");
    unitPrice.className = "cart-product-price";
    unitPrice.textContent = `Precio unitario: ${formatPrice(price)}`;

    // Controles de cantidad
    const controls = document.createElement("div");
    controls.className = "cart-quantity-controls";

    const selectorGroup = document.createElement("div");
    selectorGroup.className = "cart-quantity-selector";

    const btnDecrease = document.createElement("button");
    btnDecrease.type = "button";
    btnDecrease.className = "quantity-decrease";
    btnDecrease.setAttribute("aria-label", "Disminuir cantidad");
    btnDecrease.textContent = "−";

    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.className = "quantity-input";
    qtyInput.min = "1";
    qtyInput.step = "1";
    qtyInput.value = String(quantity);
    qtyInput.setAttribute("aria-label", `Cantidad de ${product.title}`);

    const btnIncrease = document.createElement("button");
    btnIncrease.type = "button";
    btnIncrease.className = "quantity-increase";
    btnIncrease.setAttribute("aria-label", "Aumentar cantidad");
    btnIncrease.textContent = "+";

    selectorGroup.append(btnDecrease, qtyInput, btnIncrease);

    // Botón para eliminar del carrito
    const btnRemove = document.createElement("button");
    btnRemove.type = "button";
    btnRemove.className = "cart-remove-button";
    btnRemove.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
        <span>Eliminar</span>
    `;

    controls.append(selectorGroup, btnRemove);

    const subtotalText = document.createElement("p");
    subtotalText.className = "cart-product-subtotal";
    subtotalText.innerHTML = `Subtotal: <strong>${formatPrice(subtotal)}</strong>`;

    info.append(title, desc, unitPrice, controls, subtotalText);
    article.append(img, info);

    // Eventos de interacción
    btnIncrease.addEventListener("click", () => {
        if (typeof onQuantityChange === "function") {
            onQuantityChange(product.id, quantity + 1);
        }
    });

    btnDecrease.addEventListener("click", () => {
        if (quantity > 1 && typeof onQuantityChange === "function") {
            onQuantityChange(product.id, quantity - 1);
        }
    });

    qtyInput.addEventListener("change", (e) => {
        const val = Number(e.target.value);
        if (Number.isInteger(val) && val >= 1) {
            if (typeof onQuantityChange === "function") {
                onQuantityChange(product.id, val);
            }
        } else {
            qtyInput.value = String(quantity);
        }
    });

    btnRemove.addEventListener("click", () => {
        if (typeof onRemove === "function") {
            onRemove(product.id);
        }
    });

    return article;
}
