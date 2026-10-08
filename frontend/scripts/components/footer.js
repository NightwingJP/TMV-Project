// ==========================================================================
// TMV - Lógica del Componente Footer (footer.js)
// ==========================================================================

/**
 * Inicializa la funcionalidad interactiva del Footer
 */
export function initFooter() {
    const footerContainer = document.getElementById("footer-container");
    if (!footerContainer) return;

    // Determinar si estamos en /pages/ o en la raíz
    const pathname = window.location.pathname;
    const isInsidePages = pathname.includes("/pages/") || pathname.split("/").slice(-2)[0] === "pages";
    const pathToRoot = isInsidePages ? "../" : "./";
    const pathToPages = isInsidePages ? "./" : "pages/";

    // 1. Ajustar enlaces relativos del footer según la ubicación actual
    const footerLinks = footerContainer.querySelectorAll(".tmv-footer-link, .tmv-footer-brand-link, [data-path]");
    footerLinks.forEach((link) => {
        const targetPath = link.getAttribute("data-path");
        if (!targetPath) return;

        if (targetPath === "index.html") {
            link.setAttribute("href", `${pathToRoot}index.html`);
        } else {
            link.setAttribute("href", `${pathToPages}${targetPath}`);
        }
    });

    // 2. Detección y activación del enlace actual en el footer
    let currentFile = pathname.substring(pathname.lastIndexOf("/") + 1);
    if (!currentFile || currentFile === "") {
        currentFile = "index.html";
    }

    footerLinks.forEach((link) => {
        const targetPath = link.getAttribute("data-path");
        if (targetPath === currentFile && link.classList.contains("tmv-footer-link")) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else if (link.classList.contains("tmv-footer-link")) {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }
    });
}
