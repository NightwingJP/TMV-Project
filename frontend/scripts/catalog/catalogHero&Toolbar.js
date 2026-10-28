import { getProducts } from "./productsData.js";

const toolbarState = {
    searchTerm: "",
    sortOption: "default"
};

export function initToolbar() {
    const searchInput = document.getElementById("search-input");
    const sortSelect = document.getElementById("sort-select");

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            toolbarState.searchTerm = e.target.value.trim().toLowerCase();
            applyFiltersAndSort();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            toolbarState.sortOption = e.target.value;
            applyFiltersAndSort();
        });
    }
}

function applyFiltersAndSort() {
    // 1. Obtener productos actualizados (incluye localStorage)
    let processedProducts = getProducts();

    // 2. Aplicar búsqueda por texto
    if (toolbarState.searchTerm) {
        processedProducts = processedProducts.filter(product =>
            product.title.toLowerCase().includes(toolbarState.searchTerm) ||
            product.description.toLowerCase().includes(toolbarState.searchTerm)
        );
    }

    // 3. Aplicar ordenamiento
    switch (toolbarState.sortOption) {
        case "price-asc":
            processedProducts.sort((a, b) => a.price - b.price);
            break;
        case "price-desc":
            processedProducts.sort((a, b) => b.price - a.price);
            break;
        case "name-asc":
            processedProducts.sort((a, b) => a.title.localeCompare(b.title, "es"));
            break;
    }

    // 4. Emitir evento para que los módulos de la grilla se actualicen
    const event = new CustomEvent("catalog:products-updated", {
        bubbles: true,
        detail: { products: processedProducts }
    });
    document.dispatchEvent(event);
}