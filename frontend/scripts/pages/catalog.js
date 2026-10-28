// ==========================================================================
// TMV - Página de Catálogo de Productos (catalog.js)
// ==========================================================================

import { initProductsArea } from "../catalog/productsArea.js";

document.addEventListener("DOMContentLoaded", () => {
    initProductsArea();
});

import { initToolbar } from "../catalog/catalogHero&Toolbar.js";
// Aquí también irán los imports de tus compañeros (ej. initProductsArea, initCategoryFilters)

document.addEventListener("DOMContentLoaded", () => {
    initToolbar();
});