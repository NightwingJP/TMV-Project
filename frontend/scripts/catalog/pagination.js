// ==========================================================================
// TMV - Módulo de Paginación del Catálogo (pagination.js)
// ==========================================================================

export const DEFAULT_ITEMS_PER_PAGE = 6;

/**
 * Segmenta un arreglo de items según la página y cantidad por página.
 * @param {Array} items - Arreglo total de productos
 * @param {number} currentPage - Página actual (1-indexed)
 * @param {number} [itemsPerPage=6] - Cantidad de tarjetas por página
 * @returns {Object} { paginatedItems, totalPages, totalItems, currentPage, startIndex, endIndex }
 */
export function paginateItems(items, currentPage = 1, itemsPerPage = DEFAULT_ITEMS_PER_PAGE) {
    const totalItems = items.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const validPage = Math.min(Math.max(1, currentPage), totalPages);

    const startIndex = (validPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const paginatedItems = items.slice(startIndex, endIndex);

    return {
        paginatedItems,
        totalPages,
        totalItems,
        currentPage: validPage,
        startIndex,
        endIndex
    };
}

/**
 * Renderiza los controles de navegación de paginación en el contenedor especificado.
 *
 * @param {HTMLElement} container - Elemento <nav id="pagination">
 * @param {Object} options
 * @param {number} options.totalItems - Cantidad total de productos
 * @param {number} options.currentPage - Página actual
 * @param {number} [options.itemsPerPage=9] - Productos por página
 * @param {Function} options.onPageChange - Callback al cambiar de página (pageNumber)
 */
export function renderPagination(container, {
    totalItems,
    currentPage,
    itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
    onPageChange
}) {
    if (!container) return;

    container.innerHTML = "";

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Si solo hay una página o menos, no mostramos controles
    if (totalPages <= 1) {
        container.style.display = "none";
        return;
    }

    container.style.display = "flex";

    const navList = document.createElement("ul");
    navList.className = "pagination-list";
    navList.setAttribute("role", "list");

    // 1. Botón "Anterior"
    const prevLi = document.createElement("li");
    const prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "pagination-btn pagination-prev";
    prevBtn.innerHTML = "&laquo; Anterior";
    prevBtn.setAttribute("aria-label", "Ir a la página anterior");

    if (currentPage <= 1) {
        prevBtn.disabled = true;
        prevBtn.classList.add("disabled");
        prevBtn.setAttribute("aria-disabled", "true");
    } else {
        prevBtn.addEventListener("click", () => {
            if (typeof onPageChange === "function") {
                onPageChange(currentPage - 1);
            }
        });
    }
    prevLi.appendChild(prevBtn);
    navList.appendChild(prevLi);

    // 2. Botones de Páginas Numéricas
    for (let page = 1; page <= totalPages; page++) {
        const pageLi = document.createElement("li");
        const pageBtn = document.createElement("button");
        pageBtn.type = "button";
        pageBtn.className = "pagination-btn pagination-number";
        pageBtn.textContent = String(page);
        pageBtn.setAttribute("aria-label", `Ir a la página ${page}`);

        if (page === currentPage) {
            pageBtn.classList.add("active");
            pageBtn.setAttribute("aria-current", "page");
        } else {
            pageBtn.addEventListener("click", () => {
                if (typeof onPageChange === "function") {
                    onPageChange(page);
                }
            });
        }

        pageLi.appendChild(pageBtn);
        navList.appendChild(pageLi);
    }

    // 3. Botón "Siguiente"
    const nextLi = document.createElement("li");
    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "pagination-btn pagination-next";
    nextBtn.innerHTML = "Siguiente &raquo;";
    nextBtn.setAttribute("aria-label", "Ir a la página siguiente");

    if (currentPage >= totalPages) {
        nextBtn.disabled = true;
        nextBtn.classList.add("disabled");
        nextBtn.setAttribute("aria-disabled", "true");
    } else {
        nextBtn.addEventListener("click", () => {
            if (typeof onPageChange === "function") {
                onPageChange(currentPage + 1);
            }
        });
    }
    nextLi.appendChild(nextBtn);
    navList.appendChild(nextLi);

    container.appendChild(navList);
}
