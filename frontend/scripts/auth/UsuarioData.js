// =============================================================================
// TMV - Datos de usuarios (UsuarioData.js)
// -----------------------------------------------------------------------------
// Gestión de usuarios: credenciales fijas y persistencia dinámica en localStorage.
// Ambas fuentes cumplen las mismas reglas del registro:
//   - Correo con formato válido (validateEmail)
//   - Contraseña: mínimo 8 caracteres, 1 mayúscula, 1 número y 1 carácter especial
// =============================================================================

// Roles disponibles en la aplicación
export const ROLES = {
    ADMIN: "admin",
    CLIENTE: "cliente"
};

// Página a la que se redirige cada rol después de iniciar sesión.
// Las rutas son relativas a pages/login.html
export const RUTAS_POR_ROL = {
    [ROLES.ADMIN]: "homePageAdmin.html",
    [ROLES.CLIENTE]: "productos.html"
};

// Usuarios fijos del sistema (administrador y cliente de prueba)
export const USUARIOS_FIJOS = [
    {
        nombre: "Administrador TMV",
        email: "admin@tmv.com",
        password: "Admin#2026",
        rol: ROLES.ADMIN
    },
    {
        nombre: "Cliente TMV",
        email: "cliente@tmv.com",
        password: "Cliente#2026",
        rol: ROLES.CLIENTE
    }
];

// Clave de localStorage para guardar y leer los usuarios registrados dinámicamente
export const USERS_STORAGE_KEY = "tmvUsuarios";

// Clave de localStorage donde se guarda la sesión activa
export const SESSION_STORAGE_KEY = "tmvSesion";

/**
 * Obtiene la lista de usuarios registrados almacenados en localStorage.
 * @returns {Array<object>}
 */
export function obtenerUsuariosRegistrados() {
    try {
        const data = localStorage.getItem(USERS_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.warn("[TMV Auth] Error al leer usuarios registrados de localStorage:", error);
        return [];
    }
}

/**
 * Comprueba si un correo ya se encuentra registrado (en usuarios fijos o en localStorage).
 * @param {string} email
 * @returns {boolean}
 */
export function existeUsuario(email) {
    const correoNormalizado = (email || "").trim().toLowerCase();
    if (!correoNormalizado) return false;

    // 1. Revisa usuarios fijos
    const existeEnFijos = USUARIOS_FIJOS.some(
        (u) => u.email.toLowerCase() === correoNormalizado
    );
    if (existeEnFijos) return true;

    // 2. Revisa usuarios en localStorage
    const registrados = obtenerUsuariosRegistrados();
    return registrados.some(
        (u) => (u.email || "").toLowerCase() === correoNormalizado
    );
}

/**
 * Guarda un nuevo usuario en localStorage si su correo no está registrado previamente.
 * @param {object} nuevoUsuario - Datos del usuario { nombre, phone, email, password, rol }
 * @returns {{ exito: boolean, usuario?: object, mensaje?: string }}
 */
export function guardarUsuario(nuevoUsuario) {
    if (!nuevoUsuario || !nuevoUsuario.email || !nuevoUsuario.password) {
        return { exito: false, mensaje: "Datos de usuario incompletos." };
    }

    const emailNormalizado = nuevoUsuario.email.trim().toLowerCase();

    if (existeUsuario(emailNormalizado)) {
        return {
            exito: false,
            mensaje: "Este correo electrónico ya se encuentra registrado."
        };
    }

    const usuarioParaGuardar = {
        nombre: (nuevoUsuario.nombre || nuevoUsuario.fullName || "").trim(),
        phone: (nuevoUsuario.phone || "").trim(),
        email: emailNormalizado,
        password: nuevoUsuario.password,
        rol: nuevoUsuario.rol || ROLES.CLIENTE,
        fechaRegistro: new Date().toISOString()
    };

    try {
        const registrados = obtenerUsuariosRegistrados();
        registrados.push(usuarioParaGuardar);
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(registrados));
        return { exito: true, usuario: usuarioParaGuardar };
    } catch (error) {
        console.error("[TMV Auth] Error al guardar usuario en localStorage:", error);
        return {
            exito: false,
            mensaje: "No se pudo guardar el usuario en el almacenamiento local."
        };
    }
}

/**
 * Busca un usuario por correo (sin distinguir mayúsculas) y contraseña (exacta)
 * tanto en usuarios fijos como en usuarios registrados en localStorage.
 * @param {string} email
 * @param {string} password
 * @returns {object|null} El usuario encontrado o null si las credenciales no coinciden
 */
export function buscarUsuarioFijo(email, password) {
    const correo = (email || "").trim().toLowerCase();
    if (!correo || !password) return null;

    // 1. Buscar en usuarios fijos
    const usuarioFijo = USUARIOS_FIJOS.find(
        (usuario) => usuario.email.toLowerCase() === correo && usuario.password === password
    );
    if (usuarioFijo) return usuarioFijo;

    // 2. Buscar en usuarios registrados en localStorage
    const registrados = obtenerUsuariosRegistrados();
    const usuarioRegistrado = registrados.find(
        (usuario) => (usuario.email || "").toLowerCase() === correo && usuario.password === password
    );

    return usuarioRegistrado || null;
}

// Alias para mantener coherencia semántica en nuevos desarrollos
export const buscarUsuario = buscarUsuarioFijo;

/**
 * Guarda la sesión activa (sin la contraseña).
 * @param {object} usuario
 */
export function guardarSesion(usuario) {
    try {
        localStorage.setItem(
            SESSION_STORAGE_KEY,
            JSON.stringify({
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            })
        );
    } catch (error) {
        console.warn("[TMV Auth] No se pudo guardar la sesión:", error);
    }
}

/**
 * Obtiene la sesión activa, o null si no hay.
 * @returns {{nombre: string, email: string, rol: string}|null}
 */
export function obtenerSesion() {
    try {
        return JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY)) || null;
    } catch {
        return null;
    }
}

/**
 * Cierra la sesión activa.
 */
export function cerrarSesion() {
    try {
        localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (error) {
        console.warn("[TMV Auth] No se pudo cerrar la sesión:", error);
    }
}
