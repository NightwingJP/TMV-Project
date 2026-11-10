// =============================================================================
// TMV - Inicio de sesión (loginUsuario.js)
// -----------------------------------------------------------------------------
// Valida los campos del login con las mismas reglas del registro y compara las
// credenciales contra los usuarios fijos de UsuarioData.js:
//   - Administrador -> homePageAdmin.html
//   - Cliente       -> productos.html (catálogo)
//   - Otro caso     -> mensaje de error
// =============================================================================

import { validateEmail, validatePassword } from "../utils/utils.js";
import { buscarUsuarioFijo, guardarSesion, RUTAS_POR_ROL } from "./UsuarioData.js";

/**
 * Valida el formato de los campos del login.
 * @param {string} email
 * @param {string} password
 * @returns {{valido: boolean, errores: {email: string, password: string}}}
 */
export function validarLogin(email, password) {
    const errores = {
        email: validateEmail(email),
        password: validatePassword(password)
    };
    return { valido: !errores.email && !errores.password, errores };
}

/**
 * Intenta autenticar al usuario.
 * @returns {{exito: boolean, usuario?: object, destino?: string, mensaje?: string}}
 */
export function autenticarUsuario(email, password) {
    const usuario = buscarUsuarioFijo(email, password);

    if (!usuario) {
        return { exito: false, mensaje: "Correo o contraseña incorrectos." };
    }

    return { exito: true, usuario, destino: RUTAS_POR_ROL[usuario.rol] };
}

export function initLoginUsuario() {
    const formSignIn = document.getElementById("form-signin");
    if (!formSignIn) return;

    const campoCorreo = document.getElementById("signin-email");
    const errorCorreo = document.getElementById("error-signin-email");
    const campoPassword = document.getElementById("signin-password");
    const errorPassword = document.getElementById("error-signin-password");
    const feedback = document.getElementById("signin-feedback");

    const mostrarError = (campo, contenedor, mensaje) => {
        if (contenedor) contenedor.textContent = mensaje;
        if (campo) campo.setAttribute("aria-invalid", mensaje ? "true" : "false");
    };

    const limpiarFeedback = () => {
        if (feedback) feedback.textContent = "";
    };

    // Limpia los errores mientras el usuario vuelve a escribir
    campoCorreo?.addEventListener("input", () => {
        mostrarError(campoCorreo, errorCorreo, "");
        limpiarFeedback();
    });
    campoPassword?.addEventListener("input", () => {
        mostrarError(campoPassword, errorPassword, "");
        limpiarFeedback();
    });

    formSignIn.addEventListener("submit", (event) => {
        event.preventDefault();
        limpiarFeedback();

        const email = campoCorreo?.value ?? "";
        const password = campoPassword?.value ?? "";

        // 1. Validación de formato (mismas reglas que el registro)
        const { valido, errores } = validarLogin(email, password);
        mostrarError(campoCorreo, errorCorreo, errores.email);
        mostrarError(campoPassword, errorPassword, errores.password);

        if (!valido) {
            (errores.email ? campoCorreo : campoPassword)?.focus();
            return;
        }

        // 2. Verificación de credenciales y redirección según el rol
        const resultado = autenticarUsuario(email, password);

        if (!resultado.exito) {
            if (feedback) feedback.textContent = resultado.mensaje;
            alert(resultado.mensaje);
            campoPassword?.focus();
            return;
        }

        guardarSesion(resultado.usuario);
        window.location.href = resultado.destino;
    });
}
