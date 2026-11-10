// =============================================================================
// TMV - Control de alternancia entre vistas Login y Registro (authToggle.js)
// =============================================================================

/**
 * Alterna la vista entre Login y Registro agregando/removiendo la clase 'active'
 * en el contenedor de la libreta (#authNotebook).
 */
export function initNotebookToggle() {
    const notebook = document.getElementById("authNotebook");
    const btnShowRegister = document.getElementById("btn-show-register");
    const btnShowLogin = document.getElementById("btn-show-login");
    const mobileToRegister = document.getElementById("mobile-to-register");
    const mobileToLogin = document.getElementById("mobile-to-login");

    if (!notebook) return;

    // Lee la URL para abrir directamente en registro si viene con ?mode=register
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get("mode");

    if (mode === "register") {
        notebook.classList.add("active");
    } else if (mode === "login") {
        notebook.classList.remove("active");
    }

    const activarRegistro = () => notebook.classList.add("active");
    const activarLogin = () => notebook.classList.remove("active");

    if (btnShowRegister) btnShowRegister.addEventListener("click", activarRegistro);
    if (btnShowLogin) btnShowLogin.addEventListener("click", activarLogin);
    if (mobileToRegister) mobileToRegister.addEventListener("click", activarRegistro);
    if (mobileToLogin) mobileToLogin.addEventListener("click", activarLogin);
}

