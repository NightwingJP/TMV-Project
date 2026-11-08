// ==========================================================================
// TMV - Utilidades y Validaciones Reutilizables (utils.js)
// ==========================================================================

export const NAME_REGEX = /^\p{L}+(?:[ '\-]\p{L}+)*$/u;
export const EMAIL_REGEX = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9\-]+(?:\.[A-Za-z0-9\-]+)*\.[A-Za-z]{2,}$/;
export const MOBILE_REGEX = /^3\d{9}$/;
export const LANDLINE_REGEX = /^60[1-8]\d{7}$/;
export const LOCAL_LANDLINE_REGEX = /^[2-8]\d{6}$/;

/**
 * Normaliza números telefónicos colombianos retirando indicativos (+57 / 57) y símbolos.
 * @param {string} raw
 * @returns {string}
 */
export function normalizeColombianPhone(raw) {
    let phone = (raw || '').replace(/[\s\-().]/g, '');

    if (phone.startsWith('+57')) {
        phone = phone.slice(3);
    } else if (phone.startsWith('57') && phone.length === 12) {
        phone = phone.slice(2);
    }
    return phone;
}

/**
 * Valida nombre completo (mínimo 3 caracteres, al menos nombre y apellido, solo letras).
 * @param {string} value
 * @returns {string} Mensaje de error o cadena vacía si es válido
 */
export function validateName(value) {
    const name = (value || '').trim().replace(/\s+/g, ' ');

    if (name === '') return 'Ingresa tu nombre completo.';
    if (name.length < 3) return 'El nombre es demasiado corto.';
    if (name.length > 60) return 'El nombre no puede superar los 60 caracteres.';
    if (!NAME_REGEX.test(name)) return 'El nombre solo puede contener letras (sin números ni símbolos).';
    if (name.split(' ').length < 2) return 'Escribe al menos tu nombre y un apellido.';
    return '';
}

/**
 * Valida formato estándar de correo electrónico.
 * @param {string} value
 * @returns {string} Mensaje de error o cadena vacía si es válido
 */
export function validateEmail(value) {
    const email = (value || '').trim();

    if (email === '') return 'Ingresa tu correo electrónico.';
    if (email.length > 100) return 'El correo es demasiado largo.';
    if (email.includes('..')) return 'El correo no puede tener dos puntos seguidos.';
    if (!EMAIL_REGEX.test(email)) return 'Ingresa un correo válido, por ejemplo: nombre@dominio.com';
    return '';
}

/**
 * Valida formato de teléfono colombiano (móvil de 10 dígitos o fijo).
 * @param {string} value
 * @returns {string} Mensaje de error o cadena vacía si es válido
 */
export function validatePhone(value) {
    const raw = (value || '').trim();
    if (raw === '') return 'Ingresa tu número de teléfono.';

    if (/[^\d\s\-().+]/.test(raw)) return 'El teléfono solo puede contener números.';

    const phone = normalizeColombianPhone(raw);

    if (MOBILE_REGEX.test(phone) || LANDLINE_REGEX.test(phone) || LOCAL_LANDLINE_REGEX.test(phone)) {
        return '';
    }
    return 'Ingresa un teléfono colombiano válido: celular de 10 dígitos (ej. 300 123 4567) o fijo (ej. 601 234 5678).';
}

/**
 * Valida reglas de seguridad básicas de contraseña.
 * @param {string} value
 * @returns {string} Mensaje de error o cadena vacía si es válido
 */
export function validatePassword(value) {
    const password = value || '';
    if (password.trim() === '') {
        return 'La contraseña es obligatoria.';
    }
    if (password.length < 8) {
        return 'La contraseña debe tener al menos 8 caracteres.';
    }
    if (!/[A-Z]/.test(password)) {
        return 'La contraseña debe incluir al menos una mayúscula.';
    }
    if (!/\d/.test(password)) {
        return 'La contraseña debe incluir al menos un número.';
    }
    if (!/[^A-Za-z0-9\s]/.test(password)) {
        return 'La contraseña debe incluir al menos un carácter especial (+, -, *, /, @, #).';
    }
    return '';
}

/**
 * Valida selección de tipo de solicitud (PQRSF).
 * @param {string} value
 * @returns {string}
 */
export function validateType(value) {
    return (value || '') === '' ? 'Selecciona el tipo de solicitud.' : '';
}

/**
 * Valida mensaje o descripción de solicitud.
 * @param {string} value
 * @returns {string}
 */
export function validateMessage(value) {
    const message = (value || '').trim();

    if (message === '') return 'Escribe el detalle de tu solicitud.';
    if (message.length < 10) return 'Cuéntanos un poco más (mínimo 10 caracteres).';
    if (message.length > 1000) return 'El mensaje no puede superar los 1000 caracteres.';
    return '';
}

