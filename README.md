# TMV - Plataforma Web Comercial

Proyecto integral para la plataforma web de comercio **TMV**, implementado con una arquitectura desacoplada y orientada a buenas prácticas de ingeniería de software.

---

## 🛠️ Stack Tecnológico

- **Frontend**: HTML5, CSS3, Bootstrap 4, JavaScript (ECMAScript 6).
- **Backend**: Java, Spring Boot, Maven, MySQL.
- **QA & Testing**: Selenium WebDriver (Page Object Model), Postman, Matrices de prueba.
- **Control de Versiones**: Git.

---

## 📁 Estructura del Repositorio

```text
TMV/
├── docs/                 # Especificaciones de diseño, requerimientos y arquitectura.
├── frontend/             # Código fuente del cliente web, assets, estilos y QA con Selenium.
│   ├── README.md         # Documentación de arquitectura frontend y componentes.
│   ├── components/       # Componentes HTML modulares (header y footer dinámicos).
│   ├── pages/            # Vistas HTML correspondientes a las secciones del sitio.
│   ├── assets/           # Multimedia organizada (images, audio, icons).
│   ├── styles/           # CSS3 modular y sobreescrituras de Bootstrap 4.
│   ├── scripts/          # Lógica modular en ES6 (components, pages, services, utils).
│   └── qa/               # Automatización de pruebas E2E con Selenium y planes de prueba.
└── backend/              # Lógica de servidor en Java / Spring Boot.
    ├── database/         # Scripts DDL y DML para MySQL (schema.sql, seed.sql).
    └── qa/               # Colecciones Postman, casos de prueba de API y mock payloads.
```
