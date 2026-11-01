import { createProductCard } from "./productCard.js";

const FAVORITES_KEY = "tmv-favorites";

// Recuperar favoritos de localStorage
function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

// Guardar favoritos en localStorage
function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

// Mostrar favoritos en el HTML
function renderFavorites() {
  const favoritesGrid = document.getElementById("favorites-grid");
  const favoritesCount = document.getElementById("favorites-count");

  if (!favoritesGrid || !favoritesCount) return;

  const favorites = getFavorites();

  favoritesGrid.innerHTML = "";

  favoritesCount.textContent = `${favorites.length} ${favorites.length === 1 ? "producto guardado" : "productos guardados"}`;

  if (favorites.length === 0) {
    favoritesGrid.innerHTML = `
            <div class="favorites-empty">
                <p class="status-message">
                    Todavía no has agregado favoritos.
                </p>
            </div>
        `;
    return;
  }

  favorites.forEach((product) => {
    const card = createProductCard(product, { isFavorite: true });
    favoritesGrid.appendChild(card);
  });
}

// Agregar producto a favoritos
function addFavorite(product) {
  const favorites = getFavorites();

  // Evitar productos duplicados
  const alreadyFavorite = favorites.some(
    (favorite) => String(favorite.id) === String(product.id),
  );

  if (alreadyFavorite) return;

  favorites.push(product);

  saveFavorites(favorites);
  renderFavorites();

  // Desplazar la página hasta favoritos
  document.querySelector(".favorites-section").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// Eliminar producto de favoritos
function removeFavorite(productId) {
  const favorites = getFavorites();

  const updatedFavorites = favorites.filter(
    (product) => String(product.id) !== String(productId),
  );

  saveFavorites(updatedFavorites);
  renderFavorites();
}

// Inicializar eventos y recuperar favoritos
export function initFavorites() {
  // Evento para agregar favoritos
  document.addEventListener("favorites:add", (event) => {
    addFavorite(event.detail);
  });

  // Evento para eliminar favoritos
  document.addEventListener("favorites:remove", (event) => {
    removeFavorite(event.detail.id);
  });

  // Recuperar favoritos al cargar la página
  renderFavorites();
}
