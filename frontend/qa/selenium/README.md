# Suite de Automatización de Pruebas QA con Selenium WebDriver

Este módulo implementa pruebas de extremo a extremo (E2E) para la plataforma web **TMV** usando **Selenium WebDriver** bajo el patrón de diseño de arquitectura **Page Object Model (POM)**.

---

## 🏗️ Estructura del Módulo QA

```text
frontend/qa/selenium/
├── config/
│   └── webdriver-config.js   # Inicialización y configuración de WebDriver (Chrome, Firefox, Headless)
├── pages/                    # Patrón Page Object Model (POM)
│   ├── BasePage.js           # Métodos genéricos (esperas explícitas, clics seguros, inputs)
│   ├── HomePage.js           # Localizadores y acciones de la página de inicio
│   ├── CatalogPage.js        # Localizadores y acciones del catálogo de productos
│   ├── AlliesPage.js         # Localizadores y acciones de aliados y carrito
│   └── ContactPage.js        # Localizadores y acciones del formulario de contacto / PQRSF
├── tests/                    # Casos de prueba automatizados
│   ├── navigation.test.js    # Verificación de rutas y enlaces del Navbar y Footer
│   ├── cart-flow.test.js     # Verificación del modal del carrito y adición de productos
│   └── contact-form.test.js  # Verificación de validaciones del formulario PQRSF
├── test-data/
│   └── user-data.json        # Datos mock para pruebas automatizadas
└── reports/                  # Carpeta de salida para reportes de ejecución y screenshots
```

---

## ⚙️ Requisitos y Ejecución

1. **Node.js**: Si se ejecuta el runner en JavaScript (`selenium-webdriver`), ejecutar:
   ```bash
   npm init -y
   npm install selenium-webdriver mocha chai chromedriver --save-dev
   ```
2. **Ejecutar Pruebas**:
   ```bash
   npx mocha tests/*.test.js --timeout 20000
   ```
*(Nota: La arquitectura POM definida es modular y también puede replicarse o ejecutarse con Selenium en Java + TestNG/JUnit según se prefiera).*
