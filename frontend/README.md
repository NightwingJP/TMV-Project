# Frontend - TMV (Plataforma Web)

Este módulo contiene la interfaz de usuario y la lógica de cliente para la plataforma web de comercio **TMV**. Está construido siguiendo una arquitectura desacoplada, diseño responsivo y modularización de componentes compartidos.

---

## 🛠️ Stack Tecnológico

- **HTML5**: Estructura semántica de páginas y componentes.
- **CSS3 & Bootstrap 4 (v4.6.2)**: Sistema de maquetación en cuadrícula (grid), utilidades responsivas y hojas de estilo modulares.
- **JavaScript (ES6+)**: Lógica e interacción del cliente, manipulación del DOM y consumo asíncrono con Fetch API.
- **QA & Automatización**: Pruebas E2E implementadas con Selenium WebDriver y Page Object Model (POM).

---

## 🧩 Arquitectura de Componentes Modulares (Header & Footer)

Para evitar duplicidad de código HTML y garantizar consistencia visual en todas las vistas, el **Header** (junto al Navbar) y el **Footer** se manejan como componentes desacoplados y reutilizables.

### 1. Archivos de Componentes
- `components/header.html`: Contiene el encabezado con el logo, el nombre comercial y la barra de navegación responsive de Bootstrap.
- `components/footer.html`: Contiene la sección legal (NIT, dirección) y los canales de contacto (correo, teléfono).

### 2. Carga Dinámica en el Cliente (`scripts/index.js`)
La inyección de estos componentes se realiza dinámicamente en tiempo de ejecución:

1. Se espera al evento `DOMContentLoaded` para asegurar que el DOM esté disponible.
2. Se realizan peticiones asíncronas con `fetch()` hacia `components/header.html` y `components/footer.html`.
3. Al resolverse la promesa (`.then()`), se parsea el texto HTML y se inyecta en sus respectivos contenedores:
   - `<div id="header-container"></div>`
   - `<div id="footer-container"></div>`

```javascript
document.addEventListener("DOMContentLoaded", () => {
    // Carga de Header
    fetch("components/header.html")
        .then((response) => response.text())
        .then((data) => {
            const headerContainer = document.getElementById("header-container");
            if (headerContainer) headerContainer.innerHTML = data;
        });

    // Carga de Footer
    fetch("components/footer.html")
        .then((response) => response.text())
        .then((data) => {
            const footerContainer = document.getElementById("footer-container");
            if (footerContainer) footerContainer.innerHTML = data;
        });
});
```

---

## 📁 Estructura del Módulo Frontend

```text
frontend/
├── README.md                 # Documentación técnica del módulo Frontend
├── index.html                # Página principal (Landing Page con contenedores modulares)
├── components/               # Fragmentos HTML reutilizables
│   ├── header.html           # Header y Navbar unificado
│   └── footer.html           # Footer legal y de contacto
├── pages/                    # Vistas del sitio web
│   ├── aliados.html          # Sección de aliados y cotización B2B
│   ├── contactanos.html      # Formulario de contacto y soporte
│   ├── productos.html        # Catálogo comercial de productos
│   ├── que-ofrecemos.html    # Descripción de servicios y valor agregado
│   └── quienes-somos.html    # Historia, misión y visión corporativa
├── styles/                   # Hojas de estilo CSS organizadas
│   ├── main.css              # Variables globales, tipografías y reset base
│   ├── components/           # Estilos específicos de componentes (header, navbar, footer, cart)
│   └── pages/                # Estilos dedicados por vista (home, allies, etc.)
├── scripts/                  # Lógica JavaScript en ES6
│   ├── index.js              # Carga dinámica de componentes modulares
│   ├── main.js               # Orquestación general del sitio
│   ├── components/           # Lógica interactiva de componentes (modales, carrito)
│   ├── pages/                # Lógica específica de páginas
│   ├── services/             # Clientes de API para comunicación con el backend
│   └── utils/                # Funciones utilitarias y validadores
├── assets/                   # Recursos estáticos
│   ├── images/               # Logos, banners y fotografías de productos
│   ├── icons/                # Iconografía SVG / PNG
│   └── audio/                # Efectos de sonido o multimedia
└── qa/                       # Aseguramiento de Calidad y Testing
    ├── selenium/             # Suite de pruebas automatizadas E2E (POM)
    └── test-plans/           # Matrices y planes de pruebas funcionales
```

---

## 🚀 Ejecución en Entorno Local

> [!IMPORTANT]
> Debido a que la carga modular de `components/header.html` y `components/footer.html` utiliza la función `fetch()`, los navegadores modernos restringen estas peticiones si el archivo se abre directamente desde el sistema de archivos (`file:///`) por políticas de seguridad (CORS).
> 
> **Es necesario ejecutar el proyecto a través de un servidor HTTP local.**

### Opciones de Servidor Local:

1. **Extensión Live Server (Recomendado en VS Code)**:
   - Haz clic derecho sobre `frontend/index.html` y selecciona **"Open with Live Server"**.

2. **Node.js (serve o http-server)**:
   ```bash
   npx serve frontend
   ```

3. **Python**:
   ```bash
   # Dentro de la carpeta frontend
   python -m http.server 5500
   ```
   Luego abre tu navegador en `http://localhost:5500`.
