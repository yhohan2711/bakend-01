package com.opticadigital.model;

import java.util.Date;

/**
 * Clase Entidad que representa a un Usuario del sistema.
 * Limpiada de etiquetas JPA-Hibernate para compatibilidad con MongoDB Atlas.
 */
public class Usuario {
    private int id;
    private String nombre;
    private String email;
    private String password;
    private String rol;
    private Date fechaRegistro;

    // Constructor vacío
    public Usuario() {
    }

    // Constructor completo
    public Usuario(int id, String nombre, String email, String password, String rol, Date fechaRegistro) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.rol = rol;
        this.fechaRegistro = fechaRegistro;
    }

    // Constructor para insertar (sin ID ni fecha)
    public Usuario(String nombre, String email, String password, String rol) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }

    // Getters y Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public Date getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(Date fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    @Override
    public String toString() {
        return "Usuario [id=" + id + ", nombre=" + nombre + ", email=" + email + ", rol=" + rol + "]";
    }
}
