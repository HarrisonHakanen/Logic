package com.logic_back.logic_back.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@Table(name = "conexaoDicomTbl")
public class ConexaoDicom {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@NotNull
    @Column(name="idConexaoDicom")
	private Long idConexaoDicom;

	@Size(min = 2, max = 255)
	@NotNull
	@Column(name="descricao")
    private String descricao;

	@Size(min = 4, max = 255)
	@NotNull
	@Column(name="aeTitle")
    private String aeTitle;

	@Size(min = 2, max = 255)
	@NotNull
	@Column(name="enderecoIp")
    private String enderecoIp;
	
	@Min(1)
    @Max(65536)
	@NotNull
	@Column(name="porta")
    private Integer porta;
    
    
	public ConexaoDicom() {
	
	}

	public ConexaoDicom(Long idConexaoDicom, String descricao, String aeTitle, String enderecoIp, Integer porta) {
		
		this.idConexaoDicom = idConexaoDicom;
		this.descricao = descricao;
		this.aeTitle = aeTitle;
		this.enderecoIp = enderecoIp;
		this.porta = porta;
	}

	public Long getIdConexaoDicom() {
		return idConexaoDicom;
	}

	public void setIdConexaoDicom(Long idConexaoDicom) {
		this.idConexaoDicom = idConexaoDicom;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getAeTitle() {
		return aeTitle;
	}

	public void setAeTitle(String aeTitle) {
		this.aeTitle = aeTitle;
	}

	public String getEnderecoIp() {
		return enderecoIp;
	}

	public void setEnderecoIp(String enderecoIp) {
		this.enderecoIp = enderecoIp;
	}

	public Integer getPorta() {
		return porta;
	}

	public void setPorta(Integer porta) {
		this.porta = porta;
	}
}
