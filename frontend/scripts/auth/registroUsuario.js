import {
    validateName,
    validateEmail,
    validatePhone,
    validatePassword
} from "../utils/utils.js";
import {
    guardarUsuario as guardarUsuarioStorage,
    obtenerUsuariosRegistrados as obtenerUsuariosStorage,
    existeUsuario,
    ROLES,
    USERS_STORAGE_KEY
} from "./UsuarioData.js";

// Re-exportamos la clave para mantener compatibilidad
export { USERS_STORAGE_KEY };

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
// GESTIÓN Y PERSISTENCIA (LOCALSTORAGE)
// -----------------------------------------------------------------------------

export function validarRegistro(datos) {
    const errores = {
        fullName: validarNombre(datos?.fullName),
        phone: validarTelefono(datos?.phone),
        email: validarCorreo(datos?.email),
        password: validarContrasena(datos?.password)
    };

    const valido = Object.values(errores).every((e) => e === "");
    return { valido, errores };
}

export function obtenerUsuariosRegistrados() {
    return obtenerUsuariosStorage();
}

export function guardarUsuario(nuevoUsuario) {
    return guardarUsuarioStorage(nuevoUsuario);
}

export function registrarUsuario(datosFormulario) {
    return guardarUsuarioStorage({
        nombre: datosFormulario.fullName,
        phone: datosFormulario.phone,
        email: datosFormulario.email,
        password: datosFormulario.password,
        rol: ROLES.CLIENTE
    });
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

    const feedbackRegistro = document.getElementById("signup-feedback");

    const limpiarFeedbackRegistro = () => {
        if (!feedbackRegistro) return;
        feedbackRegistro.textContent = "";
        feedbackRegistro.className = "auth-feedback";
        feedbackRegistro.removeAttribute("role");
    };

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

        campoNombre.addEventListener("blur", () => {
            nombreRevisado = true;
            comprobarNombre();
        });

        campoNombre.addEventListener("input", () => {
            if (nombreRevisado) comprobarNombre();
            limpiarFeedbackRegistro();
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
            if (telefonoRevisado) comprobarTelefono();
            limpiarFeedbackRegistro();
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
            if (correoRevisado) comprobarCorreo();
            limpiarFeedbackRegistro();
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
            if (passwordRevisada) comprobarPassword();
            limpiarFeedbackRegistro();
        });
    }

    // 5. Envío del Formulario de Registro
    formularioRegistro.addEventListener("submit", (event) => {
        event.preventDefault();
        limpiarFeedbackRegistro();

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

        // Validación de correo ya registrado en el sistema
        const emailIngresado = (campoCorreo?.value || "").trim().toLowerCase();
        if (existeUsuario(emailIngresado)) {
            const mensajeDuplicado = "Este correo electrónico ya se encuentra registrado.";
            if (errorCorreo) errorCorreo.textContent = mensajeDuplicado;
            campoCorreo?.setAttribute("aria-invalid", "true");
            if (feedbackRegistro) {
                feedbackRegistro.textContent = "El correo ya está registrado. Inicia sesión o utiliza otro.";
                feedbackRegistro.className = "auth-feedback is-error";
                feedbackRegistro.setAttribute("role", "alert");
            }
            campoCorreo?.focus();
            return;
        }

        // Extracción de datos y guardado en localStorage
        const formData = new FormData(formularioRegistro);
        const datos = Object.fromEntries(formData.entries());
        const resultado = registrarUsuario(datos);

        if (resultado.exito) {
            if (feedbackRegistro) {
                feedbackRegistro.textContent = "¡Registro exitoso! Ya puedes iniciar sesión con tus credenciales.";
                feedbackRegistro.className = "auth-feedback is-success";
                feedbackRegistro.setAttribute("role", "status");
            }

            formularioRegistro.reset();
            nombreRevisado = false;
            telefonoRevisado = false;
            correoRevisado = false;
            passwordRevisada = false;

            // Pre-llenar el correo en el formulario de login para agilizar la entrada
            const campoSigninEmail = document.getElementById("signin-email");
            if (campoSigninEmail) {
                campoSigninEmail.value = emailIngresado;
            }

            // Deslizar automáticamente hacia el panel de login tras un breve delay
            setTimeout(() => {
                const notebook = document.getElementById("authNotebook");
                notebook?.classList.remove("active");
                const campoSigninPass = document.getElementById("signin-password");
                campoSigninPass?.focus();
            }, 1500);
        } else {
            if (feedbackRegistro) {
                feedbackRegistro.textContent = resultado.mensaje || "Ocurrió un error al registrar el usuario.";
                feedbackRegistro.className = "auth-feedback is-error";
                feedbackRegistro.setAttribute("role", "alert");
            }
        }
    });
}
