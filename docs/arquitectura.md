# Arquitectura del Sistema - TMV

## 1. Visión Arquitectónica
El sistema **TMV** adopta una arquitectura multicapa desacoplada (Frontend / Backend API REST).

```
+-----------------------------------------------------------+
|                     CLIENTE (BROWSER)                     |
|  - HTML5 Semántico + Bootstrap 4 + CSS3                   |
|  - ECMAScript 6 Modular (Fetch API Client)                |
+-----------------------------------------------------------+
                              |
                              | HTTP / JSON (RESTful)
                              v
+-----------------------------------------------------------+
|                 BACKEND (SPRING BOOT API)                 |
|  - Controllers (@RestController)                          |
|  - Services (@Service - Reglas de Negocio)                |
|  - Repositories (Spring Data JPA)                         |
+-----------------------------------------------------------+
                              |
                              | JDBC / Hibernate
                              v
+-----------------------------------------------------------+
|                  BASE DE DATOS (MYSQL)                    |
|  - Tablas: usuarios, productos, pedidos, pqrsf            |
+-----------------------------------------------------------+
```

## 2. Estrategia de Calidad (QA)
- **Selenium WebDriver**: Pruebas End-to-End (E2E) implementando el patrón Page Object Model (POM) para validar los flujos de navegación, catálogo, carrito y formulario de contacto.
- **Postman**: Pruebas de integración de endpoints REST con aserciones automáticas de status code y formato JSON.
