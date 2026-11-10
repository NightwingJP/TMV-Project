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
 * Muestra la alerta visual en el formulario y dispara una alerta nativa del navegador.
 * @param {HTMLElement | null} feedbackEl
 * @param {string[]} mensajes
 */
function mostrarAlertaLogin(feedbackEl, mensajes) {
    const textoAlerta = mensajes.join("\n");

    if (feedbackEl) {
        feedbackEl.textContent = mensajes.join(" ");
        feedbackEl.className = "auth-feedback is-error";
        feedbackEl.setAttribute("role", "alert");
    }

    if (typeof window !== "undefined" && typeof window.alert === "function") {
        window.alert(`Error de inicio de sesión:\n${textoAlerta}`);
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


// Juan Pablo validaciones para validar usuario manipulado el local storage ( SI es admin -< dirigir a homePageAdmin, si es usuario -> catalog.html -> no encontrado alerta 

