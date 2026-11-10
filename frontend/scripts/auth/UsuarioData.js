// =============================================================================
// TMV - Datos de usuarios (UsuarioData.js)
// -----------------------------------------------------------------------------
// Por ahora los usuarios viven "quemados" en el código (sin base de datos).
// Ambas credenciales cumplen las mismas reglas del registro:
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

// Usuarios fijos (administrador y cliente)
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

// Clave de localStorage donde se guarda la sesión activa
export const SESSION_STORAGE_KEY = "tmvSesion";

/**
 * Busca un usuario fijo por correo (sin distinguir mayúsculas) y contraseña (exacta).
 * @param {string} email
 * @param {string} password
 * @returns {object|null} El usuario encontrado o null si las credenciales no coinciden
 */
export function buscarUsuarioFijo(email, password) {
    const correo = (email || "").trim().toLowerCase();
    return (
        USUARIOS_FIJOS.find(
            (usuario) => usuario.email.toLowerCase() === correo && usuario.password === password
        ) || null
    );
}

/**
 * Guarda la sesión activa (sin la contraseña).
 * @param {object} usuario
 */
export function guardarSesion(usuario) {
    try {
        localStorage.setItem(
            SESSION_STORAGE_KEY,
            JSON.stringify({ nombre: usuario.nombre, email: usuario.email, rol: usuario.rol })
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
