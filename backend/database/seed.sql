USE db_tienda_virtual_mayorista;

-- 1. Insertar 7 Usuarios
INSERT INTO Usuarios (usuario, telefono, email, direccion, contrasenia) VALUES
('distribuidora_norte', '3104567890', 'compras@distnorte.com', 'Calle 127 # 15-40, Bodega 4', 'hash_pass_01'),
('minimercado_sol', '3157891234', 'pedidos@minimercadosol.com', 'Carrera 50 # 22-18', 'hash_pass_02'),
('abastos_central', '3209876543', 'gerencia@abastoscentral.co', 'Av. Boyacá # 68-12', 'hash_pass_03'),
('tiendas_la_esquina', '3001122334', 'contacto@laesquina.com', 'Calle 45 # 8-90', 'hash_pass_04'),
('autoservicio_roble', '3112233445', 'logistica@elroble.co', 'Carrera 13 # 93-25', 'hash_pass_05'),
('super_ahorro_sur', '3185566778', 'suministros@superahorro.com', 'Autopista Sur # 52-10', 'hash_pass_06'),
('bodega_express', '3129988776', 'admin@bodegaexpress.co', 'Calle 80 # 70-15, Local 2', 'hash_pass_07');

-- 2. Insertar 7 Productos
INSERT INTO Productos (nombre_producto, precio, descripcion, imagen_producto, categoria, fecha_ingreso, stock, fecha_salida) VALUES
('Paca Arroz Blanco Premium x 25kg', 85000.00, 'Bulto de arroz blanco seleccionado grado 1 para comercio mayorista', 'https://img.tmv.com/arroz25.jpg', 'Granos y Cereales', '2026-01-10 08:00:00', 250, NULL),
('Caja Aceite Vegetal x 12 Botellas 1L', 96000.00, 'Caja corrugada con 12 unidades de aceite vegetal comestible', 'https://img.tmv.com/aceite12.jpg', 'Aceites y Grasas', '2026-01-12 09:30:00', 180, NULL),
('Bulto Azúcar Refinada x 50kg', 142000.00, 'Saco industrial de azúcar blanca refinada de alta pureza', 'https://img.tmv.com/azucar50.jpg', 'Endulzantes', '2026-01-15 10:15:00', 120, NULL),
('Fardo Café Molido Tradicional x 24 Libras', 216000.00, 'Paquete mayorista de café tostado y molido empaque laminado', 'https://img.tmv.com/cafe24.jpg', 'Bebidas Calientes', '2026-02-01 11:00:00', 95, NULL),
('Caja Leche Entera UHT x 24 Bolsas 1L', 78000.00, 'Caja larga vida con 24 unidades de leche entera pasteurizada', 'https://img.tmv.com/leche24.jpg', 'Lácteos', '2026-02-05 07:45:00', 300, NULL),
('Paca Papel Higiénico Doble Hoja x 48 Rollos', 64000.00, 'Paca institucional de papel higiénico suave de 30 metros', 'https://img.tmv.com/papel48.jpg', 'Aseo Hogar', '2026-02-10 14:20:00', 210, NULL),
('Bulto Detergente en Polvo Multiusos x 20kg', 110000.00, 'Saco de detergente biodegradable aroma floral para distribución', 'https://img.tmv.com/detergente20.jpg', 'Aseo Hogar', '2026-02-14 16:00:00', 140, '2026-11-01 12:00:00');

-- 3. Insertar 7 Conductores
INSERT INTO Conductores (nombre_conductor, telefono_conductor, licencia, fecha_vencimiento_licencia) VALUES
('Carlos Andrés Gómez', '3101112233', 'C2-80123456', '2028-05-20 00:00:00'),
('Luis Fernando Martínez', '3112223344', 'C3-79654321', '2027-11-15 00:00:00'),
('Jorge Iván Ramírez', '3123334455', 'C2-10203040', '2029-03-10 00:00:00'),
('Héctor Fabio Sánchez', '3134445566', 'C2-50607080', '2027-08-30 00:00:00'),
('Diego Alejandro Torres', '3145556677', 'C3-90807060', '2028-12-01 00:00:00'),
('Óscar Mauricio Vargas', '3156667788', 'C2-11223344', '2027-06-18 00:00:00'),
('Javier Enrique Castro', '3167778899', 'C2-55667788', '2029-01-25 00:00:00');

-- 4. Insertar 7 Vehiculos
INSERT INTO Vehiculos (cod_poliza_obligatoria, fecha_poliza_obligatoria, cod_poliza_voluntaria, fecha_poliza_voluntaria, fecha_mantenimiento) VALUES
('SOAT-2026-001', '2027-03-15 00:00:00', 'TODO-RIESGO-101', '2027-03-15 00:00:00', '2026-09-10 08:00:00'),
('SOAT-2026-002', '2027-04-20 00:00:00', 'TODO-RIESGO-102', '2027-04-20 00:00:00', '2026-09-25 09:00:00'),
('SOAT-2026-003', '2027-06-10 00:00:00', 'TODO-RIESGO-103', '2027-06-10 00:00:00', '2026-10-05 10:30:00'),
('SOAT-2026-004', '2027-01-30 00:00:00', NULL, NULL, '2026-08-18 14:00:00'),
('SOAT-2026-005', '2027-08-12 00:00:00', 'TODO-RIESGO-105', '2027-08-12 00:00:00', '2026-10-20 11:00:00'),
('SOAT-2026-006', '2027-09-05 00:00:00', 'TODO-RIESGO-106', '2027-09-05 00:00:00', '2026-11-02 08:30:00'),
('SOAT-2026-007', '2027-10-19 00:00:00', NULL, NULL, '2026-11-08 15:00:00');

-- 5. Insertar 7 Pedidos
INSERT INTO Pedidos (id_usuario, fecha_pedido, estado, total_pedido, direccion_envio, observacion, descuento) VALUES
(1, '2026-11-01 09:15:00', 'Entregado', 810000.00, 'Calle 127 # 15-40, Bodega 4', 'Descargar en muelle 2 antes de mediodía', 40000.00),
(2, '2026-11-03 11:30:00', 'Entregado', 960000.00, 'Carrera 50 # 22-18', 'Llamar 15 minutos antes de llegar', 0.00),
(3, '2026-11-05 14:20:00', 'Entregado', 1350000.00, 'Av. Boyacá # 68-12', 'Entregar con factura física firmada', 70000.00),
(4, '2026-11-08 10:05:00', 'En camino', 1080000.00, 'Calle 45 # 8-90', 'Acceso por puerta lateral', 0.00),
(5, '2026-11-10 16:40:00', 'En camino', 740000.00, 'Carrera 13 # 93-25', 'Sin observaciones', 40000.00),
(6, '2026-11-11 08:50:00', 'Preparando', 640000.00, 'Autopista Sur # 52-10', 'Verificar sellos de seguridad', 0.00),
(7, '2026-11-12 10:10:00', 'Pendiente', 1050000.00, 'Calle 80 # 70-15, Local 2', 'Cliente solicita entrega prioritaria', 50000.00);

-- 6. Insertar 7 Pagos (1 por cada pedido)
INSERT INTO Pagos (id_pedido, forma_pago) VALUES
(1, 'Transferencia Bancaria'),
(2, 'PSE'),
(3, 'Crédito Mayorista 30 días'),
(4, 'Transferencia Bancaria'),
(5, 'Tarjeta Débito Empresarial'),
(6, 'PSE'),
(7, 'Pago Contra Entrega');

-- 7. Insertar 7 Detalle_pedidos
INSERT INTO Detalle_pedidos (id_pedido, id_producto, cantidad, precio_unitario, descuento, subtotal) VALUES
(1, 1, 10, 85000.00, 40000.00, 810000.00),
(2, 2, 10, 96000.00, 0.00, 960000.00),
(3, 3, 10, 142000.00, 70000.00, 1350000.00),
(4, 4, 5, 216000.00, 0.00, 1080000.00),
(5, 5, 10, 78000.00, 40000.00, 740000.00),
(6, 6, 10, 64000.00, 0.00, 640000.00),
(7, 7, 10, 110000.00, 50000.00, 1050000.00);

-- 8. Insertar 7 Envios (1 por cada pedido)
INSERT INTO Envios (id_orden_pedido, id_conductor, fecha_envio, fecha_entrega, estado_envio) VALUES
(1, 1, '2026-11-01 13:00:00', '2026-11-01 16:30:00', 'Entregado'),
(2, 2, '2026-11-03 15:00:00', '2026-11-04 09:45:00', 'Entregado'),
(3, 3, '2026-11-06 08:00:00', '2026-11-06 11:20:00', 'Entregado'),
(4, 4, '2026-11-09 07:30:00', NULL, 'En tránsito'),
(5, 5, '2026-11-11 09:00:00', NULL, 'En tránsito'),
(6, 6, '2026-11-12 08:00:00', NULL, 'Despachado en bodega'),
(7, 7, '2026-11-12 14:00:00', NULL, 'Programado');

-- 9. Insertar 7 Asignacion_vehiculos
INSERT INTO Asignacion_vehiculos (id_conductor, id_vehiculo, fecha_inicio, fecha_fin) VALUES
(1, 1, '2026-09-01 06:00:00', NULL),
(2, 2, '2026-09-01 06:00:00', NULL),
(3, 3, '2026-09-15 06:00:00', NULL),
(4, 4, '2026-10-01 06:00:00', NULL),
(5, 5, '2026-10-01 06:00:00', NULL),
(6, 6, '2026-10-15 06:00:00', '2026-11-10 18:00:00'),
(7, 7, '2026-11-01 06:00:00', NULL);
