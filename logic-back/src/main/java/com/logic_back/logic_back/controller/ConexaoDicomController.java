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
import com.logic_back.logic_back.model.ConexaoDicom;
import com.logic_back.logic_back.service.ConexaoDicomService;


@RestController
@RequestMapping("ConexaoDicom_")
@CrossOrigin(origins = "http://localhost:3000")
public class ConexaoDicomController {

	@Autowired
    private ConexaoDicomService conexaoDicomService;
	
	@GetMapping
    public ResponseEntity<List<ConexaoDicom>> findAll(){
        return ResponseEntity.status(HttpStatus.OK).body(conexaoDicomService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<ConexaoDicom>> findById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(conexaoDicomService.findById(id));
    }

    @PostMapping
    public ResponseEntity<ConexaoDicom> create(@RequestBody ConexaoDicom conexaoDicom){
    	return conexaoDicomService.create(conexaoDicom);
    }

    @PutMapping
    public ResponseEntity<ConexaoDicom> update(@RequestBody ConexaoDicom product){
        return ResponseEntity.status(HttpStatus.OK).body(conexaoDicomService.update(product));
    }
}
