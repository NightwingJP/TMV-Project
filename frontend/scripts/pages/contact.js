// ============================================================
// contact.js - Validaciones y envío asíncrono PQRSF (Contáctanos)
// ============================================================

// Web3Forms API Key para envío en cliente
const WEB3FORMS_ACCESS_KEY = '7ba4153d-f08c-460b-9453-83f7ff916d77';

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
export function normalizeColombianPhone(raw) {
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

const ALL_FIELDS = [
    { id: 'contactName', validate: validateName },
    { id: 'contactEmail', validate: validateEmail },
    { id: 'contactPhone', validate: validatePhone },
    { id: 'pqrsfType', validate: validateType },
    { id: 'contactMessage', validate: validateMessage },
];

// ---------- Manejo de errores en pantalla ----------

function showError(input, message) {
    const errorBox = document.getElementById(`${input.id}-error`);
    if (errorBox) {
        errorBox.textContent = message;
    }
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    input.setAttribute('aria-invalid', 'true');
}

function clearError(input) {
    const errorBox = document.getElementById(`${input.id}-error`);
    if (errorBox) {
        errorBox.textContent = '';
    }
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    input.setAttribute('aria-invalid', 'false');
}

/** Valida un campo y muestra u oculta su error. Devuelve true si es válido. */
function checkField({ id, validate }) {
    const input = document.getElementById(id);
    if (!input) return true;

    const message = validate(input.value);

    if (message) {
        showError(input, message);
        return false;
    }
    clearError(input);
    return true;
}

// ---------- Inicialización del Formulario y Envío Async ----------

function initContactForm() {
    const form = document.getElementById('pqrsfForm');
    const status = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn') || form?.querySelector('button[type="submit"]');
    if (!form) return;

    let isSubmitting = false;

    // Solo activamos los campos que efectivamente existan en el DOM (permite desacoplar teléfono temporalmente)
    const activeFields = ALL_FIELDS.filter((f) => document.getElementById(f.id));

    activeFields.forEach((field) => {
        const input = document.getElementById(field.id);
        if (!input) return;

        // Al salir del campo se valida por primera vez
        input.addEventListener('blur', () => checkField(field));

        // Mientras escribe o selecciona opción, se revalida de inmediato si ya tenía un error previo
        const eventType = input.tagName === 'SELECT' ? 'change' : 'input';
        input.addEventListener(eventType, () => {
            if (input.classList.contains('is-invalid')) {
                checkField(field);
            }
        });
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Control de concurrencia: evitar doble envío por clics rápidos o presionar Enter múltiples veces
        if (isSubmitting) return;

        // Limpiar estado previo
        status.textContent = '';
        status.className = 'form-status';

        // 1. Verificación Honeypot anti-spam
        const botcheck = document.getElementById('botcheck');
        if (botcheck && botcheck.checked) {
            console.warn('Envío bloqueado por detección de bot.');
            return;
        }

        // 2. Se validan todos los campos presentes en el DOM
        const results = activeFields.map((field) => ({ field, valid: checkField(field) }));
        const firstInvalid = results.find((r) => !r.valid);

        if (firstInvalid) {
            document.getElementById(firstInvalid.field.id).focus();
            status.textContent = 'Por favor revisa los campos marcados antes de enviar.';
            status.classList.add('form-status--error');
            return;
        }

        // 3. Preparación de datos para Web3Forms
        const emailValue = document.getElementById('contactEmail').value.trim().toLowerCase();
        const phoneInput = document.getElementById('contactPhone');

        const payload = {
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: 'Nueva solicitud PQRSF - TMV',
            from_name: 'Portal TMV - Contáctanos',
            replyto: emailValue, // Permite responder directamente al remitente desde el cliente de correo
            name: document.getElementById('contactName').value.trim().replace(/\s+/g, ' '),
            email: emailValue,
            tipo_solicitud: document.getElementById('pqrsfType').value,
            message: document.getElementById('contactMessage').value.trim(),
        };

        if (phoneInput && phoneInput.value.trim()) {
            payload.phone = normalizeColombianPhone(phoneInput.value);
        }

        // 4. Bloquear botón y mostrar estado de carga
        isSubmitting = true;
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando solicitud...';
        }
        status.textContent = 'Enviando tu mensaje, por favor espera...';
        status.className = 'form-status form-status--loading';

        try {
            // Envío asíncrono vía fetch a la API de Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                status.textContent = '¡Gracias! Tu solicitud ha sido enviada con éxito. Nos pondremos en contacto pronto.';
                status.className = 'form-status form-status--ok';

                form.reset();
                activeFields.forEach(({ id }) => {
                    const input = document.getElementById(id);
                    if (input) {
                        clearError(input);
                    }
                });
            } else {
                status.textContent = result.message || 'Ocurrió un error al enviar tu solicitud. Por favor intenta más tarde.';
                status.classList.add('form-status--error');
            }
        } catch (error) {
            console.error('Error de red al conectar con Web3Forms:', error);
            status.textContent = 'No fue posible conectar con el servidor. Revisa tu conexión a internet e inténtalo de nuevo.';
            status.classList.add('form-status--error');
        } finally {
            isSubmitting = false;
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Solicitud';
            }
        }
    });
}

// Inicialización segura del formulario asegurando que el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
} else {
    initContactForm();
}