// ==========================================================================
// TMV - Orquestador Principal de la Aplicación (main.js)
// ==========================================================================

import { initNavbar } from "./components/navbar.js";
import { initFooter } from "./components/footer.js";

/**
 * Carga e inyecta dinámicamente un componente HTML modular.
 * @param {string} containerId - ID del elemento contenedor en el DOM
 * @param {string} componentFile - Nombre del archivo del componente (ej. 'header.html')
 * @param {Function} [onLoadedCallback] - Callback a ejecutar una vez inyectado el HTML
 */
async function loadComponent(containerId, componentFile, onLoadedCallback) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const pathname = window.location.pathname;
    const isInsidePages = pathname.includes("/pages/") || pathname.split("/").slice(-2)[0] === "pages";
    const componentPath = isInsidePages
        ? `../components/${componentFile}`
        : `components/${componentFile}`;

    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Error ${response.status} al cargar ${componentPath}`);
        }
        const html = await response.text();
        container.innerHTML = html;

        if (typeof onLoadedCallback === "function") {
            onLoadedCallback();
        }
    } catch (error) {
        console.warn(`[TMV Modular Loader] No se pudo cargar el componente ${componentFile}:`, error);
        // Si se abre vía file:/// CORS previene fetch local; mostrar aviso útil en consola
        if (window.location.protocol === "file:") {
            console.warn(
                "[TMV] Para cargar componentes modulares con fetch(), ejecuta el proyecto en un servidor local (ej. Live Server o 'python -m http.server')."
            );
        }
    }
}

// Inicialización cuando el DOM esté listo
if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
        // 1. Cargar e inicializar Header y Navbar
        loadComponent("header-container", "header.html", () => {
            initNavbar();
        });

        // 2. Cargar e inicializar Footer (para Fase 2 o si el contenedor está presente)
        loadComponent("footer-container", "footer.html", () => {
            initFooter();
        });
    });
}
