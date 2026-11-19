package com.tmv.dto;

import java.time.LocalDateTime;

public class EnvioDTO {

    private Long id;
    private Long idOrdenPedido;
    private Long idConductor;
    private LocalDateTime fechaEnvio;
    private LocalDateTime fechaEntrega;
    private String estadoEnvio;

    public EnvioDTO() {
    }

    public EnvioDTO(Long id, Long idOrdenPedido, Long idConductor, LocalDateTime fechaEnvio,
                    LocalDateTime fechaEntrega, String estadoEnvio) {
        this.id = id;
        this.idOrdenPedido = idOrdenPedido;
        this.idConductor = idConductor;
        this.fechaEnvio = fechaEnvio;
        this.fechaEntrega = fechaEntrega;
        this.estadoEnvio = estadoEnvio;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdOrdenPedido() {
        return idOrdenPedido;
    }

    public void setIdOrdenPedido(Long idOrdenPedido) {
        this.idOrdenPedido = idOrdenPedido;
    }

    public Long getIdConductor() {
        return idConductor;
    }

    public void setIdConductor(Long idConductor) {
        this.idConductor = idConductor;
    }

    public LocalDateTime getFechaEnvio() {
        return fechaEnvio;
    }

    public void setFechaEnvio(LocalDateTime fechaEnvio) {
        this.fechaEnvio = fechaEnvio;
    }

    public LocalDateTime getFechaEntrega() {
        return fechaEntrega;
    }

    public void setFechaEntrega(LocalDateTime fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }

    public String getEstadoEnvio() {
        return estadoEnvio;
    }

    public void setEstadoEnvio(String estadoEnvio) {
        this.estadoEnvio = estadoEnvio;
    }
}
