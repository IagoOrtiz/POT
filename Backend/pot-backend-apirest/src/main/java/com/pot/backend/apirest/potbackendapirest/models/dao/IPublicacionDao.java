package com.pot.backend.apirest.potbackendapirest.models.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import com.pot.backend.apirest.potbackendapirest.models.entity.Publicacion;

public interface IPublicacionDao extends CrudRepository<Publicacion, Long> {
    List<Publicacion> findByNombreContaining(String nombre);
    List<Publicacion> findByUserId(Long id);
}
