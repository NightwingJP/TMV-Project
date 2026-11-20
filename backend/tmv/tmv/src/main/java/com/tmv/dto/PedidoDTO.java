package com.tmv.dto;

import com.tmv.model.Pedido;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PedidoDTO {

    private Long id;
    private Long idUsuario;
    private LocalDateTime fechaPedido;
    private String estado;
    private BigDecimal totalPedido;
    private String direccionEnvio;
    private String observacion;
    private BigDecimal descuento;

    public PedidoDTO() {
    }

    public PedidoDTO(Long id, Long idUsuario, LocalDateTime fechaPedido, String estado, BigDecimal totalPedido,
                     String direccionEnvio, String observacion, BigDecimal descuento) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.fechaPedido = fechaPedido;
        this.estado = estado;
        this.totalPedido = totalPedido;
        this.direccionEnvio = direccionEnvio;
        this.observacion = observacion;
        this.descuento = descuento;
    }

    public static PedidoDTO fromEntity(Pedido pedido) {
        return new PedidoDTO(
                pedido.getId(),
                pedido.getUsuario() != null ? pedido.getUsuario().getId() : null,
                pedido.getFechaPedido(),
                pedido.getEstado(),
                pedido.getTotalPedido(),
                pedido.getDireccionEnvio(),
                pedido.getObservacion(),
                pedido.getDescuento()
        );
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public LocalDateTime getFechaPedido() {
        return fechaPedido;
    }

    public void setFechaPedido(LocalDateTime fechaPedido) {
        this.fechaPedido = fechaPedido;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public BigDecimal getTotalPedido() {
        return totalPedido;
    }

    public void setTotalPedido(BigDecimal totalPedido) {
        this.totalPedido = totalPedido;
    }

    public String getDireccionEnvio() {
        return direccionEnvio;
    }

    public void setDireccionEnvio(String direccionEnvio) {
        this.direccionEnvio = direccionEnvio;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public BigDecimal getDescuento() {
        return descuento;
    }

    public void setDescuento(BigDecimal descuento) {
        this.descuento = descuento;
    }
}
