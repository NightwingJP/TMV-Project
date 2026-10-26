// ==========================================================================
// TMV - Orquestador del Área de Productos (productsArea.js)
// ==========================================================================

import { getProducts } from "./productsData.js";
import { createProductCard } from "./productCard.js";
import { paginateItems, renderPagination, DEFAULT_ITEMS_PER_PAGE } from "./pagination.js";

/**
 * Estado local del área de productos
 */
const state = {
    allProducts: [],
    currentPage: 1,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE
};

/**
 * Renderiza el grid de productos y la paginación según el estado actual.
 */
function renderCatalog() {
    const gridContainer = document.getElementById("products-grid");
    const paginationContainer = document.getElementById("pagination");
    const countElement = document.getElementById("product-count");

    if (!gridContainer) return;

    // 1. Verificar si hay productos
    if (state.allProducts.length === 0) {
        gridContainer.innerHTML = `
            <div class="products-empty text-center py-5">
                <p class="status-message">No hay productos disponibles en este momento.</p>
            </div>
        `;
        if (paginationContainer) paginationContainer.style.display = "none";
        if (countElement) countElement.textContent = "0 productos disponibles";
        return;
    }

    // 2. Calcular paginación
    const { paginatedItems, totalPages, totalItems, startIndex, endIndex } = paginateItems(
        state.allProducts,
        state.currentPage,
        state.itemsPerPage
    );

    // 3. Renderizar las tarjetas con DocumentFragment para óptimo rendimiento
    const fragment = document.createDocumentFragment();
    paginatedItems.forEach((product) => {
        const card = createProductCard(product);
        fragment.appendChild(card);
    });

    gridContainer.innerHTML = "";
    gridContainer.appendChild(fragment);

    // 4. Renderizar controles de paginación
    if (paginationContainer) {
        renderPagination(paginationContainer, {
            totalItems,
            currentPage: state.currentPage,
            itemsPerPage: state.itemsPerPage,
            onPageChange: (newPage) => {
                state.currentPage = newPage;
                renderCatalog();

                // Desplazamiento suave al inicio del grid de productos
                const scrollTarget = document.querySelector(".catalog-layout") || gridContainer;
                scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    }

    // 5. Actualizar el indicador de conteo
    if (countElement) {
        const showingFrom = startIndex + 1;
        const showingTo = endIndex;
        countElement.textContent = `Mostrando ${showingFrom}-${showingTo} de ${totalItems} productos`;
    }
}

/**
 * Inicializa el área de productos del catálogo.
 * Debe ser invocado cuando el DOM esté listo.
 */
export function initProductsArea() {
    const gridContainer = document.getElementById("products-grid");
    if (!gridContainer) return;

    // Cargar productos del inventario y localStorage
    state.allProducts = getProducts();
    state.currentPage = 1;

    // Render inicial
    renderCatalog();

    // Escuchar eventos globales si en el futuro se agregan filtros o búsquedas
    document.addEventListener("catalog:products-updated", (event) => {
        if (event.detail && Array.isArray(event.detail.products)) {
            state.allProducts = event.detail.products;
            state.currentPage = 1;
            renderCatalog();
        }
    });
}
