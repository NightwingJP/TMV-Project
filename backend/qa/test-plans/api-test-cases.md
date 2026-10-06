# Matriz de Casos de Prueba de la API REST - TMV

## Endpoints y Criterios de Aceptación

| Módulo | Método | Endpoint | Caso de Prueba | Código Esperado | Criterio de Éxito |
|---|:---:|---|---|:---:|---|
| **Productos** | `GET` | `/api/v1/products` | Obtener catálogo activo | `200 OK` | Retorna arreglo JSON con productos y presentaciones |
| **Productos** | `GET` | `/api/v1/products/{id}` | Buscar producto existente | `200 OK` | Retorna objeto del producto consultado |
| **Productos** | `GET` | `/api/v1/products/{id}` | Buscar producto inexistente | `404 Not Found` | Retorna estructura de error estandarizada |
| **Pedidos** | `POST` | `/api/v1/orders` | Crear pedido con items válidos | `201 Created` | Retorna ID del pedido generado y total calculado |
| **Pedidos** | `POST` | `/api/v1/orders` | Crear pedido con carrito vacío | `400 Bad Request` | Mensaje de validación rechazando orden sin items |
| **PQRSF** | `POST` | `/api/v1/pqrsf` | Radicar solicitud con datos válidos | `201 Created` | Retorna número de radicado y status 'RECIBIDO' |
| **PQRSF** | `POST` | `/api/v1/pqrsf` | Radicar solicitud con correo inválido | `400 Bad Request` | Falla validación de `@Email` en DTO |
