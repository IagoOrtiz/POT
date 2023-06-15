package com.pot.backend.apirest.potbackendapirest.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pot.backend.apirest.potbackendapirest.models.dao.IPublicacionDao;
import com.pot.backend.apirest.potbackendapirest.models.entity.Publicacion;

@Service
public class PublicacionServiceImpl implements IPublicacionService {
    
    @Autowired
    private IPublicacionDao publicacionDao;

    @Override
    @Transactional(readOnly = true)
    public List<Publicacion> findAll() {
        return (List<Publicacion>) publicacionDao.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Publicacion> findByNombreContaining(String nombre) {
        return (List<Publicacion>) publicacionDao.findByNombreContaining(nombre);
    }

    @Override
    @Transactional(readOnly = true)
    public Publicacion findById(Long id) {
        return publicacionDao.findById(id).get();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Publicacion> findByUserId(Long id) {
        return (List<Publicacion>) publicacionDao.findByUserId(id);
    }

    @Override
    @Transactional
    public Publicacion save(Publicacion publicacion) {
        return publicacionDao.save(publicacion);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        publicacionDao.deleteById(id);
    }
}
