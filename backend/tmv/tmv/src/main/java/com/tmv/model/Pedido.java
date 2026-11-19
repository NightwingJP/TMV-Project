package com.tmv.model;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_conductor", nullable = false)
    private String nombreConductor;

    @Column(nullable = false)
    private Double telefono;

    @Column(nullable = false, unique = true)
    private String licencia;

    @Column(name = "fecha_vencimiento_licencia", columnDefinition = "DATATIME")
    private String fechaVencimientoLicencia;
}

/*
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
 */