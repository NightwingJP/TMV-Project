
import {
    validateName,
    validateEmail,
    validatePhone,
    validatePassword
} from "../utils/utils.js";

export const USERS_STORAGE_KEY = "tmvUsuarios";

const ALL_FIELDS = [
    { id: 'fullName', validate: validateName },
    { id: 'email', validate: validateEmail },
    { id: 'phone', validate: validatePhone },
    { id: 'password', validate: validatePassword }
];

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

// VALIDAR NOMBRE FUNCION (ANGELA ) --------------------------------------------------------

// Buscar dentro de ALL_FIELDS la configuración del nombre.

const NAME_FIELD = ALL_FIELDS.find(
    (field) => field.id === "fullName"
);
export function validarNombre(nombre) {

    // Validación original de utils.js.
    const mensajeError = NAME_FIELD.validate(nombre);

    if (mensajeError) {
        return mensajeError;
    }

    const nombreLimpio = nombre.trim().replace(/\s+/g, " ");

    const palabras = nombreLimpio.split(" ");

    if (palabras.length < 3) {
        return "Ingresa nombres y apellidos completos.";
    }

    return "";
}



// VALIDAR NUMERO FUNCION (FER) ------------------------------------------------

// Validar que el teléfono no esté vacío y contenga únicamente números.
export function validarTelefono(telefono) {

    if (telefono.trim() === "") {
        return "Ingresa tu número de teléfono.";
    }

    if (!/^\d+$/.test(telefono)) {
        return "El teléfono solo puede contener números.";
    }

    if (telefono.length !== 10) {
        return "El teléfono debe tener exactamente 10 dígitos.";
    }

    return "";
}

// FIN VALIDACIÓN NUMERO (FER) ------------------------------------------------


// VALIDAR NUMERO EN EL FORMULARIO (FER) --------------------------------------

const phoneInput = document.getElementById("signup-phone");
const phoneError = document.getElementById("error-phone");

// Mostrar el error en letras rojas cuando el usuario salga del campo.
phoneInput.addEventListener("blur", () => {

    const error = validarTelefono(phoneInput.value);

    phoneError.textContent = error;
});

// Validar mientras el usuario escribe.
phoneInput.addEventListener("input", () => {

    const error = validarTelefono(phoneInput.value);

    phoneError.textContent = error;
});
// FIN VALIDACIÓN NUMERO EN EL FORMULARIO (FER) -------------------------------



// VALIDAR CORREO (JUAN PABLO) -----------------------------------------------

// Toda la lógica (vacío, longitud, puntos seguidos y formato) vive en utils.js.
export function validarCorreo(correo) {
    return validateEmail(correo);
}
    // Validaciones del CORREO (Juan Pablo)
    const campoCorreo = document.getElementById("signup-email");
    const errorCorreo = document.getElementById("error-email");

    if (campoCorreo && errorCorreo && formularioRegistro) {
        let correoRevisado = false;

        campoCorreo.setAttribute("aria-describedby", "error-email");
        errorCorreo.setAttribute("aria-live", "polite");

        const comprobarCorreo = () => {
            const mensaje = validarCorreo(campoCorreo.value);

            errorCorreo.textContent = mensaje;
            campoCorreo.setAttribute("aria-invalid", mensaje ? "true" : "false");

            return mensaje === "";
        };

        campoCorreo.addEventListener("blur", () => {
            correoRevisado = true;
            comprobarCorreo();
        });

        campoCorreo.addEventListener("input", () => {
            if (correoRevisado) {
                comprobarCorreo();
            }
        });

        formularioRegistro.addEventListener("submit", (event) => {
            correoRevisado = true;

            if (!comprobarCorreo()) {
                event.preventDefault();
                event.stopImmediatePropagation();
                campoCorreo.focus();
            }
        }, true);
    }

// FIN VALIDAR CORREO (JUAN PABLO) -------------------------------------------


// VALIDAR CONTRASENA (JUAN) -------------------------------------------------


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

    // Validaciones del NOMBRE (Angela)
    const campoNombre = document.getElementById("signup-fullname");
    const errorNombre = document.getElementById("error-fullname");
    const formularioRegistro = document.getElementById("form-signup");

    if (campoNombre && errorNombre && formularioRegistro) {
        let nombreRevisado = false;

        campoNombre.setAttribute(
            "aria-describedby",
            "error-fullname"
        );

        errorNombre.setAttribute(
            "aria-live",
            "polite"
        );

        // Comprobamos nombre y mostrar el error de ser necesario.

        const comprobarNombre = () => {
            const mensaje = validarNombre(campoNombre.value);

            errorNombre.textContent = mensaje;
            campoNombre.setAttribute(
                "aria-invalid",
                mensaje ? "true" : "false"
            );

            return mensaje === "";
        };

        // Validar cuando el usuario abandona el campo.
        campoNombre.addEventListener("blur", () => {
            nombreRevisado = true;
            comprobarNombre();

        });

        // Actualizar la validación mientras corrige el nombre.
        campoNombre.addEventListener("input", () => {
            if (nombreRevisado) {
                comprobarNombre();
            }
        });

        // EVENTO SUBMIT
        // Validamos nombre antes de ejecutar el registro, de ser inválido muestra error, continúa al ser válido.

        formularioRegistro.addEventListener("submit", (event) => {
            nombreRevisado = true;

            if (!comprobarNombre()) {
                event.preventDefault();
                event.stopImmediatePropagation();
                campoNombre.focus();
            }
        }, true);

    }
    // fin validación de nombre.


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
