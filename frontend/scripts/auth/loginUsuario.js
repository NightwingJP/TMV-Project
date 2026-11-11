// =============================================================================
// TMV - Inicio de sesión (loginUsuario.js)
// -----------------------------------------------------------------------------
// Valida los campos del login con las mismas reglas del registro y compara las
// credenciales contra los usuarios fijos de UsuarioData.js:
//   - Administrador -> homePageAdmin.html
//   - Cliente       -> productos.html (catálogo)
//   - Otro caso     -> mensaje de error
// =============================================================================
// Validaciones de campos de formulario en login ( 1er campo NOMBRE usuario O correo a validad 2do contrasena (FER)
import { validateEmail, validatePassword } from "../utils/utils.js";

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
 * @param {string[]} mensajes
 */
function mostrarAlertaLogin(feedbackEl, mensajes) {
    if (feedbackEl) {
        feedbackEl.textContent = mensajes.join(" ");
        feedbackEl.className = "auth-feedback is-error";
        feedbackEl.setAttribute("role", "alert");
    }
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
 * Inicializa las validaciones y alertas del formulario de inicio de sesión (#form-signin).
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

    const campos = [
        {
            input: campoEmail,
            errorEl: errorEmail,
            errorId: "error-signin-email",
            validar: validarCorreoLogin,
            revisado: false
        },
        {
            input: campoPassword,
            errorEl: errorPassword,
            errorId: "error-signin-password",
            validar: validarContrasenaLogin,
            revisado: false
        }
    ];

    const comprobarCampo = (campo) => {
        if (!campo.input) return "";
        const mensaje = campo.validar(campo.input.value);
        if (campo.errorEl) {
            campo.errorEl.textContent = mensaje;
        }
        campo.input.setAttribute("aria-invalid", mensaje ? "true" : "false");
        return mensaje;
    };

    campos.forEach((campo) => {
        if (!campo.input) return;
        if (campo.errorEl) {
            campo.input.setAttribute("aria-describedby", campo.errorId);
            campo.errorEl.setAttribute("aria-live", "polite");
        }

        campo.input.addEventListener("blur", () => {
            campo.revisado = true;
            comprobarCampo(campo);
        });

        campo.input.addEventListener("input", () => {
            if (campo.revisado) {
                comprobarCampo(campo);
            }
            limpiarAlertaLogin(feedbackLogin);
        });
    });

    formularioLogin.addEventListener("submit", (event) => {
        event.preventDefault();

        const mensajesError = [];
        let primerCampoInvalido = null;

        campos.forEach((campo) => {
            campo.revisado = true;
            const mensaje = comprobarCampo(campo);
            if (mensaje) {
                mensajesError.push(mensaje);
                if (!primerCampoInvalido && campo.input) {
                    primerCampoInvalido = campo.input;
                }
            }
        });

        if (mensajesError.length > 0) {
            mostrarAlertaLogin(feedbackLogin, mensajesError);
            primerCampoInvalido?.focus();
            return;
        }

        limpiarAlertaLogin(feedbackLogin);
        formularioLogin.dispatchEvent(
            new CustomEvent("tmv:login-validated", {
                detail: {
                    email: (campoEmail?.value || "").trim(),
                    password: campoPassword?.value || ""
                }
            })
        );
    });
}

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
