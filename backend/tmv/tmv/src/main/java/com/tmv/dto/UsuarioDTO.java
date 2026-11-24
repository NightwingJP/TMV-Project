package com.tmv.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tmv.model.Usuario;

public class UsuarioDTO {

    private Long id;
    private String usuario;
    private String telefono;
    private String email;
    private String direccion;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String contrasenia;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String rol;

    public UsuarioDTO() {
    }

    public UsuarioDTO(Long id, String usuario, String telefono, String email, String direccion, String contrasenia) {
        this.id = id;
        this.usuario = usuario;
        this.telefono = telefono;
        this.email = email;
        this.direccion = direccion;
        this.contrasenia = contrasenia;
    }

    public UsuarioDTO(Long id, String usuario, String telefono, String email, String direccion,
                      String contrasenia, String rol) {
        this(id, usuario, telefono, email, direccion, contrasenia);
        this.rol = rol;
    }

    public static UsuarioDTO fromEntity(Usuario usuario) {
        return new UsuarioDTO(
                usuario.getId(),
                usuario.getUsuario(),
                usuario.getTelefono(),
                usuario.getEmail(),
                usuario.getDireccion(),
                usuario.getContrasenia(),
                usuario.getRol() != null ? usuario.getRol().name() : null
        );
    }

    public Usuario toEntity() {
        return new Usuario(this.usuario, this.telefono, this.email, this.direccion, this.contrasenia);
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

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}
