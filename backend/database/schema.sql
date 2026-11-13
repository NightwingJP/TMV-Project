CREATE DATABASE IF NOT EXISTS db_tienda_virtual_mayorista
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE db_tienda_virtual_mayorista;

-- 1. Tabla Usuarios
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    direccion VARCHAR(255) NOT NULL,
    contrasenia VARCHAR(255) NOT NULL
);

-- 2. Tabla Productos
CREATE TABLE Productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(120) NOT NULL,
    precio DECIMAL(12, 2) NOT NULL,
    descripcion TEXT,
    imagen_producto VARCHAR(255),
    categoria VARCHAR(60) NOT NULL,
    fecha_ingreso DATETIME NOT NULL,
    stock BIGINT NOT NULL DEFAULT 0,
    fecha_salida DATETIME NULL
);

-- 3. Tabla Conductores
CREATE TABLE Conductores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_conductor VARCHAR(100) NOT NULL,
    telefono_conductor VARCHAR(20) NOT NULL,
    licencia VARCHAR(30) NOT NULL UNIQUE,
    fecha_vencimiento_licencia DATETIME NOT NULL
);

-- 4. Tabla Vehiculos
CREATE TABLE Vehiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cod_poliza_obligatoria VARCHAR(50) NOT NULL,
    fecha_poliza_obligatoria DATETIME NOT NULL,
    cod_poliza_voluntaria VARCHAR(50) NULL,
    fecha_poliza_voluntaria DATETIME NULL,
    fecha_mantenimiento DATETIME NOT NULL
);

-- 5. Tabla Pedidos
CREATE TABLE Pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha_pedido DATETIME NOT NULL,
    estado VARCHAR(40) NOT NULL,
    total_pedido DECIMAL(12, 2) NOT NULL,
    direccion_envio VARCHAR(255) NOT NULL,
    observacion TEXT,
    descuento DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    CONSTRAINT fk_pedidos_usuario FOREIGN KEY (id_usuario) REFERENCES Usuarios(id)
);

-- 6. Tabla Pagos (Relación 1:1 con Pedidos)
CREATE TABLE Pagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL UNIQUE,
    forma_pago VARCHAR(50) NOT NULL,
    CONSTRAINT fk_pagos_pedido FOREIGN KEY (id_pedido) REFERENCES Pedidos(id)
);

-- 7. Tabla Detalle_pedidos
CREATE TABLE Detalle_pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(12, 2) NOT NULL,
    descuento DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    subtotal DECIMAL(12, 2) NOT NULL,
    CONSTRAINT fk_detalle_pedido FOREIGN KEY (id_pedido) REFERENCES Pedidos(id),
    CONSTRAINT fk_detalle_producto FOREIGN KEY (id_producto) REFERENCES Productos(id)
);

-- 8. Tabla Envios (Relación 1:1 con Pedidos, N:1 con Conductores)
CREATE TABLE Envios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_orden_pedido INT NOT NULL UNIQUE,
    id_conductor INT NOT NULL,
    fecha_envio DATETIME NOT NULL,
    fecha_entrega DATETIME NULL,
    estado_envio VARCHAR(40) NOT NULL,
    CONSTRAINT fk_envios_pedido FOREIGN KEY (id_orden_pedido) REFERENCES Pedidos(id),
    CONSTRAINT fk_envios_conductor FOREIGN KEY (id_conductor) REFERENCES Conductores(id)
);

-- 9. Tabla Asignacion_vehiculos
CREATE TABLE Asignacion_vehiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_conductor INT NOT NULL,
    id_vehiculo INT NOT NULL,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NULL,
    CONSTRAINT fk_asignacion_conductor FOREIGN KEY (id_conductor) REFERENCES Conductores(id),
    CONSTRAINT fk_asignacion_vehiculo FOREIGN KEY (id_vehiculo) REFERENCES Vehiculos(id)
);
