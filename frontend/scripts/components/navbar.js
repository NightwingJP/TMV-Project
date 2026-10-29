import { getTotalCartCount } from "../pages/carrito.js";

// Actualiza el número del carrito en el navbar con el total guardado en localStorage
export function updateNavbarCartBadge() {
    const cartBadge = document.getElementById("tmvCartBadge");
    if (!cartBadge) return;

    const totalCount = getTotalCartCount();
    cartBadge.textContent = String(totalCount);

    cartBadge.classList.remove("badge-pop");
    void cartBadge.offsetWidth;
    cartBadge.classList.add("badge-pop");
}

export function initNavbar() {
    const navToggle = document.getElementById("tmvNavToggle");
    const navWrapper = document.getElementById("tmvNavWrapper");
    const navLinks = document.querySelectorAll(".tmv-nav-link");
    const brandLink = document.querySelector(".tmv-brand-link");
    const logoCube = document.querySelector(".tmv-brand-cube");
    const logoLetters = document.querySelector(".tmv-brand-letters");

    const pathname = window.location.pathname;
    const isInsidePages = /\/pages(\/|$)/i.test(pathname);

    const pathToRoot = isInsidePages ? "../" : "./";
    const pathToPages = isInsidePages ? "./" : "pages/";

    // Ajustar rutas según si estamos en la raíz o dentro de /pages/
    if (brandLink) {
        brandLink.setAttribute("href", `${pathToRoot}index.html`);
    }

    if (logoCube) {
        logoCube.setAttribute("src", `${pathToRoot}assets/images/logos/logo-cube.png`);
    }

    if (logoLetters) {
        logoLetters.setAttribute("src", `${pathToRoot}assets/images/logos/logo-tmv.png`);
    }

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

    const authBtn = document.getElementById("tmvAuthBtn");
    if (authBtn) {
        const targetHref = `${pathToPages}homePageAdmin.html`;
        authBtn.setAttribute("href", targetHref);

        authBtn.addEventListener("click", (event) => {
            event.preventDefault();
            const inPages = /\/pages(\/|$)/i.test(window.location.pathname);
            window.location.href = inPages ? "homePageAdmin.html" : "pages/homePageAdmin.html";
        });
    }

    // Sincronizar contador del carrito al cargar la página y al recibir cambios
    updateNavbarCartBadge();

    if (!window.__tmvCartNavbarListenerBound) {
        document.addEventListener("cart:updated", () => {
            updateNavbarCartBadge();
        });
        window.__tmvCartNavbarListenerBound = true;
    }

    // Marcar enlace activo según la página actual
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

    // Menú móvil
    if (navToggle && navWrapper) {
        navToggle.addEventListener("click", () => {
            const isOpen = navWrapper.classList.toggle("is-open");
            navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        document.addEventListener("click", (event) => {
            if (!navWrapper.contains(event.target) && !navToggle.contains(event.target)) {
                navWrapper.classList.remove("is-open");
                navToggle.setAttribute("aria-expanded", "false");
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && navWrapper.classList.contains("is-open")) {
                navWrapper.classList.remove("is-open");
                navToggle.setAttribute("aria-expanded", "false");
            }
        });
    }
}
