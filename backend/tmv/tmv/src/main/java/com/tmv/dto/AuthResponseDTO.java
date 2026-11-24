package com.tmv.dto;

public class AuthResponseDTO {

    private String token;
    private Long id;
    private String usuario;
    private String email;
    private String direccion;
    private String rol;

    public AuthResponseDTO() {
    }

    public AuthResponseDTO(String token) {
        this.token = token;
    }

    public AuthResponseDTO(String token, Long id, String usuario, String email, String direccion, String rol) {
        this.token = token;
        this.id = id;
        this.usuario = usuario;
        this.email = email;
        this.direccion = direccion;
        this.rol = rol;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
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

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}
