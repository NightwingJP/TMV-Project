package com.tmv.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "vehiculos")
public class Vehiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cod_poliza_obligatoria", nullable = false, length = 50)
    private String codPolizaObligatoria;

    @Column(name = "fecha_poliza_obligatoria", nullable = false)
    private LocalDateTime fechaPolizaObligatoria;

    @Column(name = "cod_poliza_voluntaria", length = 50)
    private String codPolizaVoluntaria;

    @Column(name = "fecha_poliza_voluntaria")
    private LocalDateTime fechaPolizaVoluntaria;

    @Column(name = "fecha_mantenimiento", nullable = false)
    private LocalDateTime fechaMantenimiento;

    public Vehiculo() {
    }

    public Vehiculo(String codPolizaObligatoria, LocalDateTime fechaPolizaObligatoria,
                    String codPolizaVoluntaria, LocalDateTime fechaPolizaVoluntaria,
                    LocalDateTime fechaMantenimiento) {
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
