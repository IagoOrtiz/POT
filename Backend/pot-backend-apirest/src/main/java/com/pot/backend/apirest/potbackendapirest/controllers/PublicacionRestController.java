package com.pot.backend.apirest.potbackendapirest.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.pot.backend.apirest.potbackendapirest.models.entity.Publicacion;
import com.pot.backend.apirest.potbackendapirest.models.services.IPublicacionService;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class PublicacionRestController {
    
    @Autowired
    private IPublicacionService publicacionService;

    @GetMapping("/publicaciones")
    public List<Publicacion> index() {
        return publicacionService.findAll();
    }

    @GetMapping("/publicaciones/detalle/{id}")
    public ResponseEntity<?> showDetail(@PathVariable Long id) {
        
        Publicacion publicacion = null;
        Map<String, Object> response = new HashMap<>();
        
        try {
            publicacion = publicacionService.findById(id);
        } catch (DataAccessException e) {
            response.put("message", "Ha habido un error al consultar la base de datos");
            response.put("error", e.getMessage()+": "+e.getMostSpecificCause().getMessage());
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }  
        if(publicacion == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe una publicacion con ese ID");
        }

        return new ResponseEntity<Publicacion>(publicacion, HttpStatus.OK);
    }

    @GetMapping("/publicaciones/user/{id}")
    public List<Publicacion> showUser(@PathVariable Long id) {
        return publicacionService.findByUserId(id);
    }

    @GetMapping("/publicaciones/{nombre}")
    public List<Publicacion> show(@PathVariable String nombre) {
        return publicacionService.findByNombreContaining(nombre);
    }

    @PostMapping("/publicaciones")
    public ResponseEntity<?> store(@RequestBody Publicacion publicacion) {
        Publicacion publicacionNueva = null;
        Map<String, Object> response = new HashMap<>();

        try {
            publicacionNueva = publicacionService.save(publicacion);
        } catch (DataAccessException e) {
            response.put("message", "Error al insertar en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<Publicacion>(publicacionNueva, HttpStatus.CREATED);
    }

    @PutMapping("/publicaciones/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public Publicacion update(@RequestBody Publicacion publicacion, @PathVariable Long id) {
        Publicacion publicacionModificar = publicacionService.findById(id);

        publicacionModificar.setActivo(publicacion.isActivo());
        publicacionModificar.setDescripcion(publicacion.getDescripcion());
        publicacionModificar.setEvs(publicacion.getEvs());
        publicacionModificar.setIvs(publicacion.getIvs());
        publicacionModificar.setNombre(publicacion.getNombre());
        publicacionModificar.setShiny(publicacion.getShiny());

        return publicacionService.save(publicacionModificar);
    }

    @DeleteMapping("/publicaciones/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void destroy(@PathVariable Long id) {
        publicacionService.delete(id);
    }
}
