package com.pot.backend.apirest.potbackendapirest.models.documents;

import java.io.Serializable;

public class Mensaje implements Serializable {
    
    private String texto;
    private Long fecha;
    private Long userId;
    
    public String getTexto() {
        return this.texto;
    }
    
    public void setTexto(String texto) {
        this.texto = texto;
    }
    
    public Long getFecha() {
        return this.fecha;
    }
    
    public void setFecha(Long fecha) {
        this.fecha = fecha;
    }
    
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    private static final long serialVersionUID = -3777582564067492550L;

}
