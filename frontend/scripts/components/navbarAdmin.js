// ==========================================================================
// TMV - Navbar Administrativo (navbarAdmin.js)
// ==========================================================================

/**
 * Inicializa los eventos del navbar de administración:
 * - Rutas dinámicas para logos y enlaces
 * - Detección del hash de anclaje activo
 * - Despliegue y accesibilidad del menú móvil
 */
export function initNavbarAdmin() {
    const brandLink = document.getElementById("tmvAdminBrandLink");
    const logoCube = document.querySelector(".tmv-header-admin .tmv-brand-cube");
    const logoLetters = document.querySelector(".tmv-header-admin .tmv-brand-letters");

    const dropdown = document.getElementById("tmvAdminDropdown");
    const dropdownBtn = document.getElementById("adminDropdownBtn");
    const dropdownItems = document.querySelectorAll(".tmv-dropdown-item");

    // Resolver rutas relativas según el nivel de directorio
    const pathname = window.location.pathname;
    const isInsidePages = /\/pages(\/|$)/i.test(pathname);
    const pathToRoot = isInsidePages ? "../" : "./";
    const pathToHomeAdmin = isInsidePages ? "homePageAdmin.html" : "pages/homePageAdmin.html";

    if (brandLink) {
        brandLink.setAttribute("href", pathToHomeAdmin);
    }

    if (logoCube) {
        logoCube.setAttribute("src", `${pathToRoot}assets/images/logos/logo-cube.png`);
    }

    if (logoLetters) {
        logoLetters.setAttribute("src", `${pathToRoot}assets/images/logos/logo-tmv.png`);
    }

    const publicStoreLinks = document.querySelectorAll('[data-public-store="true"]');
    publicStoreLinks.forEach((link) => {
        link.setAttribute("href", `${pathToRoot}index.html`);
    });

    // Sincronizar el enlace activo con el hash de la URL
    const updateActiveState = () => {
        const hash = window.location.hash.replace("#", "") || "dashboard";
        const allAnchorLinks = document.querySelectorAll("[data-anchor]");
        allAnchorLinks.forEach((link) => {
            const anchor = link.getAttribute("data-anchor");
            if (anchor === hash) {
                link.classList.add("active");
                link.setAttribute("aria-current", "page");
            } else {
                link.classList.remove("active");
                link.removeAttribute("aria-current");
            }
        });
    };

    window.addEventListener("hashchange", updateActiveState);
    updateActiveState();

    // Control de apertura y cierre del menú desplegable móvil
    if (dropdown && dropdownBtn) {
        const toggleDropdown = (forceState) => {
            const shouldOpen = typeof forceState === "boolean"
                ? forceState
                : !dropdown.classList.contains("is-open");

            if (shouldOpen) {
                dropdown.classList.add("is-open");
                dropdownBtn.setAttribute("aria-expanded", "true");
            } else {
                dropdown.classList.remove("is-open");
                dropdownBtn.setAttribute("aria-expanded", "false");
            }
        };

        dropdownBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            toggleDropdown();
        });

        document.addEventListener("click", (event) => {
            if (!dropdown.contains(event.target)) {
                toggleDropdown(false);
            }
        });

        dropdownItems.forEach((item) => {
            item.addEventListener("click", () => {
                toggleDropdown(false);
            });
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && dropdown.classList.contains("is-open")) {
                toggleDropdown(false);
                dropdownBtn.focus();
            }
        });
    }
}
