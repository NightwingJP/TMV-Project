// ==========================================================================
// TMV - Página de Catálogo de Productos (catalog.js)
// ==========================================================================

import { initProductsArea } from "../catalog/productsArea.js";
import { initFavorites } from "../catalog/favorites.js";
import { initToolbar } from "../catalog/catalogHero&Toolbar.js";

document.addEventListener("DOMContentLoaded", () => {
  initProductsArea();
  initToolbar();
  initFavorites();
});
