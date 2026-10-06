// ==========================================================================
// TMV - Carga dinámica de Header y Footer compartidos (index.js)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // Cargar Componente Header
    fetch("components/header.html")
        .then((response) => response.text())
        .then((data) => {
            const headerContainer = document.getElementById("header-container");
            if (headerContainer) {
                headerContainer.innerHTML = data;
            }
        });

    // Cargar Componente Footer
    fetch("components/footer.html")
        .then((response) => response.text())
        .then((data) => {
            const footerContainer = document.getElementById("footer-container");
            if (footerContainer) {
                footerContainer.innerHTML = data;
            }
        });
});
