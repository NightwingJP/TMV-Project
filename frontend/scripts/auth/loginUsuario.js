// =============================================================================
// TMV - Inicio de sesión (loginUsuario.js)
// -----------------------------------------------------------------------------
// Valida los campos del login con las mismas reglas del registro y autentica
// las credenciales contra los usuarios fijos de UsuarioData.js:
//   - Administrador -> homePageAdmin.html
//   - Cliente       -> productos.html (catálogo)
//   - Otro caso     -> mensaje de error visual
// =============================================================================

import { validateEmail, validatePassword } from "../utils/utils.js";
import { buscarUsuarioFijo, guardarSesion, RUTAS_POR_ROL } from "./UsuarioData.js";

/**
 * Valida que el primer campo del login contenga un correo electrónico válido.
 * @param {string} correo
 * @returns {string} Mensaje de error o cadena vacía si es válido
 */
export function validarCorreoLogin(correo) {
    return validateEmail(correo);
}

/**
 * Valida que el segundo campo del login cumpla con el formato de contraseña requerido.
 * @param {string} contrasena
 * @returns {string} Mensaje de error o cadena vacía si es válido
 */
export function validarContrasenaLogin(contrasena) {
    return validatePassword(contrasena);
}

/**
 * Valida ambos campos del formulario de inicio de sesión.
 * @param {string} correo
 * @param {string} contrasena
 * @returns {{ valido: boolean, errores: { email: string, password: string } }}
 */
export function validarCamposLogin(correo, contrasena) {
    const errorEmail = validarCorreoLogin(correo);
    const errorPassword = validarContrasenaLogin(contrasena);

    return {
        valido: errorEmail === "" && errorPassword === "",
        errores: {
            email: errorEmail,
            password: errorPassword
        }
    };
}

/**
 * Muestra el mensaje de alerta visual en el contenedor de feedback del formulario.
 * @param {HTMLElement | null} feedbackEl
 * @param {string | string[]} mensajes
 */
function mostrarAlertaLogin(feedbackEl, mensajes) {
    if (!feedbackEl) return;
    const texto = Array.isArray(mensajes) ? mensajes.join(" ") : mensajes;
    feedbackEl.textContent = texto;
    feedbackEl.className = "auth-feedback is-error";
    feedbackEl.setAttribute("role", "alert");
}

/**
 * Limpia el contenedor visual de alertas del formulario de login.
 * @param {HTMLElement | null} feedbackEl
 */
function limpiarAlertaLogin(feedbackEl) {
    if (!feedbackEl) return;
    feedbackEl.textContent = "";
    feedbackEl.className = "auth-feedback";
    feedbackEl.removeAttribute("role");
}

/**
 * Intenta autenticar al usuario contra los usuarios registrados/fijos.
 * @param {string} email
 * @param {string} password
 * @returns {{ exito: boolean, usuario?: object, destino?: string, mensaje?: string }}
 */
export function autenticarUsuario(email, password) {
    const usuario = buscarUsuarioFijo(email, password);

    if (!usuario) {
        return { exito: false, mensaje: "Correo o contraseña incorrectos." };
    }

    return {
        exito: true,
        usuario,
        destino: RUTAS_POR_ROL[usuario.rol] || "productos.html"
    };
}

/**
 * Inicializa las validaciones, eventos y autenticación del formulario de login (#form-signin).
 */
export function initLoginUsuario() {
    if (typeof document === "undefined") return;

    const formularioLogin = document.getElementById("form-signin");
    if (!formularioLogin || formularioLogin.dataset.loginBound === "true") return;
    formularioLogin.dataset.loginBound = "true";

    const campoEmail = document.getElementById("signin-email");
    const errorEmail = document.getElementById("error-signin-email");
    const campoPassword = document.getElementById("signin-password");
    const errorPassword = document.getElementById("error-signin-password");
    const feedbackLogin = document.getElementById("signin-feedback");

    const comprobarEmail = () => {
        if (!campoEmail) return "";
        const mensaje = validarCorreoLogin(campoEmail.value);
        if (errorEmail) errorEmail.textContent = mensaje;
        campoEmail.setAttribute("aria-invalid", mensaje ? "true" : "false");
        return mensaje;
    };

    const comprobarPassword = () => {
        if (!campoPassword) return "";
        const mensaje = validarContrasenaLogin(campoPassword.value);
        if (errorPassword) errorPassword.textContent = mensaje;
        campoPassword.setAttribute("aria-invalid", mensaje ? "true" : "false");
        return mensaje;
    };

    // 1. Validación en tiempo real (blur / input)
    let emailRevisado = false;
    let passwordRevisado = false;

    if (campoEmail) {
        campoEmail.setAttribute("aria-describedby", "error-signin-email");
        if (errorEmail) errorEmail.setAttribute("aria-live", "polite");

        campoEmail.addEventListener("blur", () => {
            emailRevisado = true;
            comprobarEmail();
        });

        campoEmail.addEventListener("input", () => {
            if (emailRevisado) comprobarEmail();
            limpiarAlertaLogin(feedbackLogin);
        });
    }

    if (campoPassword) {
        campoPassword.setAttribute("aria-describedby", "error-signin-password");
        if (errorPassword) errorPassword.setAttribute("aria-live", "polite");

        campoPassword.addEventListener("blur", () => {
            passwordRevisado = true;
            comprobarPassword();
        });

        campoPassword.addEventListener("input", () => {
            if (passwordRevisado) comprobarPassword();
            limpiarAlertaLogin(feedbackLogin);
        });
    }

    // 2. Envío del formulario
    formularioLogin.addEventListener("submit", (event) => {
        event.preventDefault();
        limpiarAlertaLogin(feedbackLogin);

        emailRevisado = true;
        passwordRevisado = true;

        const errEmail = comprobarEmail();
        const errPassword = comprobarPassword();

        // Si hay errores de formato, enfoca el primer campo inválido
        if (errEmail || errPassword) {
            const errores = [errEmail, errPassword].filter(Boolean);
            mostrarAlertaLogin(feedbackLogin, errores);
            (errEmail ? campoEmail : campoPassword)?.focus();
            return;
        }

        const email = (campoEmail?.value || "").trim();
        const password = campoPassword?.value || "";

        // 3. Autenticación de credenciales
        const resultado = autenticarUsuario(email, password);

        if (!resultado.exito) {
            mostrarAlertaLogin(feedbackLogin, resultado.mensaje);
            campoPassword?.focus();
            return;
        }

        // 4. Sesión exitosa y redirección por rol
        guardarSesion(resultado.usuario);
        window.location.href = resultado.destino;
    });
}
