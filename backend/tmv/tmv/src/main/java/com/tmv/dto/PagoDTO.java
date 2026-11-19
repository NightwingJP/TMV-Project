package com.tmv.dto;

public class PagoDTO {

    private Long id;
    private Long idPedido;
    private String formaPago;

    public PagoDTO() {
    }

    public PagoDTO(Long id, Long idPedido, String formaPago) {
        this.id = id;
        this.idPedido = idPedido;
        this.formaPago = formaPago;
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

    public String getFormaPago() {
        return formaPago;
    }

    public void setFormaPago(String formaPago) {
        this.formaPago = formaPago;
    }
}
