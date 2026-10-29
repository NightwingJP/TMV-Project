// ==========================================================================
// TMV - Lógica del Componente Header & Navbar (navbar.js)
// ==========================================================================

import { getTotalCartCount } from "../pages/carrito.js";

/**
 * Actualiza el contador visual del carrito (#tmvCartBadge) en el navbar
 * leyendo el total de unidades almacenadas en localStorage.
 */
export function updateNavbarCartBadge() {
    const cartBadge = document.getElementById("tmvCartBadge");
    if (!cartBadge) return;

    const totalCount = getTotalCartCount();
    cartBadge.textContent = String(totalCount);

    // Pequeña animación visual cuando cambia el número
    cartBadge.classList.remove("badge-pop");
    void cartBadge.offsetWidth; // Reflow para reiniciar animación
    cartBadge.classList.add("badge-pop");
}

/**
 * Inicializa la funcionalidad interactiva del Header y Navbar
 * ajustando rutas relativas, resaltando la página activa, sincronizando el carrito
 * y habilitando el menú móvil.
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
    const isInsidePages = /\/pages(\/|$)/i.test(pathname);

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

    // Actualizar todos los elementos con atributo data-path
    const elementsWithPath = document.querySelectorAll("[data-path]");
    elementsWithPath.forEach((element) => {
        const targetPath = element.getAttribute("data-path");
        if (!targetPath) return;

        if (targetPath === "index.html") {
            element.setAttribute("href", `${pathToRoot}index.html`);
        } else {
            element.setAttribute("href", `${pathToPages}${targetPath}`);
        }
    });

    // Enlace del botón de login / panel administrativo
    const authBtn = document.getElementById("tmvAuthBtn");
    if (authBtn) {
        const targetHref = `${pathToPages}homePageAdmin.html`;
        authBtn.setAttribute("href", targetHref);

        // Prevenir redirección errónea o duplicada en entornos como GitHub Pages
        authBtn.addEventListener("click", (event) => {
            event.preventDefault();
            const inPages = /\/pages(\/|$)/i.test(window.location.pathname);
            window.location.href = inPages ? "homePageAdmin.html" : "pages/homePageAdmin.html";
        });
    }

    // 2. Sincronizar el contador del carrito en el navbar en cualquier página pública
    updateNavbarCartBadge();

    // Escuchar actualizaciones del carrito en tiempo real
    if (!window.__tmvCartNavbarListenerBound) {
        document.addEventListener("cart:updated", () => {
            updateNavbarCartBadge();
        });
        window.__tmvCartNavbarListenerBound = true;
    }

    // 3. Detección y activación del enlace actual (estado active)
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

    // 4. Menú responsivo (Toggle para móviles)
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
