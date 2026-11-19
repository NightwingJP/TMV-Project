package com.tmv.model;

import jakarta.persistence.*;

import java.math.BigInteger;

@Entity
@Table(name = "produtos")
public class Producto {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_producto", nullable = false)
    private String nombreProducto;

    @Column(nullable = false)
    private Double precio;

    private String descripcion;

    @Column(name = "imagen_producto", nullable = false)
    private String imageProducto;

    @Column(nullable = false)
    private String categoria;

    @Column(name = "fecha_ingreso", nullable = false, columnDefinition = "DATATIME")
    private String fechaIngreso;

    @Column(nullable = false)
    private BigInteger stock;

    @Column(nullable = false, columnDefinition = "DATATIME")
    private String fechaSalida;

    public Producto(){

    }

    public Producto(String nombreProducto, String fechaSalida, BigInteger stock, String fechaIngreso, String fechaIngreso1, String categoria, String imageProducto, String descripcion, Double precio) {
        this.nombreProducto = nombreProducto;
        this.fechaSalida = fechaSalida;
        this.stock = stock;
        this.fechaIngreso = fechaIngreso;
        this.fechaIngreso = fechaIngreso1;
        this.categoria = categoria;
        this.imageProducto = imageProducto;
        this.descripcion = descripcion;
        this.precio = precio;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }

    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImageProducto() {
        return imageProducto;
    }

    public void setImageProducto(String imageProducto) {
        this.imageProducto = imageProducto;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(String fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public BigInteger getStock() {
        return stock;
    }

    public void setStock(BigInteger stock) {
        this.stock = stock;
    }

    public String getFechaSalida() {
        return fechaSalida;
    }

    public void setFechaSalida(String fechaSalida) {
        this.fechaSalida = fechaSalida;
    }
}


/*CREATE TABLE Productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(120) NOT NULL,
    precio DECIMAL(12, 2) NOT NULL,
    descripcion TEXT,
    imagen_producto VARCHAR(255),
    categoria VARCHAR(60) NOT NULL,
    fecha_ingreso DATETIME NOT NULL,
    stock BIGINT NOT NULL DEFAULT 0,
    fecha_salida DATETIME NULL
);*/

