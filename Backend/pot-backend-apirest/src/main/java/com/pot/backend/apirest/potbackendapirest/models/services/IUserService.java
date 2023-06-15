package com.pot.backend.apirest.potbackendapirest.models.services;

import java.util.List;

import com.pot.backend.apirest.potbackendapirest.models.entity.User;

public interface IUserService {
    
    public List<User> findAll();

    public User findById(Long id);

    public User save(User user);

    public void delete(Long id);

}
