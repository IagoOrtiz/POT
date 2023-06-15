package com.pot.backend.apirest.potbackendapirest.models.services;

import java.util.List;

import com.pot.backend.apirest.potbackendapirest.models.entity.Publicacion;

public interface IPublicacionService {
    
    public List<Publicacion> findAll();

    public Publicacion findById(Long id);

    public List<Publicacion> findByUserId(Long id);

    public List<Publicacion> findByNombreContaining(String nombre);

    public Publicacion save(Publicacion publicacion);

    public void delete(Long id);

}
