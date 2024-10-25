package com.logic_back.logic_back.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.logic_back.logic_back.model.Usuario;
import com.logic_back.logic_back.service.UsuarioService;


@RestController
@RequestMapping("Usuario_")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {

	@Autowired
    private UsuarioService usuarioService;
	
	@GetMapping
    public ResponseEntity<List<Usuario>> findAll(){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Usuario>> findById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.findById(id));
    }
    
    @GetMapping("login/{usuario}/{senha}")
    public ResponseEntity<Usuario> login(@PathVariable String usuario,@PathVariable String senha){
    	
    	try {
    		return usuarioService.login(senha,usuario);        				
		} catch (Exception e) {
			
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
    }

    @PostMapping
    public ResponseEntity<Usuario> create(@RequestBody Usuario usuario){
    	
    	return usuarioService.create(usuario);
        
    }

    @PutMapping
    public ResponseEntity<Usuario> update(@RequestBody Usuario product){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.update(product));
    }
}
