package com.logic_back.logic_back.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.logic_back.logic_back.model.ConexaoDicom;

public interface ConexaoDicomService {

	ConexaoDicom save(ConexaoDicom product);

    List<ConexaoDicom> findAll();

    Optional<ConexaoDicom> findById(Long id);

    ConexaoDicom update(ConexaoDicom product);
    
    List<ConexaoDicom> findByAeTitle(String aeTitle);

    void deleteById(Long id);
    
    ResponseEntity<ConexaoDicom> create (ConexaoDicom conexaoDicom);
}
