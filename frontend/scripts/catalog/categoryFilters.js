import { getProducts } from "./productsData.js";
import { createProductCard } from "./productCard.js";
import { paginateItems, renderPagination, DEFAULT_ITEMS_PER_PAGE } from "./pagination.js";

const categoryState = {
    products: [],
    selectedCategory: "all",
    currentPage: 1
};

function renderCategoryOptions() {
    const container = document.getElementById("category-filters");
    if (!container) return;

    const categories = [...new Set(categoryState.products
        .map((product) => product.category?.trim())
        .filter(Boolean))].sort((a, b) => a.localeCompare(b, "es"));
    const options = [{ value: "all", label: "Todas las categorías" },
        ...categories.map((category) => ({ value: category, label: category }))];
    const fragment = document.createDocumentFragment();

    options.forEach(({ value, label }) => {
        const option = document.createElement("label");
        option.className = "category-filter";
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "catalog-category";
        radio.value = value;
        radio.checked = value === categoryState.selectedCategory;
        radio.addEventListener("change", () => {
            if (!radio.checked) return;
            categoryState.selectedCategory = value;
            categoryState.currentPage = 1;
            renderProducts();
        });
        const text = document.createElement("span");
        text.textContent = label;
        option.append(radio, text);
        fragment.appendChild(option);
    });

    container.replaceChildren(fragment);
}

function renderProducts() {
    const grid = document.getElementById("products-grid");
    const pagination = document.getElementById("pagination");
    const count = document.getElementById("product-count");
    if (!grid) return;

    const filteredProducts = categoryState.selectedCategory === "all"
        ? categoryState.products
        : categoryState.products.filter((product) => product.category === categoryState.selectedCategory);

    if (filteredProducts.length === 0) {
        grid.innerHTML = '<div class="products-empty text-center py-5"><p class="status-message">No hay productos en esta categoría.</p></div>';
        if (pagination) pagination.style.display = "none";
        if (count) count.textContent = "0 productos disponibles";
        return;
    }

    const { paginatedItems, totalItems, startIndex, endIndex } = paginateItems(
        filteredProducts, categoryState.currentPage, DEFAULT_ITEMS_PER_PAGE
    );
    const fragment = document.createDocumentFragment();
    paginatedItems.forEach((product) => fragment.appendChild(createProductCard(product)));
    grid.replaceChildren(fragment);

    if (pagination) {
        renderPagination(pagination, {
            totalItems,
            currentPage: categoryState.currentPage,
            itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
            onPageChange: (page) => {
                categoryState.currentPage = page;
                renderProducts();
                (document.querySelector(".catalog-layout") || grid)
                    .scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    }
    if (count) {
        count.textContent = "Mostrando " + (startIndex + 1) + "-" + endIndex + " de " + totalItems + " productos";
    }
}

function initCategoryFilters() {
    const grid = document.getElementById("products-grid");
    if (!grid) return;

    categoryState.products = getProducts();
    renderCategoryOptions();
    renderProducts();

    document.getElementById("clear-filters")?.addEventListener("click", () => {
        categoryState.selectedCategory = "all";
        categoryState.currentPage = 1;
        renderCategoryOptions();
        renderProducts();
    });

    document.addEventListener("catalog:products-updated", (event) => {
        if (!Array.isArray(event.detail?.products)) return;
        categoryState.products = event.detail.products;
        if (categoryState.selectedCategory !== "all" &&
            !categoryState.products.some((product) => product.category === categoryState.selectedCategory)) {
            categoryState.selectedCategory = "all";
        }
        categoryState.currentPage = 1;
        renderCategoryOptions();
        renderProducts();
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(initCategoryFilters, 0), { once: true });
} else {
    initCategoryFilters();
}
