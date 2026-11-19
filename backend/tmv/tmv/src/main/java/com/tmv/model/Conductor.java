package com.tmv.model;

import jakarta.persistence.*;

@Entity
@Table(name = "conductores")
public class Conductor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_conductor", nullable = false)
    private String nombreConductor;

    @Column(nullable = false)
    private String telefono;

    @Column(nullable = false, unique = true)
    private String licencia;

    @Column(name = "fecha_vencimiento_licencia", columnDefinition = "DATETIME")
    private String fechaVencimientoLicencia;

    public Conductor(){

    }

    public Conductor(String nombreConductor, String telefono, String licencia, String fechaVencimientoLicencia) {
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

    public String getFechaVencimientoLicencia() {
        return fechaVencimientoLicencia;
    }

    public void setFechaVencimientoLicencia(String fechaVencimientoLicencia) {
        this.fechaVencimientoLicencia = fechaVencimientoLicencia;
    }
}

/**
 *
 *
 -- 3. Tabla Conductores
 CREATE TABLE Conductores (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nombre_conductor VARCHAR(100) NOT NULL,
 telefono_conductor VARCHAR(20) NOT NULL,
 licencia VARCHAR(30) NOT NULL UNIQUE,
 fecha_vencimiento_licencia DATETIME NOT NULL
 );
 */
