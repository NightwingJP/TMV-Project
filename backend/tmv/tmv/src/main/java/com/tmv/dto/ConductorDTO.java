package com.tmv.dto;

import java.time.LocalDateTime;

public class ConductorDTO {

    private Long id;
    private String nombreConductor;
    private String telefono;
    private String licencia;
    private LocalDateTime fechaVencimientoLicencia;

    public ConductorDTO() {
    }

    public ConductorDTO(Long id, String nombreConductor, String telefono, String licencia,
                        LocalDateTime fechaVencimientoLicencia) {
        this.id = id;
        this.nombreConductor = nombreConductor;
        this.telefono = telefono;
        this.licencia = licencia;
        this.fechaVencimientoLicencia = fechaVencimientoLicencia;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreConductor() {
        return nombreConductor;
    }

    public void setNombreConductor(String nombreConductor) {
        this.nombreConductor = nombreConductor;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getLicencia() {
        return licencia;
    }

    public void setLicencia(String licencia) {
        this.licencia = licencia;
    }

    public LocalDateTime getFechaVencimientoLicencia() {
        return fechaVencimientoLicencia;
    }

    public void setFechaVencimientoLicencia(LocalDateTime fechaVencimientoLicencia) {
        this.fechaVencimientoLicencia = fechaVencimientoLicencia;
    }
}
