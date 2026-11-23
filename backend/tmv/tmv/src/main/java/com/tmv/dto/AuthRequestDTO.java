package com.tmv.dto;


public class AuthRequestDTO {

    private String email;
    private String contrasenia;

    public AuthRequestDTO() {
    }

    public AuthRequestDTO(String userEmail, String password) {
        this.email = userEmail;
        this.contrasenia = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }
}