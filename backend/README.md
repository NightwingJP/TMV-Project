# Backend - TMV (Spring Boot API)

Este directorio contiene la estructura base para el backend de la plataforma comercial **TMV**. Siguiendo las directrices del proyecto y las mejores prácticas de ingeniería de software, la configuración del proyecto Java se genera directamente mediante **Maven** o **Spring Initializr** para evitar colisiones de dependencias o configuraciones manuales propensas a errores.

---

### Dependencias de Spring Boot Recomendadas:
1. **Spring Web**: Construcción de API RESTful con soporte para JSON.
2. **Spring Data JPA**: Abstracción ORM para interactuar con MySQL mediante Hibernate.
3. **MySQL Driver**: Conector JDBC para base de datos MySQL.
4. **Validation (Hibernate Validator)**: Validación de inputs y DTOs (`@NotNull`, `@Email`, etc.).
5. **Lombok**: Reducción de código repetitivo (Getters, Setters, Builders, Constructores).
6. **Spring Boot DevTools**: Recarga rápida durante el desarrollo local.

---

## 📁 Estructura del Módulo Backend

```text
backend/
├── README.md                   # Este documento de arquitectura e inicio
├── database/                   # Definición de Base de Datos MySQL
│   ├── schema.sql              # Definición de tablas DDL (usuarios, productos, pedidos, pqrsf)
│   └── seed.sql                # Datos iniciales DML de prueba
└── qa/                         # Aseguramiento de Calidad de la API
    ├── postman/
    │   └── tmv_api_collection.json # Colección de endpoints para pruebas en Postman
    ├── test-plans/
    │   └── api-test-cases.md   # Casos de prueba funcional para la API REST
    └── test-data/
        └── mock-payloads.json  # Cargas útiles de prueba (Payloads)
```

---

## 🗄️ Inicialización de Base de Datos (MySQL)

1. Conéctate a tu servidor MySQL:
   ```bash
   mysql -u root -p
   ```
2. Ejecuta los scripts en orden:
   ```sql
   source database/schema.sql;
   source database/seed.sql;
   ```
