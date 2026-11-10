// =============================================================================
// TMV - Página de Acceso y Registro (login.js - Orquestador)
// =============================================================================

import { initNotebookToggle } from "../auth/authToggle.js";
import { initRegistroUsuario } from "../auth/registroUsuario.js";
import { initLoginUsuario } from "../auth/loginUsuario.js";

document.addEventListener("DOMContentLoaded", () => {
    initNotebookToggle();
    initRegistroUsuario();
    initLoginUsuario();
});

