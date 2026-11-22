package com.tmv.model;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String usuario;

    @Column(nullable = false, unique = true)
    private String telefono;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String direccion;

    @Column(nullable = false, unique = true)
    private String Contrasena;

    public Usuario (){

    }

    public Usuario(String usuario, String telefono, String email, String direccion, String contrasena) {
        this.usuario = usuario;
        this.telefono = telefono;
        this.email = email;
        this.direccion = direccion;
        Contrasena = contrasena;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getContrasena() {
        return Contrasena;
    }

    public void setContrasena(String contrasena) {
        Contrasena = contrasena;
    }
}
