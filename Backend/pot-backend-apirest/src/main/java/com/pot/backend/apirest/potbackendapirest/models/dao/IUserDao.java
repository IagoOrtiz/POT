package com.pot.backend.apirest.potbackendapirest.models.dao;

import org.springframework.data.repository.CrudRepository;
import com.pot.backend.apirest.potbackendapirest.models.entity.User;

public interface IUserDao extends CrudRepository<User, Long> {

}
