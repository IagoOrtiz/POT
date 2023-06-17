package com.pot.backend.apirest.potbackendapirest.models.entity;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name="publicaciones")
public class Publicacion implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    private String nombre;

    @Column(nullable = true)
    private String descripcion;

    private Boolean shiny;

    @Column(length = 18)
    private String ivs;

    @Column(length = 25)
    private String evs;

    private boolean activo;

    @Column(name = "create_at")
    @Temporal(TemporalType.DATE)
    private Date createAt;

    @PrePersist
    public void prePersist () {
        createAt = new Date();
    }

    // -------- Getters Y Setters -------- //

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUser() {
        return this.userId;
    }

    public void setUser(Long userId) {
        this.userId = userId;
    }

    public String getNombre() {
        return this.nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Boolean getShiny() {
        return this.shiny;
    }

    public void setShiny(Boolean shiny) {
        this.shiny = shiny;
    }

    public String getIvs() {
        return this.ivs;
    }

    public void setIvs(String ivs) {
        this.ivs = ivs;
    }

    public String getEvs() {
        return this.evs;
    }

    public void setEvs(String evs) {
        this.evs = evs;
    }

    public boolean isActivo() {
        return this.activo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }

    public Date getCreateAt() {
        return this.createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    private static final long serialVersionUID = 1L;
}
