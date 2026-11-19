package com.tmv.model;

import jakarta.persistence.*;

@Entity
@Table(name = "vehiculos")
public class Vehiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cod_poliza_obligatoria", nullable = false)
    private String codPolizaObligatoria;

    @Column(name = "cod_poliza_voluntaria", nullable = false)
    private String codPolizaVoluntaria;

    @Column(name = "fecha_poliza_obligatoria", nullable = false, columnDefinition = "DATETIME")
    private String fechaPolizaObligatoria;

    @Column(name = "fecha_poliza_voluntaria", nullable = false, columnDefinition = "DATETIME")
    private String fechaPolizaVoluntaria;

    @Column(name = "fecha_mantenimiento", nullable = false, columnDefinition = "DATETIME")
    private String fechaMantenimiento;

    public Vehiculo(){

    }

    public Vehiculo(String codPolizaObligatoria, String codPolizaVoluntaria, String fechaPolizaObligatoria, String fechaPolizaVoluntaria, String fechaMantenimiento) {
        this.codPolizaObligatoria = codPolizaObligatoria;
        this.codPolizaVoluntaria = codPolizaVoluntaria;
        this.fechaPolizaObligatoria = fechaPolizaObligatoria;
        this.fechaPolizaVoluntaria = fechaPolizaVoluntaria;
        this.fechaMantenimiento = fechaMantenimiento;
    }

    public String getCodPolizaObligatoria() {
        return codPolizaObligatoria;
    }

    public void setCodPolizaObligatoria(String codPolizaObligatoria) {
        this.codPolizaObligatoria = codPolizaObligatoria;
    }

    public String getCodPolizaVoluntaria() {
        return codPolizaVoluntaria;
    }

    public void setCodPolizaVoluntaria(String codPolizaVoluntaria) {
        this.codPolizaVoluntaria = codPolizaVoluntaria;
    }

    public String getFechaPolizaObligatoria() {
        return fechaPolizaObligatoria;
    }

    public void setFechaPolizaObligatoria(String fechaPolizaObligatoria) {
        this.fechaPolizaObligatoria = fechaPolizaObligatoria;
    }

    public String getFechaPolizaVoluntaria() {
        return fechaPolizaVoluntaria;
    }

    public void setFechaPolizaVoluntaria(String fechaPolizaVoluntaria) {
        this.fechaPolizaVoluntaria = fechaPolizaVoluntaria;
    }

    public String getFechaMantenimiento() {
        return fechaMantenimiento;
    }

    public void setFechaMantenimiento(String fechaMantenimiento) {
        this.fechaMantenimiento = fechaMantenimiento;
    }
}

/**
 *-- 4. Tabla Vehiculos
 * CREATE TABLE Vehiculos (
 *     id INT AUTO_INCREMENT PRIMARY KEY,
 *     cod_poliza_obligatoria VARCHAR(50) NOT NULL,
 *     fecha_poliza_obligatoria DATETIME NOT NULL,
 *     cod_poliza_voluntaria VARCHAR(50) NULL,
 *     fecha_poliza_voluntaria DATETIME NULL,
 *     fecha_mantenimiento DATETIME NOT NULL
 * );
 */
