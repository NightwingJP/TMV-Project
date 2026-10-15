// ============================================================
// contact.js - Validaciones del formulario PQRSF (Contáctanos)
// ============================================================

// ---------- Expresiones regulares ----------

// Nombre: solo letras (con tildes y ñ), separadas por espacio, guion o apóstrofe.
const NAME_REGEX = /^\p{L}+(?:[ '\-]\p{L}+)*$/u;

// Correo: usuario@dominio.ext (extensión de 2+ letras, sin espacios).
const EMAIL_REGEX = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9\-]+(?:\.[A-Za-z0-9\-]+)*\.[A-Za-z]{2,}$/;

// Teléfonos de Colombia (ya sin prefijo, espacios ni símbolos):
//  - Celular: 10 dígitos, empieza por 3        -> 3001234567
//  - Fijo con indicativo: 10 dígitos, 601-608  -> 6011234567
//  - Fijo local: 7 dígitos, empieza por 2-8    -> 2345678
const MOBILE_REGEX = /^3\d{9}$/;
const LANDLINE_REGEX = /^60[1-8]\d{7}$/;
const LOCAL_LANDLINE_REGEX = /^[2-8]\d{6}$/;

// ---------- Utilidades ----------

/** Quita espacios, guiones, puntos y paréntesis, y el prefijo +57 / 57. */
function normalizeColombianPhone(raw) {
    let phone = raw.replace(/[\s\-().]/g, '');

    if (phone.startsWith('+57')) {
        phone = phone.slice(3);
    } else if (phone.startsWith('57') && phone.length === 12) {
        phone = phone.slice(2);
    }
    return phone;
}

// ---------- Validadores: devuelven un mensaje de error, o '' si el campo es válido ----------

function validateName(value) {
    const name = value.trim().replace(/\s+/g, ' ');

    if (name === '') return 'Ingresa tu nombre completo.';
    if (name.length < 3) return 'El nombre es demasiado corto.';
    if (name.length > 60) return 'El nombre no puede superar los 60 caracteres.';
    if (!NAME_REGEX.test(name)) return 'El nombre solo puede contener letras (sin números ni símbolos).';
    if (name.split(' ').length < 2) return 'Escribe al menos tu nombre y un apellido.';
    return '';
}

function validateEmail(value) {
    const email = value.trim();

    if (email === '') return 'Ingresa tu correo electrónico.';
    if (email.length > 100) return 'El correo es demasiado largo.';
    if (email.includes('..')) return 'El correo no puede tener dos puntos seguidos.';
    if (!EMAIL_REGEX.test(email)) return 'Ingresa un correo válido, por ejemplo: nombre@dominio.com';
    return '';
}

function validatePhone(value) {
    if (value.trim() === '') return 'Ingresa tu número de teléfono.';

    if (/[^\d\s\-().+]/.test(value)) return 'El teléfono solo puede contener números.';

    const phone = normalizeColombianPhone(value);

    if (MOBILE_REGEX.test(phone) || LANDLINE_REGEX.test(phone) || LOCAL_LANDLINE_REGEX.test(phone)) {
        return '';
    }
    return 'Ingresa un teléfono colombiano válido: celular de 10 dígitos (ej. 300 123 4567) o fijo (ej. 601 234 5678).';
}

function validateType(value) {
    return value === '' ? 'Selecciona el tipo de solicitud.' : '';
}

function validateMessage(value) {
    const message = value.trim();

    if (message === '') return 'Escribe el detalle de tu solicitud.';
    if (message.length < 10) return 'Cuéntanos un poco más (mínimo 10 caracteres).';
    if (message.length > 1000) return 'El mensaje no puede superar los 1000 caracteres.';
    return '';
}

// ---------- Configuración: campo -> validador ----------

const FIELDS = [
    { id: 'contactName',    validate: validateName },
    { id: 'contactEmail',   validate: validateEmail },
    { id: 'contactPhone',   validate: validatePhone },
    { id: 'pqrsfType',      validate: validateType },
    { id: 'contactMessage', validate: validateMessage },
];

// ---------- Manejo de errores en pantalla ----------

function showError(input, message) {
    const errorBox = document.getElementById(`${input.id}-error`);
    errorBox.textContent = message;
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    input.setAttribute('aria-invalid', 'true');
}

function clearError(input) {
    const errorBox = document.getElementById(`${input.id}-error`);
    errorBox.textContent = '';
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    input.setAttribute('aria-invalid', 'false');
}

/** Valida un campo y muestra u oculta su error. Devuelve true si es válido. */
function checkField({ id, validate }) {
    const input = document.getElementById(id);
    const message = validate(input.value);

    if (message) {
        showError(input, message);
        return false;
    }
    clearError(input);
    return true;
}

// ---------- Inicialización ----------

function initContactForm() {
    const form = document.getElementById('pqrsfForm');
    const status = document.getElementById('formStatus');
    if (!form) return;

    FIELDS.forEach((field) => {
        const input = document.getElementById(field.id);

        // Al salir del campo se valida por primera vez...
        input.addEventListener('blur', () => checkField(field));

        // ...y mientras escribe se revalida solo si ya se había marcado un error.
        input.addEventListener('input', () => {
            if (input.classList.contains('is-invalid')) checkField(field);
        });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        status.textContent = '';
        status.className = 'form-status';

        // Se validan TODOS los campos (sin cortar en el primer error)
        const results = FIELDS.map((field) => ({ field, valid: checkField(field) }));
        const firstInvalid = results.find((r) => !r.valid);

        if (firstInvalid) {
            document.getElementById(firstInvalid.field.id).focus();
            status.textContent = 'Revisa los campos marcados antes de enviar.';
            status.classList.add('form-status--error');
            return;
        }

        // Datos limpios y listos para enviar
        const data = {
            name: document.getElementById('contactName').value.trim().replace(/\s+/g, ' '),
            email: document.getElementById('contactEmail').value.trim().toLowerCase(),
            phone: normalizeColombianPhone(document.getElementById('contactPhone').value),
            type: document.getElementById('pqrsfType').value,
            message: document.getElementById('contactMessage').value.trim(),
        };

        // TODO: aquí va el envío al backend, por ejemplo con fetch('/api/pqrsf', ...)
        console.log('PQRSF lista para enviar:', data);

        form.reset();
        FIELDS.forEach(({ id }) => {
            const input = document.getElementById(id);
            input.classList.remove('is-valid', 'is-invalid');
            input.removeAttribute('aria-invalid');
        });

        status.textContent = '¡Gracias! Tu solicitud fue enviada correctamente.';
        status.classList.add('form-status--ok');
    });
}

initContactForm();