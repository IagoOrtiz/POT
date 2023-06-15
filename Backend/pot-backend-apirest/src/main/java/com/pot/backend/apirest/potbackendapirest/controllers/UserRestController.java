package com.pot.backend.apirest.potbackendapirest.controllers;

import java.io.IOException;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.pot.backend.apirest.potbackendapirest.models.entity.User;
import com.pot.backend.apirest.potbackendapirest.models.services.IUserService;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class UserRestController {
    
    @Autowired
    private IUserService userService;

    @GetMapping("/users")
    public List<User> index() {
        return userService.findAll();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<?> showDetail(@PathVariable Long id) {
        
        User user = null;
        Map<String, Object> response = new HashMap<>();
        
        try {
            user = userService.findById(id);
        } catch (DataAccessException e) {
            response.put("message", "Ha habido un error al consultar la base de datos");
            response.put("error", e.getMessage()+": "+e.getMostSpecificCause().getMessage());
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }  
        
        if(user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe un usuario con ese ID");
        }

        return new ResponseEntity<User>(user, HttpStatus.OK);
    }


    @PostMapping("/users")
    public ResponseEntity<?> store(@RequestBody User user) {
        User userNuevo = null;
        Map<String, Object> response = new HashMap<>();

        try {
            userNuevo = userService.save(user);
        } catch (DataAccessException e) {
            response.put("message", "Error al insertar en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<User>(userNuevo, HttpStatus.CREATED);
    }

    @PutMapping("/users/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public User update(@RequestBody User user, @PathVariable Long id) {
        User userModificar = userService.findById(id);

        userModificar.setNombre(user.getNombre());
        userModificar.setApellido(user.getApellido());
        userModificar.setPassword(user.getPassword());
        userModificar.setEmail(user.getEmail());

        return userService.save(userModificar);
    }

    @DeleteMapping("/users/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void destroy(@PathVariable Long id) {

        User user = userService.findById(id);
        String nombreFotoAnterior = user.getFoto();

            if (nombreFotoAnterior != null && nombreFotoAnterior.length() > 0) {
                Path rutaFotoAnterior = Paths.get("../../Frontend/pot-front/src/assets/img/users").resolve(nombreFotoAnterior).toAbsolutePath();
                File archivoFotoAnterior = rutaFotoAnterior.toFile();
                if (archivoFotoAnterior.exists() && archivoFotoAnterior.canRead()) {
                    archivoFotoAnterior.delete();
                }
                
            }

        userService.delete(id);
    }

    @PostMapping("/users/upload")
    public ResponseEntity<?> upload(@RequestParam("archivo") MultipartFile archivo, @RequestParam("id") Long id) {
        Map<String, Object> response = new HashMap<>();

        User user = userService.findById(id);

        if (!archivo.isEmpty()) {
            String nombreArchivo = UUID.randomUUID().toString()+"-"+archivo.getOriginalFilename().replace(" ", "-");
            Path rutaArchivo = Paths.get("../../Frontend/pot-front/src/assets/img/users").resolve(nombreArchivo).toAbsolutePath();

            try {
            Files.copy(archivo.getInputStream(), rutaArchivo);
            } catch (IOException e) {
                response.put("mensaje", "Error al subir la imagen");
                response.put("error", e.getMessage()+": "+e.getCause().getMessage());
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            String nombreFotoAnterior = user.getFoto();

            if (nombreFotoAnterior != null && nombreFotoAnterior.length() > 0) {
                Path rutaFotoAnterior = Paths.get("../../Frontend/pot-front/src/assets/img/users").resolve(nombreFotoAnterior).toAbsolutePath();
                File archivoFotoAnterior = rutaFotoAnterior.toFile();
                if (archivoFotoAnterior.exists() && archivoFotoAnterior.canRead()) {
                    archivoFotoAnterior.delete();
                }
                
            }

            user.setFoto(nombreArchivo);

            userService.save(user);

            response.put("user", user);
            response.put("mensaje", "Se ha subido la imagen correctamente");
        }

        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }
}
