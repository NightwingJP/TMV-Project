// ==========================================================================
// TMV - Lógica del Componente Header & Navbar (navbar.js)
// ==========================================================================

/**
 * Inicializa la funcionalidad interactiva del Header y Navbar
 * ajustando rutas relativas, resaltando la página activa y habilitando el menú móvil.
 */
export function initNavbar() {
    const navToggle = document.getElementById("tmvNavToggle");
    const navWrapper = document.getElementById("tmvNavWrapper");
    const navLinks = document.querySelectorAll(".tmv-nav-link");
    const brandLink = document.querySelector(".tmv-brand-link");
    const logoCube = document.querySelector(".tmv-brand-cube");
    const logoLetters = document.querySelector(".tmv-brand-letters");

    // Determinar si estamos dentro del subdirectorio /pages/ o en la raíz
    const pathname = window.location.pathname;
    const isInsidePages = pathname.includes("/pages/") || pathname.split("/").slice(-2)[0] === "pages";

    const pathToRoot = isInsidePages ? "../" : "./";
    const pathToPages = isInsidePages ? "./" : "pages/";

    // 1. Ajuste dinámico de enlaces según la ubicación actual
    if (brandLink) {
        brandLink.setAttribute("href", `${pathToRoot}index.html`);
    }

    if (logoCube) {
        logoCube.setAttribute("src", `${pathToRoot}assets/images/logos/logo-cube.png`);
    }

    if (logoLetters) {
        logoLetters.setAttribute("src", `${pathToRoot}assets/images/logos/logo-tmv.png`);
    }

    navLinks.forEach((link) => {
        const targetPath = link.getAttribute("data-path");
        if (!targetPath) return;

        if (targetPath === "index.html") {
            link.setAttribute("href", `${pathToRoot}index.html`);
        } else {
            link.setAttribute("href", `${pathToPages}${targetPath}`);
        }
    });

    // 2. Detección y activación del enlace actual (estado active)
    let currentFile = pathname.substring(pathname.lastIndexOf("/") + 1);
    if (!currentFile || currentFile === "") {
        currentFile = "index.html";
    }

    navLinks.forEach((link) => {
        const targetPath = link.getAttribute("data-path");
        if (targetPath === currentFile) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }
    });

    // 3. Menú responsivo (Toggle para móviles)
    if (navToggle && navWrapper) {
        navToggle.addEventListener("click", () => {
            const isOpen = navWrapper.classList.toggle("is-open");
            navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener("click", (event) => {
            if (!navWrapper.contains(event.target) && !navToggle.contains(event.target)) {
                navWrapper.classList.remove("is-open");
                navToggle.setAttribute("aria-expanded", "false");
            }
        });

        // Cerrar menú con tecla ESC
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && navWrapper.classList.contains("is-open")) {
                navWrapper.classList.remove("is-open");
                navToggle.setAttribute("aria-expanded", "false");
            }
        });
    }
}
