package com.opticadigital.model;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * Clase Entidad que representa a un Usuario del sistema.
 */
@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false, length = 100, unique = true)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(columnDefinition = "ENUM('admin', 'empleado', 'cliente') DEFAULT 'empleado'")
    private String rol;

    @Column(name = "fecha_registro", insertable = false, updatable = false)
    private Timestamp fechaRegistro;

    // Constructor vacío
    public Usuario() {
    }

    // Constructor completo
    public Usuario(int id, String nombre, String email, String password, String rol, Timestamp fechaRegistro) {
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

    public Timestamp getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(Timestamp fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    @Override
    public String toString() {
        return "Usuario [id=" + id + ", nombre=" + nombre + ", email=" + email + ", rol=" + rol + "]";
    }
}
