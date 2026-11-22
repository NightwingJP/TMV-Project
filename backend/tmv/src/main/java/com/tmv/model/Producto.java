package com.tmv.model;

import jakarta.persistence.*;

import java.math.BigInteger;

@Entity
@Table(name = "productos")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nombreProducto;
    private Double precio;
    private String descripcion;
    private String imagenProducto;
    private String categoria;
    private String fechaIngreso;
    private BigInteger stok;
    private String fechaSalida;
}
