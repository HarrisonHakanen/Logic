package com.logic_back.logic_back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.logic_back.logic_back.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario,Long> {
	
	@Query(value = "SELECT * FROM usuario_db WHERE senha = :senha AND usuario = :usuario", nativeQuery = true)
    public List<Usuario> login(@Param("senha") String senha, @Param("usuario") String usuario);
	
	@Query(value = "SELECT * FROM usuario_db WHERE usuario = :usuario", nativeQuery = true)
    public List<Usuario> getByUsuario(@Param("usuario") String usuario);

	

}
