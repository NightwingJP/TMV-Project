package com.tmv.dto;

import java.time.LocalDateTime;

public class VehiculoDTO {

    private Long id;
    private String codPolizaObligatoria;
    private LocalDateTime fechaPolizaObligatoria;
    private String codPolizaVoluntaria;
    private LocalDateTime fechaPolizaVoluntaria;
    private LocalDateTime fechaMantenimiento;

    public VehiculoDTO() {
    }

    public VehiculoDTO(Long id, String codPolizaObligatoria, LocalDateTime fechaPolizaObligatoria,
                       String codPolizaVoluntaria, LocalDateTime fechaPolizaVoluntaria,
                       LocalDateTime fechaMantenimiento) {
        this.id = id;
        this.codPolizaObligatoria = codPolizaObligatoria;
        this.fechaPolizaObligatoria = fechaPolizaObligatoria;
        this.codPolizaVoluntaria = codPolizaVoluntaria;
        this.fechaPolizaVoluntaria = fechaPolizaVoluntaria;
        this.fechaMantenimiento = fechaMantenimiento;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodPolizaObligatoria() {
        return codPolizaObligatoria;
    }

    public void setCodPolizaObligatoria(String codPolizaObligatoria) {
        this.codPolizaObligatoria = codPolizaObligatoria;
    }

    public LocalDateTime getFechaPolizaObligatoria() {
        return fechaPolizaObligatoria;
    }

    public void setFechaPolizaObligatoria(LocalDateTime fechaPolizaObligatoria) {
        this.fechaPolizaObligatoria = fechaPolizaObligatoria;
    }

    public String getCodPolizaVoluntaria() {
        return codPolizaVoluntaria;
    }

    public void setCodPolizaVoluntaria(String codPolizaVoluntaria) {
        this.codPolizaVoluntaria = codPolizaVoluntaria;
    }

    public LocalDateTime getFechaPolizaVoluntaria() {
        return fechaPolizaVoluntaria;
    }

    public void setFechaPolizaVoluntaria(LocalDateTime fechaPolizaVoluntaria) {
        this.fechaPolizaVoluntaria = fechaPolizaVoluntaria;
    }

    public LocalDateTime getFechaMantenimiento() {
        return fechaMantenimiento;
    }

    public void setFechaMantenimiento(LocalDateTime fechaMantenimiento) {
        this.fechaMantenimiento = fechaMantenimiento;
    }
}
