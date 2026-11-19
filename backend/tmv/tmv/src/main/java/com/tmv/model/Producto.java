package com.tmv.model;

import jakarta.persistence.*;
import java.math.BigInteger;

@Entity
@Table(name = "productos")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_producto", nullable = false)
    private String nombreProducto;

    @Column(nullable = false)
    private Double precio;

    private String descripcion;

    @Column(name = "imagen_producto")
    private String imageProducto;

    @Column(nullable = false)
    private String categoria;

    @Column(name = "fecha_ingreso", nullable = false, columnDefinition = "DATETIME")
    private String fechaIngreso;

    @Column(nullable = false)
    private BigInteger stock;

    @Column(name = "fecha_salida", columnDefinition = "DATETIME")
    private String fechaSalida;

    public Producto(){

    }

    public Producto(String nombreProducto, Double precio, String descripcion, String imageProducto, String categoria, String fechaIngreso, BigInteger stock, String fechaSalida) {
        this.nombreProducto = nombreProducto;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imageProducto = imageProducto;
        this.categoria = categoria;
        this.fechaIngreso = fechaIngreso;
        this.stock = stock;
        this.fechaSalida = fechaSalida;
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
