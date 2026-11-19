package com.tmv.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "pedidos")
public class Pedido {

}
/*
* -- 5. Tabla Pedidos
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
*
* */