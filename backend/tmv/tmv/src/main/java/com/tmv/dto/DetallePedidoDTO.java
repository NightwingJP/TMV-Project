package com.tmv.dto;

import com.tmv.model.DetallePedido;

import java.math.BigDecimal;

public class DetallePedidoDTO {

    private Long id;
    private Long idPedido;
    private Long idProducto;
    private Integer cantidad;
    private BigDecimal precioUnitario;
    private BigDecimal descuento;
    private BigDecimal subtotal;

    public DetallePedidoDTO() {
    }

    public DetallePedidoDTO(Long id, Long idPedido, Long idProducto, Integer cantidad,
                            BigDecimal precioUnitario, BigDecimal descuento, BigDecimal subtotal) {
        this.id = id;
        this.idPedido = idPedido;
        this.idProducto = idProducto;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.descuento = descuento;
        this.subtotal = subtotal;
    }

    public static DetallePedidoDTO fromEntity(DetallePedido detalle) {
        return new DetallePedidoDTO(
                detalle.getId(),
                detalle.getPedido() != null ? detalle.getPedido().getId() : null,
                detalle.getProducto() != null ? detalle.getProducto().getId() : null,
                detalle.getCantidad(),
                detalle.getPrecioUnitario(),
                detalle.getDescuento(),
                detalle.getSubtotal()
        );
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(Long idPedido) {
        this.idPedido = idPedido;
    }

    public Long getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(Long idProducto) {
        this.idProducto = idProducto;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(BigDecimal precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public BigDecimal getDescuento() {
        return descuento;
    }

    public void setDescuento(BigDecimal descuento) {
        this.descuento = descuento;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }
}
