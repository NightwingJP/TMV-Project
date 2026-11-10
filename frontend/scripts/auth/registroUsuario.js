import {
    validateName,
    validateEmail,
    validatePhone,
    validatePassword
} from "../utils/utils.js";

// Clave utilizada para guardar y leer los usuarios en localStorage
export const USERS_STORAGE_KEY = "tmvUsuarios";

// Mapeo de campos con sus validadores base
const ALL_FIELDS = [
    { id: 'fullName', validate: validateName },
    { id: 'email', validate: validateEmail },
    { id: 'phone', validate: validatePhone },
    { id: 'password', validate: validatePassword }
];

// -----------------------------------------------------------------------------
// FUNCIONES DE VALIDACIÓN DE CAMPOS
// -----------------------------------------------------------------------------

const NAME_FIELD = ALL_FIELDS.find((field) => field.id === "fullName");

// Valida que el nombre tenga formato correcto y al menos 3 palabras (nombres y apellidos)
export function validarNombre(nombre) {
    const mensajeError = NAME_FIELD.validate(nombre);
    if (mensajeError) {
        return mensajeError;
    }

    const nombreLimpio = (nombre || "").trim().replace(/\s+/g, " ");
    const palabras = nombreLimpio.split(" ");

    if (palabras.length < 3) {
        return "Ingresa nombres y apellidos completos.";
    }

    return "";
}

// Valida que el teléfono contenga únicamente números y tenga exactamente 10 dígitos
export function validarTelefono(telefono) {
    const raw = (telefono || "").trim();

    if (raw === "") {
        return "Ingresa tu número de teléfono.";
    }

    if (!/^\d+$/.test(raw)) {
        return "El teléfono solo puede contener números.";
    }

    if (raw.length !== 10) {
        return "El teléfono debe tener exactamente 10 dígitos.";
    }

    return "";
}

// Valida el formato del correo mediante las reglas de utils.js
export function validarCorreo(correo) {
    return validateEmail(correo);
}

// Valida que la contraseña cumpla los requisitos de seguridad definidos en utils.js
export function validarContrasena(contrasena) {
    return validatePassword(contrasena);
}

// -----------------------------------------------------------------------------
// PROTOTIPOS DE GESTIÓN Y PERSISTENCIA (LOCALSTORAGE)
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// INICIALIZACIÓN Y EVENTOS DEL DOM
// -----------------------------------------------------------------------------

export function initRegistroUsuario() {
    const formularioRegistro = document.getElementById("form-signup");
    if (!formularioRegistro) return;

    // Referencias a los inputs y elementos de error del formulario de registro
    const campoNombre = document.getElementById("signup-fullname");
    const errorNombre = document.getElementById("error-fullname");

    const phoneInput = document.getElementById("signup-phone");
    const phoneError = document.getElementById("error-phone");

    const campoCorreo = document.getElementById("signup-email");
    const errorCorreo = document.getElementById("error-email");

    const campoPassword = document.getElementById("signup-password");
    const errorPassword = document.getElementById("error-password");

    // 1. Validación de Nombre
    let nombreRevisado = false;
    const comprobarNombre = () => {
        if (!campoNombre || !errorNombre) return true;
        const mensaje = validarNombre(campoNombre.value);
        errorNombre.textContent = mensaje;
        campoNombre.setAttribute("aria-invalid", mensaje ? "true" : "false");
        return mensaje === "";
    };

    if (campoNombre && errorNombre) {
        campoNombre.setAttribute("aria-describedby", "error-fullname");
        errorNombre.setAttribute("aria-live", "polite");

        // Valida la primera vez que el usuario sale del input
        campoNombre.addEventListener("blur", () => {
            nombreRevisado = true;
            comprobarNombre();
        });

        // Actualiza el error mientras escribe solo si el campo ya fue revisado
        campoNombre.addEventListener("input", () => {
            if (nombreRevisado) {
                comprobarNombre();
            }
        });
    }

    // 2. Validación de Teléfono
    let telefonoRevisado = false;
    const comprobarTelefono = () => {
        if (!phoneInput || !phoneError) return true;
        const mensaje = validarTelefono(phoneInput.value);
        phoneError.textContent = mensaje;
        phoneInput.setAttribute("aria-invalid", mensaje ? "true" : "false");
        return mensaje === "";
    };

    if (phoneInput && phoneError) {
        phoneInput.setAttribute("aria-describedby", "error-phone");
        phoneError.setAttribute("aria-live", "polite");

        phoneInput.addEventListener("blur", () => {
            telefonoRevisado = true;
            comprobarTelefono();
        });

        phoneInput.addEventListener("input", () => {
            if (telefonoRevisado) {
                comprobarTelefono();
            }
        });
    }

    // 3. Validación de Correo
    let correoRevisado = false;
    const comprobarCorreo = () => {
        if (!campoCorreo || !errorCorreo) return true;
        const mensaje = validarCorreo(campoCorreo.value);
        errorCorreo.textContent = mensaje;
        campoCorreo.setAttribute("aria-invalid", mensaje ? "true" : "false");
        return mensaje === "";
    };

    if (campoCorreo && errorCorreo) {
        campoCorreo.setAttribute("aria-describedby", "error-email");
        errorCorreo.setAttribute("aria-live", "polite");

        campoCorreo.addEventListener("blur", () => {
            correoRevisado = true;
            comprobarCorreo();
        });

        campoCorreo.addEventListener("input", () => {
            if (correoRevisado) {
                comprobarCorreo();
            }
        });
    }

    // 4. Validación de Contraseña
    let passwordRevisada = false;
    const comprobarPassword = () => {
        if (!campoPassword || !errorPassword) return true;
        const mensaje = validarContrasena(campoPassword.value);
        errorPassword.textContent = mensaje;
        campoPassword.setAttribute("aria-invalid", mensaje ? "true" : "false");
        return mensaje === "";
    };

    if (campoPassword && errorPassword) {
        campoPassword.setAttribute("aria-describedby", "error-password");
        errorPassword.setAttribute("aria-live", "polite");

        campoPassword.addEventListener("blur", () => {
            passwordRevisada = true;
            comprobarPassword();
        });

        campoPassword.addEventListener("input", () => {
            if (passwordRevisada) {
                comprobarPassword();
            }
        });
    }

    // 5. Envío del Formulario de Registro
    // Revisa los cuatro campos en orden; si alguno falla, detiene el envío y enfoca el campo con error
    formularioRegistro.addEventListener("submit", (event) => {
        event.preventDefault();

        nombreRevisado = true;
        telefonoRevisado = true;
        correoRevisado = true;
        passwordRevisada = true;

        const nombreValido = comprobarNombre();
        const telefonoValido = comprobarTelefono();
        const correoValido = comprobarCorreo();
        const passwordValido = comprobarPassword();

        if (!nombreValido) {
            campoNombre?.focus();
            return;
        }

        if (!telefonoValido) {
            phoneInput?.focus();
            return;
        }

        if (!correoValido) {
            campoCorreo?.focus();
            return;
        }

        if (!passwordValido) {
            campoPassword?.focus();
            return;
        }

        // Si todos los campos son correctos, se extraen los datos para el registro
        const formData = new FormData(formularioRegistro);
        const datos = Object.fromEntries(formData.entries());
        registrarUsuario(datos);
    });
}

