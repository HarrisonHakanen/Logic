package com.logic_back.logic_back.serviceImpl;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.logic_back.logic_back.model.Usuario;
import com.logic_back.logic_back.repository.UsuarioRepository;
import com.logic_back.logic_back.service.UsuarioService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@Service
public class UsuarioServiceImpl implements UsuarioService{
	
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public Usuario save(Usuario product) {
        return usuarioRepository.save(product);
    }

    @Override
    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    @Override
    public Optional<Usuario> findById(Long id) {
        return usuarioRepository.findById(id);
    }

    @Override
    public Usuario update(Usuario product) {
        return usuarioRepository.save(product);
    }

    @Override
    public void deleteById(Long id) {
    	usuarioRepository.deleteById(id);
    }
    
    public ResponseEntity<Usuario> create(Usuario usuario){
    	
    	List<Usuario> usuarios = usuarioRepository.getByUsuario(usuario.getUsuario());
    	
    	if(usuarios.isEmpty()) {
    		
    		if(usuario.getIdUsuario()==null) {
        		usuario.setIdUsuario(0l);
        	}
    		
    		String hashedPassword = passwordEncoder.encode(usuario.getSenha());
            usuario.setSenha(hashedPassword);
    		
    		return ResponseEntity.status(HttpStatus.CREATED).body(save(usuario));
    	}else {
    		return ResponseEntity.status(HttpStatus.MULTIPLE_CHOICES).body(null);
    	}
    }
    
    public ResponseEntity<Usuario>login(@Param("senha") String senha, @Param("usuario") String usuario){
    	try {
    		
    		
    		List<Usuario> usuarios = usuarioRepository.getByUsuario(usuario);
    		
    		if(usuarios.size()>1) {
    			throw new Exception(HttpStatus.MULTIPLE_CHOICES.toString());
    		}
    		
    		Usuario usuarioObj = usuarios.get(0);
    		
    		if (passwordEncoder.matches(senha, usuarioObj.getSenha())) {
                return ResponseEntity.ok(usuarioObj);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
    		
        	
		} catch (Exception e) {
			
			if(e.getMessage().equals(HttpStatus.NO_CONTENT.toString())) {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
				
			}else if(e.getMessage().equals(HttpStatus.MULTIPLE_CHOICES.toString())) {
				return ResponseEntity.status(HttpStatus.MULTIPLE_CHOICES).body(null);
			}			
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
    	
    }
    
    public ResponseEntity<Usuario> validaUsuario(List<Usuario>usuarios) throws Exception {
    	
    	if(usuarios.size() > 1) {
    		throw new Exception(HttpStatus.MULTIPLE_CHOICES.toString());
    		
    	}else if(usuarios.isEmpty()) {
    		throw new Exception(HttpStatus.NO_CONTENT.toString());
    		
    	}else if(usuarios.size()==1) {
    		return ResponseEntity.status(HttpStatus.OK).body(usuarios.get(0));
    		
    	}else {
    		throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.toString());
    	}
    }
    
    
}
