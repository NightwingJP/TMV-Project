// =============================================================================
// TMV - Página de Acceso y Registro (login.js - Orquestador)
// =============================================================================

import { initNotebookToggle } from "../auth/authToggle.js";
import { initRegistroUsuario } from "../auth/registroUsuario.js";

document.addEventListener("DOMContentLoaded", () => {
    initNotebookToggle();
    initRegistroUsuario();
});

