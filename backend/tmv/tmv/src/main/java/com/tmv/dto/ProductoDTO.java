package com.tmv.dto;

import com.tmv.model.Producto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ProductoDTO {

    private Long id;
    private String nombreProducto;
    private BigDecimal precio;
    private String descripcion;
    private String imagenProducto;
    private String categoria;
    private LocalDateTime fechaIngreso;
    private Long stock;
    private LocalDateTime fechaSalida;

    public ProductoDTO() {
    }

    public ProductoDTO(Long id, String nombreProducto, BigDecimal precio, String descripcion, String imagenProducto,
                       String categoria, LocalDateTime fechaIngreso, Long stock, LocalDateTime fechaSalida) {
        this.id = id;
        this.nombreProducto = nombreProducto;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagenProducto = imagenProducto;
        this.categoria = categoria;
        this.fechaIngreso = fechaIngreso;
        this.stock = stock;
        this.fechaSalida = fechaSalida;
    }

    public static ProductoDTO fromEntity(Producto producto){
        return new ProductoDTO(
                producto.getId(),
                producto.getNombreProducto(),
                producto.getPrecio(),
                producto.getDescripcion(),
                producto.getImagenProducto(),
                producto.getCategoria(),
                producto.getFechaIngreso(),
                producto.getStock(),
                producto.getFechaSalida()
        );
    }

    public Producto toEntity() {
        return new Producto(
                this.nombreProducto,
                this.precio,
                this.descripcion,
                this.imagenProducto,
                this.categoria,
                this.fechaIngreso,
                this.stock,
                this.fechaSalida);
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

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagenProducto() {
        return imagenProducto;
    }

    public void setImagenProducto(String imagenProducto) {
        this.imagenProducto = imagenProducto;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public LocalDateTime getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(LocalDateTime fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public Long getStock() {
        return stock;
    }

    public void setStock(Long stock) {
        this.stock = stock;
    }

    public LocalDateTime getFechaSalida() {
        return fechaSalida;
    }

    public void setFechaSalida(LocalDateTime fechaSalida) {
        this.fechaSalida = fechaSalida;
    }
}
