package com.logic_back.logic_back.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "usuarioTbl")
public class Usuario {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@NotNull
    @Column(name="idUsuario")
	private Long idUsuario;

	@NotNull
	@Column(name="usuario")
    private String usuario;

	@NotNull
	@Column(name="senha")
    private String senha;

		
	public Usuario() {
	
	}


	public Usuario(@NotNull Long idUsuario, @NotNull String usuario, @NotNull String senha) {
		this.idUsuario = idUsuario;
		this.usuario = usuario;
		this.senha = senha;
	}


	public Long getIdUsuario() {
		return idUsuario;
	}


	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}


	public String getUsuario() {
		return usuario;
	}


	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}


	public String getSenha() {
		return senha;
	}


	public void setSenha(String senha) {
		this.senha = senha;
	}
}
