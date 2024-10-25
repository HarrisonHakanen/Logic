package com.logic_back.logic_back.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import com.logic_back.logic_back.model.Usuario;

public interface UsuarioService {

	Usuario save(Usuario product);
	
	ResponseEntity<Usuario> login(String senha,String usuario);

    List<Usuario> findAll();

    Optional<Usuario> findById(Long id);

    Usuario update(Usuario product);

    void deleteById(Long id);
    
    ResponseEntity<Usuario> create(Usuario usuario);
    
    
}
