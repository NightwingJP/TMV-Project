import {
    validateName,
    validateEmail,
    validatePhone,
    validatePassword
} from "../utils/utils.js";

export const USERS_STORAGE_KEY = "tmvUsuarios";

export function initNotebookToggle() {
    const notebook = document.getElementById("authNotebook");
    const btnShowRegister = document.getElementById("btn-show-register");
    const btnShowLogin = document.getElementById("btn-show-login");
    const mobileToRegister = document.getElementById("mobile-to-register");
    const mobileToLogin = document.getElementById("mobile-to-login");

    if (!notebook) return;

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

export function validarRegistro(datos) {
    return {
        valido: true,
        errores: {}
    };
}

export function obtenerUsuariosRegistrados() {
    return [];
}

export function guardarUsuario(nuevoUsuario) {
    return null;
}

export function registrarUsuario(datosFormulario) {
    return { exito: true };
}

document.addEventListener("DOMContentLoaded", () => {
    initNotebookToggle();

    const formSignUp = document.getElementById("form-signup");
    if (formSignUp) {
        formSignUp.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(formSignUp);
            const datos = Object.fromEntries(formData.entries());
            registrarUsuario(datos);
        });
    }

    const formSignIn = document.getElementById("form-signin");
    if (formSignIn) {
        formSignIn.addEventListener("submit", (event) => {
            event.preventDefault();
        });
    }
});
