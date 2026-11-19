package com.tmv.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "conductores")
public class Conductor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_conductor", nullable = false, length = 100)
    private String nombreConductor;

    @Column(name = "telefono_conductor", nullable = false, length = 20)
    private String telefono;

    @Column(nullable = false, unique = true, length = 30)
    private String licencia;

    @Column(name = "fecha_vencimiento_licencia", nullable = false)
    private LocalDateTime fechaVencimientoLicencia;

    public Conductor() {
    }

    public Conductor(String nombreConductor, String telefono, String licencia, LocalDateTime fechaVencimientoLicencia) {
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
